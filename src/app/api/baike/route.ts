import { NextRequest, NextResponse } from 'next/server';
import { fileStore } from '@/lib/file-store';

// 生成百度百科词条内容
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const businessId = searchParams.get('businessId');

    if (!businessId) {
      return NextResponse.json(
        { error: '请提供企业ID' },
        { status: 400 }
      );
    }

    const business = await fileStore.getBusinessById(parseInt(businessId));
    if (!business) {
      return NextResponse.json(
        { error: '企业不存在' },
        { status: 404 }
      );
    }

    const keywords = await fileStore.getKeywords({ businessId: business.id });
    const geoFences = await fileStore.getGeoFences({ businessId: business.id });

    // 生成百度百科词条
    const baikeContent = generateBaikeContent(business, keywords, geoFences);

    return NextResponse.json({
      business: business.name,
      content: baikeContent,
      submitUrl: 'https://baike.baidu.com/business/',
      requirements: {
        materials: [
          '营业执照副本照片',
          '法人身份证正反面',
          '企业Logo（可选）',
          '门店或办公场所照片（可选）',
        ],
        notes: [
          '企业名称需与营业执照完全一致',
          '词条内容需客观真实，避免广告性质',
          '联系方式可在词条中展示',
          '审核时间通常为3-7个工作日',
        ],
      },
    });
  } catch (error) {
    console.error('生成百科词条失败:', error);
    return NextResponse.json(
      { error: '生成百科词条失败' },
      { status: 500 }
    );
  }
}

// 生成百度百科词条内容
function generateBaikeContent(
  business: any,
  keywords: any[],
  geoFences: any[]
) {
  const keywordList = keywords.map(k => k.keyword.keyword);

  // 基本信息
  const basicInfo = `【基本信息】
企业名称：${business.name}
成立时间：待补充
企业类型：${business.businessType || '有限责任公司'}
注册地址：${business.address || business.city || '待补充'}
法定代表人：待补充
注册资本：待补充
经营范围：${keywordList.length > 0 ? keywordList.slice(0, 5).join('、') : '待补充'}`;

  // 企业简介
  const introduction = `【企业简介】

${business.name}${business.businessType ? `是一家专业的${business.businessType}` : ''}，${business.province ? `坐落于${business.province}${business.city ? business.city : ''}` : ''}。

${business.description || '公司秉承"诚信为本、服务至上"的经营理念，致力于为客户提供优质的产品和服务。'}

${business.phone ? `服务热线：${business.phone}` : ''}
${business.email ? `联系邮箱：${business.email}` : ''}
${business.website ? `官方网站：${business.website}` : ''}`;

  // 主营业务
  const businessScope = `【主营业务】

${keywordList.length > 0 
  ? keywordList.map((keyword, index) => `${index + 1}. ${keyword}`).join('\n')
  : '主营业务待补充，请根据实际情况完善。'}`;

  // 服务区域
  const serviceArea = geoFences.length > 0 ? `【服务区域】

${geoFences.map(gf => `• ${gf.geoFence.name}（覆盖半径${gf.geoFence.radius}公里）`).join('\n')}

公司业务覆盖${business.city || business.province || '多个地区'}，为当地客户提供便捷高效的服务。` : '';

  // 企业文化
  const culture = `【企业文化】

企业愿景：成为行业领先的服务提供商
企业使命：为客户创造价值，为社会贡献力量
核心价值观：诚信、专业、创新、共赢`;

  // 发展历程
  const history = `【发展历程】

• ${new Date().getFullYear()}年：公司成立，开始提供${keywordList[0] || '相关服务'}服务

（请根据实际情况补充更多发展历程）`;

  // 联系方式
  const contact = `【联系方式】

公司名称：${business.name}
公司地址：${business.address || business.city || '待补充'}
${business.phone ? `联系电话：${business.phone}` : ''}
${business.email ? `电子邮箱：${business.email}` : ''}
${business.website ? `公司官网：${business.website}` : ''}`;

  // 组合完整词条
  const fullContent = `${basicInfo}

${introduction}

${businessScope}

${serviceArea}

${culture}

${history}

${contact}`;

  // 同时生成纯文本版本（方便复制）
  const plainTextContent = `【${business.name}】

${business.name}${business.businessType ? `是一家专业的${business.businessType}` : ''}，${business.province ? `位于${business.province}${business.city ? business.city : ''}` : ''}。

【主营业务】
${keywordList.length > 0 
  ? keywordList.slice(0, 5).join('、')
  : '待补充'}

【服务区域】
${geoFences.length > 0 
  ? geoFences.map(gf => gf.geoFence.name).join('、')
  : business.city || business.province || '待补充'}

【联系方式】
地址：${business.address || business.city || '待补充'}
${business.phone ? `电话：${business.phone}` : ''}
${business.email ? `邮箱：${business.email}` : ''}
${business.website ? `网址：${business.website}` : ''}`;

  return {
    wikiFormat: fullContent,
    plainText: plainTextContent,
    sections: {
      basicInfo,
      introduction,
      businessScope,
      serviceArea,
      culture,
      history,
      contact,
    },
  };
}
