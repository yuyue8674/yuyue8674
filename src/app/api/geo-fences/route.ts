import { NextRequest, NextResponse } from 'next/server';
import { db, geoFences, businesses } from '@/db';
import { like, eq, and } from 'drizzle-orm';

// GET /api/geo-fences - 获取地理围栏列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const businessId = searchParams.get('businessId');
    const search = searchParams.get('search');
    const isActive = searchParams.get('isActive');

    // 构建查询条件
    const conditions = [];
    if (businessId) {
      conditions.push(eq(geoFences.businessId, parseInt(businessId)));
    }
    if (search) {
      conditions.push(like(geoFences.name, `%${search}%`));
    }
    if (isActive !== null) {
      conditions.push(eq(geoFences.isActive, isActive === 'true'));
    }

    // 执行查询，关联企业信息
    const result = await db
      .select({
        geoFence: geoFences,
        business: businesses,
      })
      .from(geoFences)
      .leftJoin(businesses, eq(geoFences.businessId, businesses.id))
      .where(conditions.length > 0 ? and(...conditions) : undefined);

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

    const newGeoFence = await db
      .insert(geoFences)
      .values({
        businessId: body.businessId,
        name: body.name,
        description: body.description || null,
        centerLatitude: body.centerLatitude,
        centerLongitude: body.centerLongitude,
        radius: body.radius,
        regionType: body.regionType || 'circle',
        polygonCoordinates: body.polygonCoordinates || null,
        isActive: body.isActive ?? true,
      })
      .returning();

    return NextResponse.json({
      success: true,
      data: newGeoFence[0],
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
