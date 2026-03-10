import { NextRequest, NextResponse } from 'next/server';
import { db, searchLogs, customerStats, keywords, businesses } from '@/db';
import { eq, and, gte, lte, sql, desc } from 'drizzle-orm';

// GET /api/stats - 获取统计数据
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const businessId = searchParams.get('businessId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    // 1. 总体统计
    const totalSearches = await db
      .select({ count: sql<number>`count(*)` })
      .from(searchLogs);

    const totalClicks = await db
      .select({ count: sql<number>`count(*)` })
      .from(searchLogs)
      .where(eq(searchLogs.isClicked, true));

    const totalBusinesses = await db
      .select({ count: sql<number>`count(*)` })
      .from(businesses)
      .where(eq(businesses.isActive, true));

    const totalKeywords = await db
      .select({ count: sql<number>`count(*)` })
      .from(keywords)
      .where(eq(keywords.status, 'active'));

    // 2. 热门关键词
    const hotKeywords = await db
      .select({
        keyword: keywords.keyword,
        searchCount: keywords.searchCount,
        clickCount: keywords.clickCount,
        businessName: businesses.name,
      })
      .from(keywords)
      .leftJoin(businesses, eq(keywords.businessId, businesses.id))
      .where(eq(keywords.status, 'active'))
      .orderBy(desc(keywords.searchCount))
      .limit(10);

    // 3. 如果指定了企业ID，获取该企业的详细统计
    let businessStats = null;
    if (businessId) {
      const id = parseInt(businessId);
      
      // 该企业的搜索统计
      const businessSearchLogs = await db
        .select()
        .from(searchLogs)
        .where(eq(searchLogs.businessId, id));

      // 该企业的关键词统计
      const businessKeywords = await db
        .select()
        .from(keywords)
        .where(eq(keywords.businessId, id));

      // 该企业的地理围栏
      const businessGeoFences = await db
        .select()
        .from(geoFences)
        .where(eq(geoFences.businessId, id));

      businessStats = {
        totalSearches: businessSearchLogs.length,
        totalClicks: businessSearchLogs.filter((log) => log.isClicked).length,
        keywords: businessKeywords,
        geoFences: businessGeoFences,
      };
    }

    // 4. 时间趋势统计（最近7天）
    const last7Days = await db
      .select({
        date: sql<string>`DATE(${searchLogs.createdAt})`,
        count: sql<number>`count(*)`,
      })
      .from(searchLogs)
      .where(
        gte(
          searchLogs.createdAt,
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
        )
      )
      .groupBy(sql`DATE(${searchLogs.createdAt})`)
      .orderBy(sql`DATE(${searchLogs.createdAt})`);

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          totalSearches: totalSearches[0]?.count || 0,
          totalClicks: totalClicks[0]?.count || 0,
          totalBusinesses: totalBusinesses[0]?.count || 0,
          totalKeywords: totalKeywords[0]?.count || 0,
        },
        hotKeywords,
        businessStats,
        trend: last7Days,
      },
    });
  } catch (error) {
    console.error('获取统计数据失败:', error);
    return NextResponse.json(
      { success: false, error: '获取统计数据失败' },
      { status: 500 }
    );
  }
}

// 需要导入 geoFences
import { geoFences } from '@/db/schema';
