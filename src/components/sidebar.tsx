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
} from 'lucide-react';

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { icon: LayoutDashboard, label: '数据仪表盘', href: '/' },
    { icon: Building2, label: '企业管理', href: '/businesses' },
    { icon: Key, label: '关键词管理', href: '/keywords' },
    { icon: MapPin, label: '地理围栏', href: '/geo-fences' },
    { icon: Search, label: '搜索演示', href: '/search' },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      <div className="flex h-16 items-center justify-center border-b border-gray-800">
        <h1 className="text-xl font-bold">GEO获客系统</h1>
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
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
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
