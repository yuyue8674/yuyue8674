import { NextRequest, NextResponse } from 'next/server';
import { db, keywords, businesses } from '@/db';
import { like, eq, and, or, desc } from 'drizzle-orm';

// GET /api/keywords - 获取关键词列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const businessId = searchParams.get('businessId');
    const search = searchParams.get('search');
    const status = searchParams.get('status');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;

    // 构建查询条件
    const conditions = [];
    if (businessId) {
      conditions.push(eq(keywords.businessId, parseInt(businessId)));
    }
    if (search) {
      conditions.push(like(keywords.keyword, `%${search}%`));
    }
    if (status) {
      conditions.push(eq(keywords.status, status));
    }

    // 执行查询，关联企业信息
    const result = await db
      .select({
        keyword: keywords,
        business: businesses,
      })
      .from(keywords)
      .leftJoin(businesses, eq(keywords.businessId, businesses.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(keywords.priority), desc(keywords.searchCount))
      .limit(limit)
      .offset(offset);

    // 获取总数
    const totalResult = await db.select().from(keywords);
    const total = totalResult.length;

    return NextResponse.json({
      success: true,
      data: result,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
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
    const businessExists = await db
      .select()
      .from(businesses)
      .where(eq(businesses.id, body.businessId))
      .limit(1);

    if (businessExists.length === 0) {
      return NextResponse.json(
        { success: false, error: '企业不存在' },
        { status: 404 }
      );
    }

    const newKeyword = await db
      .insert(keywords)
      .values({
        businessId: body.businessId,
        keyword: body.keyword,
        priority: body.priority || 0,
        matchType: body.matchType || 'exact',
        status: body.status || 'active',
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newKeyword[0],
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
