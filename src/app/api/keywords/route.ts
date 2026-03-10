import { NextRequest, NextResponse } from 'next/server';
import { fileStore } from '@/lib/file-store';

// GET /api/keywords - 获取关键词列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const businessId = searchParams.get('businessId') ? parseInt(searchParams.get('businessId')!) : undefined;
    const search = searchParams.get('search') || undefined;
    const status = searchParams.get('status') || undefined;

    const result = await fileStore.getKeywords({ businessId, search, status });

    return NextResponse.json({
      success: true,
      data: result,
      pagination: {
        page: 1,
        limit: result.length,
        total: result.length,
        totalPages: 1,
      },
    });
  } catch (error) {
    console.error('获取关键词列表失败:', error);
    return NextResponse.json(
      { success: false, error: '获取关键词列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/keywords - 创建关键词
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证企业是否存在
    const business = await fileStore.getBusinessById(body.businessId);
    if (!business) {
      return NextResponse.json(
        { success: false, error: '企业不存在' },
        { status: 404 }
      );
    }

    const newKeyword = await fileStore.createKeyword({
      businessId: body.businessId,
      keyword: body.keyword,
      priority: body.priority || 0,
      matchType: body.matchType || 'exact',
      status: body.status || 'active',
    });

    return NextResponse.json({
      success: true,
      data: newKeyword,
      message: '关键词创建成功',
    });
  } catch (error) {
    console.error('创建关键词失败:', error);
    return NextResponse.json(
      { success: false, error: '创建关键词失败' },
      { status: 500 }
    );
  }
}
