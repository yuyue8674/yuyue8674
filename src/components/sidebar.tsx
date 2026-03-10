'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Building2,
  Key,
  MapPin,
  Search,
  Settings,
  Sparkles,
  Globe,
  Zap,
  FileText,
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: '数据仪表盘', href: '/' },
    { icon: Building2, label: '企业管理', href: '/businesses' },
    { icon: Key, label: '关键词管理', href: '/keywords' },
    { icon: MapPin, label: '地理围栏', href: '/geo-fences' },
    { icon: Sparkles, label: 'AI智能搜索', href: '/ai-search', highlight: true },
    { icon: FileText, label: '百科词条生成', href: '/baike', highlight: true },
    { icon: Zap, label: '平台对接指南', href: '/platform-guide' },
    { icon: Globe, label: '企业目录', href: '/show' },
    { icon: Search, label: '搜索演示', href: '/search' },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <div className="flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-blue-400" />
          <h1 className="text-xl font-bold">GEO获客系统</h1>
        </div>
      </div>
      <nav className="flex-1 space-y-1 p-4">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? item.highlight
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                    : 'bg-blue-600 text-white'
                  : item.highlight
                    ? 'text-purple-400 hover:bg-gray-800 hover:text-purple-300'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
              {item.highlight && !isActive && (
                <span className="ml-auto rounded-full bg-purple-500 px-2 py-0.5 text-xs text-white">
                  NEW
                </span>
              )}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-gray-800 p-4">
        <div className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 hover:bg-gray-800 hover:text-white cursor-pointer">
          <Settings className="h-5 w-5" />
          <span>系统设置</span>
        </div>
      </div>
    </div>
  );
}
