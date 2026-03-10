import { NextRequest, NextResponse } from 'next/server';
import { memoryStore } from '@/lib/memory-store';

// POST /api/search - AI搜索接口
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { keyword, userLatitude, userLongitude, userCity, deviceType } = body;

    if (!keyword) {
      return NextResponse.json(
        { success: false, error: '请输入搜索关键词' },
        { status: 400 }
      );
    }

    const results = await memoryStore.search(
      keyword,
      userLatitude,
      userLongitude
    );

    return NextResponse.json({
      success: true,
      data: results,
      total: results.length,
    });
  } catch (error) {
    console.error('搜索失败:', error);
    return NextResponse.json(
      { success: false, error: '搜索失败' },
      { status: 500 }
    );
  }
}
