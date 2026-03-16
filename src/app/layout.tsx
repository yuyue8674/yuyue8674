import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';
import Sidebar from '@/components/sidebar';

export const metadata: Metadata = {
  title: {
    default: 'GEO获客系统 | AI搜索优化平台 - 济宁收银机商家推广',
    template: '%s | GEO获客系统',
  },
  description: '济宁收银机推广平台，帮助济宁地区收银机商家在AI搜索中突出显示。提供济宁收银机、收银系统、收银设备推广服务，覆盖餐饮、超市、便利店等行业。',
  keywords: [
    '济宁收银机',
    '济宁收银系统',
    '济宁收银设备',
    '济宁餐饮收银机',
    '济宁超市收银机',
    '济宁便利店收银机',
    '济宁收银机维修',
    '济宁收银机销售',
    '济宁聚合支付',
    '济宁进销存系统',
    'GEO营销',
    '获客系统',
    'AI搜索',
    '地理围栏',
    '关键词优化',
  ],
  authors: [{ name: 'GEO获客系统' }],
  creator: 'GEO获客系统',
  publisher: 'GEO获客系统',
  other: {
    'baidu-site-verification': 'codeva-nnIAFxEgXX',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    siteName: 'GEO获客系统',
    title: 'GEO获客系统 | AI搜索优化平台 - 济宁收银机商家推广',
    description: '济宁收银机推广平台，帮助济宁地区收银机商家在AI搜索中突出显示。提供济宁收银机、收银系统、收银设备推广服务。',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'GEO获客系统 - AI搜索优化平台',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GEO获客系统 | AI搜索优化平台',
    description: '济宁收银机推广平台，帮助商家在AI搜索中突出显示',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jining-shouyinji.cn',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <html lang="zh-CN">
      <body className="antialiased">
        {isDev && <Inspector />}
        <div className="flex h-screen">
          <Sidebar />
          <main className="flex-1 overflow-auto bg-gray-50">{children}</main>
        </div>
      </body>
    </html>
  );
}
