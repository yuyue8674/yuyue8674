import { NextRequest, NextResponse } from 'next/server';
import { fileStore } from '@/lib/file-store';

// GET /api/businesses - 获取企业列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search') || undefined;
    const city = searchParams.get('city') || undefined;
    const type = searchParams.get('type') || undefined;

    const result = await fileStore.getBusinesses({ search, city, type });

    return NextResponse.json({
      success: true,
      data: result,
      pagination: {
        page: 1,
        limit: result.length,
        total: result.length,
        totalPages: 1,
      },
    });
  } catch (error) {
    console.error('获取企业列表失败:', error);
    return NextResponse.json(
      { success: false, error: '获取企业列表失败' },
      { status: 500 }
    );
  }
}

// POST /api/businesses - 创建企业
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const newBusiness = await fileStore.createBusiness({
      name: body.name,
      description: body.description || null,
      businessType: body.businessType || null,
      phone: body.phone || null,
      email: body.email || null,
      website: body.website || null,
      address: body.address || null,
      city: body.city || null,
      province: body.province || null,
      latitude: body.latitude || null,
      longitude: body.longitude || null,
      logo: body.logo || null,
      images: body.images || null,
      isActive: body.isActive ?? true,
    });

    return NextResponse.json({
      success: true,
      data: newBusiness,
      message: '企业创建成功',
    });
  } catch (error) {
    console.error('创建企业失败:', error);
    return NextResponse.json(
      { success: false, error: '创建企业失败' },
      { status: 500 }
    );
  }
}
