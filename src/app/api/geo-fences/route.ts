import { NextRequest, NextResponse } from 'next/server';
import { memoryStore } from '@/lib/memory-store';

// GET /api/geo-fences - 获取地理围栏列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const businessId = searchParams.get('businessId') ? parseInt(searchParams.get('businessId')!) : undefined;
    const search = searchParams.get('search') || undefined;
    const isActive = searchParams.get('isActive') ? searchParams.get('isActive') === 'true' : undefined;

    const result = await memoryStore.getGeoFences({ businessId, search, isActive });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('获取地理围栏列表失败:', error);
    return NextResponse.json(
      { success: false, error: '获取地理围栏列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/geo-fences - 创建地理围栏
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // 验证企业是否存在
    const business = await memoryStore.getBusinessById(body.businessId);
    if (!business) {
      return NextResponse.json(
        { success: false, error: '企业不存在' },
        { status: 404 }
      );
    }

    const newGeoFence = await memoryStore.createGeoFence({
      businessId: body.businessId,
      name: body.name,
      description: body.description || null,
      centerLatitude: body.centerLatitude,
      centerLongitude: body.centerLongitude,
      radius: body.radius,
      regionType: body.regionType || 'circle',
      polygonCoordinates: body.polygonCoordinates || null,
      isActive: body.isActive ?? true,
    });

    return NextResponse.json({
      success: true,
      data: newGeoFence,
      message: '地理围栏创建成功',
    });
  } catch (error) {
    console.error('创建地理围栏失败:', error);
    return NextResponse.json(
      { success: false, error: '创建地理围栏失败' },
      { status: 500 }
    );
  }
}
