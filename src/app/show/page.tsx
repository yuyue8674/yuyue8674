import { Metadata } from 'next';
import Link from 'next/link';
import { fileStore } from '@/lib/file-store';

export const metadata: Metadata = {
  title: '企业目录 | GEO获客系统',
  description:
    '查找优质企业和服务商，支持按关键词、地理位置搜索。优化AI搜索引擎收录，让您的企业被更多人找到。',
  keywords: ['企业目录', '商家名录', '服务搜索', '地理位置搜索'],
  robots: {
    index: true,
    follow: true,
  },
};

// 企业列表页面（公开，SEO优化）
export default async function BusinessListPage() {
  const businesses = await fileStore.getBusinesses();

  return (
    <>
      {/* 结构化数据 - 企业列表 */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            name: 'GEO获客系统 - 企业目录',
            description: '优质企业和服务商目录',
            numberOfItems: businesses.length,
            itemListElement: businesses.map((business, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              item: {
                '@type': 'LocalBusiness',
                name: business.name,
                description: business.description,
                url: `/show/${business.id}`,
                telephone: business.phone,
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: business.address,
                  addressLocality: business.city,
                },
              },
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* 头部 */}
        <div className="bg-white border-b">
          <div className="max-w-6xl mx-auto px-4 py-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              企业目录
            </h1>
            <p className="text-lg text-gray-600">
              发现优质企业和服务商，支持AI搜索引擎智能收录
            </p>
          </div>
        </div>

        {/* 企业列表 */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {businesses.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏢</div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                暂无企业信息
              </h2>
              <p className="text-gray-600">
                管理员可以在后台添加企业信息
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {businesses.map((business) => (
                <Link
                  key={business.id}
                  href={`/show/${business.id}`}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-6"
                >
                  {/* 企业卡片 */}
                  <div className="flex items-start gap-4">
                    {business.logo ? (
                      <img
                        src={business.logo}
                        alt={business.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold">
                        {business.name.charAt(0)}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                        {business.name}
                      </h3>
                      {business.businessType && (
                        <span className="inline-block bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded mt-1">
                          {business.businessType}
                        </span>
                      )}
                    </div>
                  </div>

                  {business.description && (
                    <p className="text-sm text-gray-600 mt-4 line-clamp-2">
                      {business.description}
                    </p>
                  )}

                  <div className="mt-4 pt-4 border-t flex items-center justify-between text-sm text-gray-500">
                    {business.city && (
                      <span className="flex items-center gap-1">
                        📍 {business.city}
                      </span>
                    )}
                    {business.phone && (
                      <span className="flex items-center gap-1">
                        📞 {business.phone}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* SEO提示 */}
        <div className="bg-white border-t">
          <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
              <h3 className="font-bold text-gray-900 mb-2">
                🔍 AI搜索引擎优化
              </h3>
              <p className="text-sm text-gray-700">
                本页面已优化结构化数据，支持百度、搜狗等搜索引擎收录，并适配文心一言、豆包等AI搜索引擎智能推荐。
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
