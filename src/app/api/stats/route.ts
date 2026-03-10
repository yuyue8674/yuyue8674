import { NextRequest, NextResponse } from 'next/server';
import { memoryStore } from '@/lib/memory-store';

// GET /api/stats - 获取统计数据
export async function GET(request: NextRequest) {
  try {
    const stats = await memoryStore.getStats();

    return NextResponse.json({
      success: true,
      data: stats,
    });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    return NextResponse.json(
      { success: false, error: '获取统计数据失败' },
      { status: 500 }
    );
  }
}
