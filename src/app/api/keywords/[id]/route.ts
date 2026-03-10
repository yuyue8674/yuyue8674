import { NextRequest, NextResponse } from 'next/server';
import { fileStore } from '@/lib/file-store';

// GET /api/keywords/[id] - 获取关键词详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const keywordId = parseInt(id);

    const result = await fileStore.getKeywordById(keywordId);

    if (!result) {
      return NextResponse.json(
        { success: false, error: '关键词不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
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

    const updatedKeyword = await fileStore.updateKeyword(keywordId, {
      keyword: body.keyword,
      priority: body.priority,
      matchType: body.matchType,
      status: body.status,
    });

    if (!updatedKeyword) {
      return NextResponse.json(
        { success: false, error: '关键词不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedKeyword,
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

    const deleted = await fileStore.deleteKeyword(keywordId);

    if (!deleted) {
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
