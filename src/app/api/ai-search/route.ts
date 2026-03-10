import { NextRequest, NextResponse } from 'next/server';
import { LLMClient, Config, HeaderUtils } from 'coze-coding-dev-sdk';
import { fileStore } from '@/lib/file-store';

// AI智能搜索接口 - 流式输出
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keyword, userLatitude, userLongitude, userCity } = body;

    if (!keyword) {
      return NextResponse.json(
        { success: false, error: '请输入搜索关键词' },
        { status: 400 }
      );
    }

    // 获取所有企业数据
    const businesses = await fileStore.getBusinesses();
    const keywords = await fileStore.getKeywords();
    const geoFences = await fileStore.getGeoFences();

    // 构建企业知识库
    const businessKnowledge = businesses
      .filter((b) => b.isActive)
      .map((b) => {
        const businessKeywords = keywords
          .filter((k) => k.keyword.businessId === b.id && k.keyword.status === 'active')
          .map((k) => ({
            keyword: k.keyword.keyword,
            priority: k.keyword.priority,
            matchType: k.keyword.matchType,
          }));

        const businessGeoFences = geoFences
          .filter((g) => g.geoFence.businessId === b.id && g.geoFence.isActive)
          .map((g) => ({
            name: g.geoFence.name,
            radius: g.geoFence.radius,
            center: `${g.geoFence.centerLatitude}, ${g.geoFence.centerLongitude}`,
          }));

        return {
          id: b.id,
          name: b.name,
          description: b.description,
          type: b.businessType,
          phone: b.phone,
          email: b.email,
          address: b.address,
          city: b.city,
          location: b.latitude && b.longitude ? `${b.latitude}, ${b.longitude}` : null,
          keywords: businessKeywords,
          geoFences: businessGeoFences,
        };
      });

    // 构建用户位置信息
    const userLocationInfo =
      userLatitude && userLongitude
        ? `用户当前位置：纬度 ${userLatitude}, 经度 ${userLongitude}${userCity ? `，城市：${userCity}` : ''}`
        : userCity
          ? `用户当前城市：${userCity}`
          : '用户未提供位置信息';

    // 创建LLM客户端
    const config = new Config();
    const customHeaders = HeaderUtils.extractForwardHeaders(request.headers);
    const client = new LLMClient(config, customHeaders);

    // 构建系统提示词
    const systemPrompt = `你是一个专业的本地生活服务搜索助手。你的任务是根据用户的搜索关键词，从企业数据库中智能匹配最相关的企业，并提供专业的推荐。

## 企业数据库
${JSON.stringify(businessKnowledge, null, 2)}

## 匹配规则
1. **关键词匹配**：
   - 精确匹配：关键词完全一致，优先级最高
   - 部分匹配：关键词包含搜索词，中等优先级
   - 广泛匹配：关键词与搜索词语义相关，低优先级

2. **地理围栏**：
   - 如果用户提供了位置信息，优先推荐距离在围栏范围内的企业
   - 计算距离时使用欧几里得距离近似公式

3. **优先级排序**：
   - 按关键词优先级（数字越大越优先）排序
   - 同优先级下，距离近的优先

## 回复格式
请以友好、专业的方式回复用户，包含以下内容：

1. **开场白**：确认用户的搜索意图
2. **推荐企业**：列出匹配的企业（最多3个），每个包含：
   - 企业名称和类型
   - 为什么推荐（匹配的关键词、距离等）
   - 企业描述
   - 联系方式和地址
3. **结束语**：询问是否需要更多信息

注意：
- 如果没有匹配的企业，友好地告知用户并建议其他搜索词
- 使用emoji让回复更生动
- 保持回复简洁专业`;

    const messages = [
      { role: 'system' as const, content: systemPrompt },
      {
        role: 'user' as const,
        content: `搜索关键词：${keyword}
${userLocationInfo}

请帮我找到最合适的企业。`,
      },
    ];

    // 使用流式输出
    const stream = client.stream(messages, {
      model: 'doubao-seed-2-0-pro-260215',
      temperature: 0.7,
    });

    // 创建可读流
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            if (chunk.content) {
              const text = chunk.content.toString();
              controller.enqueue(encoder.encode(`data: ${JSON.stringify({ content: text })}\n\n`));
            }
          }
          controller.enqueue(encoder.encode('data: [DONE]\n\n'));
          controller.close();
        } catch (error) {
          console.error('Streaming error:', error);
          controller.error(error);
        }
      },
    });

    // 返回流式响应
    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
      },
    });
  } catch (error) {
    console.error('AI搜索失败:', error);
    return NextResponse.json(
      { success: false, error: 'AI搜索服务暂时不可用，请稍后重试' },
      { status: 500 }
    );
  }
}
