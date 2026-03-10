import { NextRequest, NextResponse } from 'next/server';
import { db, businesses } from '@/db';
import { like, or, and, eq } from 'drizzle-orm';

// GET /api/businesses - 获取企业列表
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search');
    const city = searchParams.get('city');
    const type = searchParams.get('type');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let query = db.select().from(businesses);

    // 构建查询条件
    const conditions = [];
    if (search) {
      conditions.push(
        or(
          like(businesses.name, `%${search}%`),
          like(businesses.description, `%${search}%`)
        )
      );
    }
    if (city) {
      conditions.push(like(businesses.city, `%${city}%`));
    }
    if (type) {
      conditions.push(like(businesses.businessType, `%${type}%`));
    }

    // 执行查询
    const result = await (conditions.length > 0 
      ? db.select().from(businesses).where(and(...conditions)).limit(limit).offset(offset)
      : db.select().from(businesses).limit(limit).offset(offset)
    );

    // 获取总数
    const totalResult = await db.select().from(businesses);
    const total = totalResult.length;

    return NextResponse.json({
      success: true,
      data: result,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
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

    const newBusiness = await db.insert(businesses).values({
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
    }).returning();

    return NextResponse.json({
      success: true,
      data: newBusiness[0],
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
