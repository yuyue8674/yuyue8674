import { NextRequest, NextResponse } from 'next/server';
import { fileStore } from '@/lib/file-store';

// 获取企业数据导出（适配各平台格式）
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'json-ld'; // json-ld, baidu, aliyun
    const businessId = searchParams.get('businessId');

    let businesses;
    if (businessId) {
      const business = await fileStore.getBusinessById(parseInt(businessId));
      if (!business) {
        return NextResponse.json(
          { error: '企业不存在' },
          { status: 404 }
        );
      }
      businesses = [business];
    } else {
      businesses = await fileStore.getBusinesses();
    }

    // 根据格式导出数据
    let exportData: any;
    let contentType = 'application/json';

    switch (format) {
      case 'json-ld':
        // Schema.org JSON-LD 格式（通用SEO）
        exportData = {
          '@context': 'https://schema.org',
          '@graph': await Promise.all(
            businesses.map(async (business) => {
              const keywords = await fileStore.getKeywords({ businessId: business.id });
              const geoFences = await fileStore.getGeoFences({ businessId: business.id });

              return {
                '@type': business.businessType === '餐饮' ? 'Restaurant' : 'LocalBusiness',
                '@id': `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/show/${business.id}`,
                name: business.name,
                description: business.description,
                url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com'}/show/${business.id}`,
                telephone: business.phone,
                email: business.email,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: business.address,
                  addressLocality: business.city,
                  addressRegion: business.province,
                  addressCountry: 'CN',
                },
                geo: business.latitude && business.longitude
                  ? {
                      '@type': 'GeoCoordinates',
                      latitude: business.latitude,
                      longitude: business.longitude,
                    }
                  : undefined,
                openingHours: 'Mo-Su 00:00-23:59',
                keywords: keywords.map(k => k.keyword.keyword).join(', '),
                areaServed: {
                  '@type': 'Place',
                  name: geoFences.map(g => g.geoFence.name).join(', '),
                },
              };
            })
          ),
        };
        break;

      case 'baidu':
        // 百度地图POI数据格式
        exportData = {
          data: businesses.map((business) => ({
            name: business.name,
            address: business.address,
            city: business.city,
            province: business.province,
            telephone: business.phone,
            lat: business.latitude,
            lng: business.longitude,
            category: business.businessType,
            description: business.description,
          })),
        };
        break;

      case 'aliyun':
        // 阿里云知识库格式
        exportData = {
          dataSource: {
            name: 'GEO获客系统企业库',
            description: '基于地理位置的企业信息库',
            documents: businesses.map((business) => ({
              id: business.id.toString(),
              title: business.name,
              content: `${business.name}是一家专业的${business.businessType || '企业'}。
地址：${business.address || business.city || ''}
联系电话：${business.phone || ''}
${business.description ? `简介：${business.description}` : ''}`,
              metadata: {
                city: business.city,
                businessType: business.businessType,
                latitude: business.latitude,
                longitude: business.longitude,
              },
            })),
          },
        };
        break;

      case 'tencent':
        // 腾讯云混元知识库格式
        exportData = {
          knowledge_base: {
            name: 'GEO获客系统企业库',
            items: businesses.map((business) => ({
              id: business.id.toString(),
              question: `${business.name}在哪里？${business.name}怎么样？`,
              answer: `${business.name}位于${business.address || business.city}，${business.description || '是一家专业的' + (business.businessType || '企业') + '。'}联系电话：${business.phone || '暂无'}`,
              tags: [business.businessType, business.city].filter(Boolean),
            })),
          },
        };
        break;

      case 'sitemap':
        // XML站点地图格式
        const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://your-domain.com';
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${businesses.map(b => `  <url>
    <loc>${siteUrl}/show/${b.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;
        contentType = 'application/xml';
        exportData = xml;
        break;

      default:
        // 默认JSON格式
        exportData = businesses;
    }

    return new NextResponse(
      format === 'sitemap' ? exportData : JSON.stringify(exportData, null, 2),
      {
        headers: {
          'Content-Type': contentType,
          'Content-Disposition': `attachment; filename="business-export-${format}.${format === 'sitemap' ? 'xml' : 'json'}"`,
        },
      }
    );
  } catch (error) {
    console.error('导出数据失败:', error);
    return NextResponse.json(
      { error: '导出数据失败' },
      { status: 500 }
    );
  }
}
