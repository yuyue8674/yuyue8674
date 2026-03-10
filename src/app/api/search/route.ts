import { NextRequest, NextResponse } from 'next/server';
import { db, businesses, keywords, geoFences, searchLogs } from '@/db';
import { like, eq, and, or, desc, sql } from 'drizzle-orm';

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

    // 1. 查找匹配的关键词
    const matchedKeywords = await db
      .select()
      .from(keywords)
      .where(
        and(
          eq(keywords.status, 'active'),
          or(
            eq(keywords.keyword, keyword),
            like(keywords.keyword, `%${keyword}%`)
          )
        )
      )
      .orderBy(desc(keywords.priority));

    if (matchedKeywords.length === 0) {
      // 记录搜索日志
      await db.insert(searchLogs).values({
        keyword,
        userLatitude: userLatitude || null,
        userLongitude: userLongitude || null,
        userCity: userCity || null,
        userProvince: null,
        deviceType: deviceType || null,
        isClicked: false,
      });

      return NextResponse.json({
        success: true,
        data: [],
        message: '未找到匹配结果',
      });
    }

    // 2. 获取关联的企业信息
    const businessIds = matchedKeywords.map((k) => k.businessId);
    const matchedBusinesses = await db
      .select()
      .from(businesses)
      .where(
        and(
          eq(businesses.isActive, true),
          sql`${businesses.id} IN (${businessIds.join(',')})`
        )
      );

    // 3. 如果有用户位置，检查地理围栏
    let filteredBusinesses = matchedBusinesses;
    if (userLatitude && userLongitude) {
      const allGeoFences = await db.select().from(geoFences).where(
        sql`${geoFences.businessId} IN (${businessIds.join(',')}) AND ${geoFences.isActive} = true`
      );

      // 过滤在地理围栏范围内的企业
      const businessesWithGeoFence = new Set<number>();
      allGeoFences.forEach((fence) => {
        const distance = calculateDistance(
          userLatitude,
          userLongitude,
          fence.centerLatitude,
          fence.centerLongitude
        );
        if (distance <= fence.radius) {
          businessesWithGeoFence.add(fence.businessId);
        }
      });

      if (businessesWithGeoFence.size > 0) {
        filteredBusinesses = matchedBusinesses.filter((b) =>
          businessesWithGeoFence.has(b.id)
        );
      }
    }

    // 4. 更新关键词搜索次数
    await Promise.all(
      matchedKeywords.map((k) =>
        db
          .update(keywords)
          .set({
            searchCount: sql`${keywords.searchCount} + 1`,
          })
          .where(eq(keywords.id, k.id))
      )
    );

    // 5. 记录搜索日志
    await db.insert(searchLogs).values({
      keyword,
      userLatitude: userLatitude || null,
      userLongitude: userLongitude || null,
      userCity: userCity || null,
      userProvince: null,
      deviceType: deviceType || null,
      isClicked: false,
    });

    // 6. 返回搜索结果，按优先级排序
    const results = filteredBusinesses
      .map((business) => {
        const keywordInfo = matchedKeywords.find(
          (k) => k.businessId === business.id
        );
        return {
          ...business,
          keywordInfo,
          matchedKeyword: keywordInfo?.keyword,
          priority: keywordInfo?.priority || 0,
        };
      })
      .sort((a, b) => b.priority - a.priority);

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

// 计算两点之间的距离（单位：公里）
function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371; // 地球半径，单位：公里
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}
