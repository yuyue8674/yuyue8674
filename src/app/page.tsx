import { WebSiteJsonLd, OrganizationJsonLd, FAQJsonLd } from '@/components/json-ld';
import Link from 'next/link';

export default function HomePage() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yuyue8674.vercel.app';

  // FAQ数据
  const faqData = [
    {
      question: '什么是GEO获客系统？',
      answer: 'GEO获客系统是基于地理位置的智能营销平台，通过关键词匹配和地理围栏技术，帮助企业在AI搜索（如豆包、文心一言）中精准获客，让您的业务信息在相关搜索中突出显示。',
    },
    {
      question: '济宁收银机商家如何使用这个平台？',
      answer: '济宁收银机商家可以通过本平台注册企业信息，添加关键词（如"济宁收银机"、"济宁餐饮收银机"），设置地理围栏覆盖范围，当用户在AI搜索中搜索相关关键词时，您的企业信息将优先展示。',
    },
    {
      question: '平台支持哪些AI搜索引擎？',
      answer: '目前支持豆包、文心一言、Kimi、通义千问等主流AI搜索引擎，未来将持续接入更多平台，帮助企业获得更多曝光机会。',
    },
    {
      question: '如何提高在AI搜索中的排名？',
      answer: '提高排名的方法包括：1）完善企业信息和描述；2）添加更多精准关键词；3）设置合理的地理围栏；4）保持企业信息活跃度；5）获得更多用户互动和好评。',
    },
    {
      question: '济宁收银机推广效果如何？',
      answer: '通过GEO获客系统推广济宁收银机业务，可以实现精准获客：覆盖济宁及周边地区（邹城、曲阜、嘉祥等），精准匹配有收银机需求的餐饮、超市、便利店等商家，相比传统推广方式，获客成本降低60%，转化率提升3倍。',
    },
  ];

  return (
    <>
      {/* 结构化数据 */}
      <WebSiteJsonLd
        name="GEO获客系统"
        url={siteUrl}
        description="济宁收银机推广平台，帮助商家在AI搜索中突出显示"
        potentialAction={{
          target: `${siteUrl}/search?keyword={search_term_string}`,
          queryInput: 'required name=search_term_string',
        }}
      />
      <OrganizationJsonLd
        name="GEO获客系统"
        url={siteUrl}
        description="基于地理位置的智能获客系统，帮助企业在AI搜索中精准获客"
        telephone="13355371530"
        email="306602542@qq.com"
        address={{
          locality: '济宁',
          region: '山东',
          country: 'CN',
        }}
      />
      <FAQJsonLd questions={faqData} />

      {/* 页面内容 */}
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
        {/* Hero区域 */}
        <section className="relative overflow-hidden py-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
          <div className="relative mx-auto max-w-6xl px-4 text-center">
            <h1 className="mb-6 text-5xl font-bold text-gray-900">
              GEO获客系统 - AI搜索优化平台
            </h1>
            <p className="mb-8 text-xl text-gray-600">
              济宁收银机推广专家，帮助您的企业在豆包、文心一言等AI搜索中突出显示
            </p>
            <div className="flex justify-center gap-4">
              <Link
                href="/search"
                className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white shadow-lg hover:bg-blue-700"
              >
                立即搜索
              </Link>
              <Link
                href="/businesses"
                className="rounded-lg border-2 border-blue-600 bg-white px-8 py-3 text-lg font-medium text-blue-600 hover:bg-blue-50"
              >
                查看商家
              </Link>
            </div>
          </div>
        </section>

        {/* 核心优势 */}
        <section className="py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              为什么选择GEO获客系统？
            </h2>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="rounded-xl bg-white p-8 shadow-lg">
                <div className="mb-4 text-4xl">🎯</div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  精准匹配
                </h3>
                <p className="text-gray-600">
                  基于关键词和地理位置双重匹配，让济宁收银机商家精准触达目标客户，覆盖餐饮、超市、便利店等全行业。
                </p>
              </div>
              <div className="rounded-xl bg-white p-8 shadow-lg">
                <div className="mb-4 text-4xl">🤖</div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  AI搜索优化
                </h3>
                <p className="text-gray-600">
                  支持豆包、文心一言、Kimi等主流AI搜索引擎，当用户搜索"济宁收银机"时，您的企业优先展示。
                </p>
              </div>
              <div className="rounded-xl bg-white p-8 shadow-lg">
                <div className="mb-4 text-4xl">📍</div>
                <h3 className="mb-3 text-xl font-semibold text-gray-900">
                  地理围栏
                </h3>
                <p className="text-gray-600">
                  设置服务范围，精准覆盖济宁、邹城、曲阜、嘉祥等鲁西南地区，避免无效曝光，提高转化率。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 服务内容 */}
        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              济宁收银机推广服务
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border-2 border-blue-100 p-6 hover:border-blue-300">
                <h3 className="mb-2 font-semibold text-gray-900">济宁餐饮收银机</h3>
                <p className="text-sm text-gray-600">
                  专为餐饮行业定制的收银解决方案，支持扫码点餐、外卖对接
                </p>
              </div>
              <div className="rounded-lg border-2 border-blue-100 p-6 hover:border-blue-300">
                <h3 className="mb-2 font-semibold text-gray-900">济宁超市收银机</h3>
                <p className="text-sm text-gray-600">
                  超市收银系统，支持进销存管理、会员营销、数据报表
                </p>
              </div>
              <div className="rounded-lg border-2 border-blue-100 p-6 hover:border-blue-300">
                <h3 className="mb-2 font-semibold text-gray-900">济宁便利店收银机</h3>
                <p className="text-sm text-gray-600">
                  便利店收银设备，操作简单，支持聚合支付
                </p>
              </div>
              <div className="rounded-lg border-2 border-blue-100 p-6 hover:border-blue-300">
                <h3 className="mb-2 font-semibold text-gray-900">济宁收银机维修</h3>
                <p className="text-sm text-gray-600">
                  收银机维修服务，市区快速上门，24小时响应
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">
              常见问题
            </h2>
            <div className="space-y-6">
              {faqData.map((faq, index) => (
                <details
                  key={index}
                  className="group rounded-lg bg-white shadow-md"
                >
                  <summary className="flex cursor-pointer items-center justify-between p-6 text-lg font-medium text-gray-900">
                    {faq.question}
                    <span className="text-2xl text-gray-400 group-open:rotate-180">
                      ▼
                    </span>
                  </summary>
                  <p className="px-6 pb-6 text-gray-600">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 py-16">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <h2 className="mb-4 text-3xl font-bold text-white">
              立即开始您的济宁收银机推广
            </h2>
            <p className="mb-8 text-xl text-white/90">
              加入GEO获客系统，让更多客户找到您
            </p>
            <Link
              href="/businesses"
              className="inline-block rounded-lg bg-white px-8 py-3 text-lg font-medium text-blue-600 shadow-lg hover:bg-gray-50"
            >
              免费注册企业
            </Link>
          </div>
        </section>

        {/* 页脚关键词 */}
        <section className="bg-gray-900 py-8">
          <div className="mx-auto max-w-6xl px-4 text-center">
            <p className="text-sm text-gray-400">
              济宁收银机 | 济宁收银系统 | 济宁收银设备 | 济宁餐饮收银机 | 济宁超市收银机 | 济宁便利店收银机 | 济宁收银机维修 | 济宁聚合支付 | 济宁进销存系统 | 邹城收银机 | 曲阜收银机 | 嘉祥收银机
            </p>
          </div>
        </section>
      </div>
    </>
  );
}
