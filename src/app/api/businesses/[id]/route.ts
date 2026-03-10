import { NextRequest, NextResponse } from 'next/server';
import { db, businesses } from '@/db';
import { eq } from 'drizzle-orm';

// GET /api/businesses/[id] - 获取企业详情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const businessId = parseInt(id);

    const result = await db
      .select()
      .from(businesses)
      .where(eq(businesses.id, businessId))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { success: false, error: '企业不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result[0],
    });
  } catch (error) {
    console.error('获取企业详情失败:', error);
    return NextResponse.json(
      { success: false, error: '获取企业详情失败' },
      { status: 500 }
    );
  }
}

// PUT /api/businesses/[id] - 更新企业信息
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const businessId = parseInt(id);
    const body = await request.json();

    const updatedBusiness = await db
      .update(businesses)
      .set({
        name: body.name,
        description: body.description,
        businessType: body.businessType,
        phone: body.phone,
        email: body.email,
        website: body.website,
        address: body.address,
        city: body.city,
        province: body.province,
        latitude: body.latitude,
        longitude: body.longitude,
        logo: body.logo,
        images: body.images,
        isActive: body.isActive,
        updatedAt: new Date(),
      })
      .where(eq(businesses.id, businessId))
      .returning();

    if (updatedBusiness.length === 0) {
      return NextResponse.json(
        { success: false, error: '企业不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: updatedBusiness[0],
      message: '企业更新成功',
    });
  } catch (error) {
    console.error('更新企业失败:', error);
    return NextResponse.json(
      { success: false, error: '更新企业失败' },
      { status: 500 }
    );
  }
}

// DELETE /api/businesses/[id] - 删除企业
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const businessId = parseInt(id);

    const deletedBusiness = await db
      .delete(businesses)
      .where(eq(businesses.id, businessId))
      .returning();

    if (deletedBusiness.length === 0) {
      return NextResponse.json(
        { success: false, error: '企业不存在' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: '企业删除成功',
    });
  } catch (error) {
    console.error('删除企业失败:', error);
    return NextResponse.json(
      { success: false, error: '删除企业失败' },
      { status: 500 }
    );
  }
}
