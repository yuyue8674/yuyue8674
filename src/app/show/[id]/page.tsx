import { Metadata } from 'next';
import { fileStore } from '@/lib/file-store';

// 生成静态参数
export async function generateStaticParams() {
  const businesses = await fileStore.getBusinesses();
  return businesses.map((business) => ({
    id: business.id.toString(),
  }));
}

// 生成元数据
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const business = await fileStore.getBusinessById(parseInt(id));

  if (!business) {
    return {
      title: '企业未找到',
    };
  }

  const title = `${business.name} - ${business.businessType || '企业'} | GEO获客系统`;
  const description = business.description || `${business.name}是一家专业的${business.businessType || '企业'}，地址：${business.address || business.city || ''}，联系电话：${business.phone || ''}`;

  return {
    title,
    description,
    keywords: [
      business.name,
      business.businessType || '',
      business.city || '',
      business.businessType ? `${business.city}${business.businessType}` : '',
    ].filter(Boolean),
    openGraph: {
      title,
      description,
      type: 'article',
      locale: 'zh_CN',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

// 企业公开展示页面
export default async function BusinessShowPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const business = await fileStore.getBusinessById(parseInt(id));

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">企业未找到</h1>
          <p className="text-gray-600">该企业信息可能已被删除或不存在</p>
        </div>
      </div>
    );
  }

  const keywords = await fileStore.getKeywords({ businessId: business.id });
  const geoFences = await fileStore.getGeoFences({ businessId: business.id });

  // 生成结构化数据 (JSON-LD)
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': business.businessType === '餐饮' ? 'Restaurant' : 'LocalBusiness',
    name: business.name,
    description: business.description,
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
    telephone: business.phone,
    email: business.email,
    url: business.website,
    openingHours: 'Mo-Su 00:00-23:59', // 默认24小时
    priceRange: '$$', // 默认中等价位
    servesCuisine: business.businessType === '餐饮' ? ['川菜', '粤菜'] : undefined,
    keywords: keywords.map((k) => k.keyword.keyword).join(', '),
    areaServed: geoFences.map((g) => g.geoFence.name).join(', '),
  };

  return (
    <>
      {/* 结构化数据 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      {/* 页面内容 */}
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        {/* 头部横幅 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-4">
                  <span className="inline-block bg-white/20 backdrop-blur-sm rounded-full px-4 py-1 text-sm font-medium">
                    {business.businessType || '企业'}
                  </span>
                </div>
                <h1 className="text-4xl font-bold mb-4">{business.name}</h1>
                {business.description && (
                  <p className="text-xl text-white/90 max-w-2xl">
                    {business.description}
                  </p>
                )}
              </div>
              {business.logo && (
                <img
                  src={business.logo}
                  alt={business.name}
                  className="w-32 h-32 rounded-lg shadow-lg"
                />
              )}
            </div>
          </div>
        </div>

        {/* 主要内容 */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* 左侧信息 */}
            <div className="lg:col-span-2 space-y-8">
              {/* 基本信息 */}
              <div className="bg-white rounded-xl shadow-sm p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  📍 基本信息
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {business.phone && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-2">
                        联系电话
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {business.phone}
                      </p>
                    </div>
                  )}
                  {business.email && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-2">
                        电子邮箱
                      </label>
                      <p className="text-lg text-blue-600">{business.email}</p>
                    </div>
                  )}
                  {business.website && (
                    <div>
                      <label className="text-sm font-medium text-gray-500 block mb-2">
                        官方网站
                      </label>
                      <a
                        href={business.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-blue-600 hover:underline"
                      >
                        {business.website}
                      </a>
                    </div>
                  )}
                  {business.address && (
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium text-gray-500 block mb-2">
                        详细地址
                      </label>
                      <p className="text-lg text-gray-900">{business.address}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* 服务关键词 */}
              {keywords.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    🔍 服务关键词
                  </h2>
                  <div className="flex flex-wrap gap-3">
                    {keywords.map((item) => (
                      <span
                        key={item.keyword.id}
                        className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700"
                      >
                        {item.keyword.keyword}
                        <span className="text-xs text-blue-500">
                          (优先级: {item.keyword.priority})
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 服务区域 */}
              {geoFences.length > 0 && (
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    🗺️ 服务区域
                  </h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {geoFences.map((item) => (
                      <div
                        key={item.geoFence.id}
                        className="rounded-lg border-2 border-gray-100 p-4"
                      >
                        <div className="font-semibold text-gray-900 mb-2">
                          {item.geoFence.name}
                        </div>
                        <div className="text-sm text-gray-600">
                          覆盖半径: {item.geoFence.radius} 公里
                        </div>
                        {item.geoFence.description && (
                          <div className="text-sm text-gray-500 mt-2">
                            {item.geoFence.description}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 右侧边栏 */}
            <div className="space-y-6">
              {/* 快速联系 */}
              <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4">
                <h3 className="font-bold text-gray-900 mb-4">快速联系</h3>
                {business.phone && (
                  <a
                    href={`tel:${business.phone}`}
                    className="flex items-center justify-center gap-2 w-full rounded-lg bg-blue-600 px-6 py-3 text-white font-medium hover:bg-blue-700 mb-3"
                  >
                    📞 拨打电话
                  </a>
                )}
                {business.email && (
                  <a
                    href={`mailto:${business.email}`}
                    className="flex items-center justify-center gap-2 w-full rounded-lg border-2 border-gray-200 px-6 py-3 text-gray-700 font-medium hover:bg-gray-50"
                  >
                    ✉️ 发送邮件
                  </a>
                )}

                {/* 位置信息 */}
                {business.latitude && business.longitude && (
                  <div className="mt-6 pt-6 border-t">
                    <div className="text-sm text-gray-500 mb-2">位置坐标</div>
                    <div className="text-sm text-gray-900 font-mono">
                      纬度: {business.latitude.toFixed(4)}
                      <br />
                      经度: {business.longitude.toFixed(4)}
                    </div>
                  </div>
                )}
              </div>

              {/* SEO信息 */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-3 text-sm">
                  搜索优化信息
                </h3>
                <div className="text-xs text-gray-600 space-y-2">
                  <p>✅ 结构化数据已启用</p>
                  <p>✅ SEO元标签已优化</p>
                  <p>✅ 适配AI搜索引擎</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 页脚 */}
        <div className="bg-gray-900 text-white py-8 mt-12">
          <div className="max-w-6xl mx-auto px-4 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} {business.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
