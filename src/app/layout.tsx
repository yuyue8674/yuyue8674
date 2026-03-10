import type { Metadata } from 'next';
import { Inspector } from 'react-dev-inspector';
import './globals.css';
import Sidebar from '@/components/sidebar';

export const metadata: Metadata = {
  title: {
    default: 'GEO获客系统 | AI搜索优化平台',
    template: '%s | GEO获客系统',
  },
  description: '基于地理位置的智能获客系统，帮助企业在AI搜索中突出显示业务信息',
  keywords: ['GEO营销', '获客系统', 'AI搜索', '地理围栏', '关键词优化'],
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
