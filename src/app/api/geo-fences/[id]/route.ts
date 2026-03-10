import { NextRequest, NextResponse } from 'next/server';
import { memoryStore } from '@/lib/memory-store';

// GET /api/geo-fences/[id] - 获取地理围栏详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const geoFenceId = parseInt(id);

    const result = await memoryStore.getGeoFenceById(geoFenceId);

    if (!result) {
      return NextResponse.json(
        { success: false, error: '地理围栏不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error('获取地理围栏详情失败:', error);
    return NextResponse.json(
      { success: false, error: '获取地理围栏详情失败' },
      { status: 500 }
    );
  }
}

// PUT /api/geo-fences/[id] - 更新地理围栏
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const geoFenceId = parseInt(id);
    const body = await request.json();

    const updatedGeoFence = await memoryStore.updateGeoFence(geoFenceId, {
      name: body.name,
      description: body.description,
      centerLatitude: body.centerLatitude,
      centerLongitude: body.centerLongitude,
      radius: body.radius,
      regionType: body.regionType,
      polygonCoordinates: body.polygonCoordinates,
      isActive: body.isActive,
    });

    if (!updatedGeoFence) {
      return NextResponse.json(
        { success: false, error: '地理围栏不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedGeoFence,
      message: '地理围栏更新成功',
    });
  } catch (error) {
    console.error('更新地理围栏失败:', error);
    return NextResponse.json(
      { success: false, error: '更新地理围栏失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/geo-fences/[id] - 删除地理围栏
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const geoFenceId = parseInt(id);

    const deleted = await memoryStore.deleteGeoFence(geoFenceId);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: '地理围栏不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '地理围栏删除成功',
    });
  } catch (error) {
    console.error('删除地理围栏失败:', error);
    return NextResponse.json(
      { success: false, error: '删除地理围栏失败' },
      { status: 500 }
    );
  }
}
