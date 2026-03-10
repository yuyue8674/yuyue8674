import { NextRequest, NextResponse } from 'next/server';
import { db, geoFences } from '@/db';
import { eq } from 'drizzle-orm';

// GET /api/geo-fences/[id] - 获取地理围栏详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const geoFenceId = parseInt(id);

    const result = await db
      .select()
      .from(geoFences)
      .where(eq(geoFences.id, geoFenceId))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: '地理围栏不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0],
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

    const updatedGeoFence = await db
      .update(geoFences)
      .set({
        name: body.name,
        description: body.description,
        centerLatitude: body.centerLatitude,
        centerLongitude: body.centerLongitude,
        radius: body.radius,
        regionType: body.regionType,
        polygonCoordinates: body.polygonCoordinates,
        isActive: body.isActive,
        updatedAt: new Date(),
      })
      .where(eq(geoFences.id, geoFenceId))
      .returning();

    if (updatedGeoFence.length === 0) {
      return NextResponse.json(
        { success: false, error: '地理围栏不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedGeoFence[0],
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

    const deletedGeoFence = await db
      .delete(geoFences)
      .where(eq(geoFences.id, geoFenceId))
      .returning();

    if (deletedGeoFence.length === 0) {
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
