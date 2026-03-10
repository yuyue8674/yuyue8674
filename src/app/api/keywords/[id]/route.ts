import { NextRequest, NextResponse } from 'next/server';
import { db, keywords } from '@/db';
import { eq } from 'drizzle-orm';

// GET /api/keywords/[id] - 获取关键词详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const keywordId = parseInt(id);

    const result = await db
      .select()
      .from(keywords)
      .where(eq(keywords.id, keywordId))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: '关键词不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('获取关键词详情失败:', error);
    return NextResponse.json(
      { success: false, error: '获取关键词详情失败' },
      { status: 500 }
    );
  }
}

// PUT /api/keywords/[id] - 更新关键词
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const keywordId = parseInt(id);
    const body = await request.json();

    const updatedKeyword = await db
      .update(keywords)
      .set({
        keyword: body.keyword,
        priority: body.priority,
        matchType: body.matchType,
        status: body.status,
        updatedAt: new Date(),
      })
      .where(eq(keywords.id, keywordId))
      .returning();

    if (updatedKeyword.length === 0) {
      return NextResponse.json(
        { success: false, error: '关键词不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedKeyword[0],
      message: '关键词更新成功',
    });
  } catch (error) {
    console.error('更新关键词失败:', error);
    return NextResponse.json(
      { success: false, error: '更新关键词失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/keywords/[id] - 删除关键词
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const keywordId = parseInt(id);

    const deletedKeyword = await db
      .delete(keywords)
      .where(eq(keywords.id, keywordId))
      .returning();

    if (deletedKeyword.length === 0) {
      return NextResponse.json(
        { success: false, error: '关键词不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '关键词删除成功',
    });
  } catch (error) {
    console.error('删除关键词失败:', error);
    return NextResponse.json(
      { success: false, error: '删除关键词失败' },
      { status: 500 }
    );
  }
}
