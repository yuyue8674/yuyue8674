'use client';

import { useEffect, useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Building2,
  Key,
  Search,
  MousePointer,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';

interface StatsData {
  overview: {
    totalSearches: number;
    totalClicks: number;
    totalBusinesses: number;
    totalKeywords: number;
  };
  hotKeywords: Array<{
    keyword: string;
    searchCount: number;
    clickCount: number;
    businessName: string | null;
  }>;
  trend: Array<{
    date: string;
    count: number;
  }>;
}

export default function Dashboard() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('获取统计数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  const clickRate =
    stats && stats.overview.totalSearches > 0
      ? ((stats.overview.totalClicks / stats.overview.totalSearches) * 100).toFixed(2)
      : '0.00';

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">数据仪表盘</h1>
        <p className="mt-2 text-gray-600">实时监控GEO获客效果</p>
      </div>

      {/* 统计卡片 */}
      <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总搜索次数</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats?.overview.totalSearches || 0}
              </p>
            </div>
            <div className="rounded-full bg-blue-100 p-3">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500">+12%</span>
            <span className="ml-2 text-gray-600">较上周</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">总点击次数</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats?.overview.totalClicks || 0}
              </p>
            </div>
            <div className="rounded-full bg-green-100 p-3">
              <MousePointer className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <TrendingUp className="mr-1 h-4 w-4 text-green-500" />
            <span className="text-green-500">+8%</span>
            <span className="ml-2 text-gray-600">较上周</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">活跃企业数</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats?.overview.totalBusinesses || 0}
              </p>
            </div>
            <div className="rounded-full bg-purple-100 p-3">
              <Building2 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">覆盖全业务领域</span>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">活跃关键词</p>
              <p className="mt-2 text-3xl font-bold text-gray-900">
                {stats?.overview.totalKeywords || 0}
              </p>
            </div>
            <div className="rounded-full bg-orange-100 p-3">
              <Key className="h-6 w-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            <span className="text-gray-600">点击率 {clickRate}%</span>
          </div>
        </div>
      </div>

      {/* 图表区域 */}
      <div className="mb-8 grid gap-6 lg:grid-cols-2">
        {/* 搜索趋势图 */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            近7天搜索趋势
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats?.trend || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(value) => value.slice(5)}
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* 热门关键词 */}
        <div className="rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-lg font-semibold text-gray-900">
            热门关键词 Top 10
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={stats?.hotKeywords || []}
              layout="vertical"
              margin={{ left: 20, right: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="keyword" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="searchCount" fill="#3b82f6" name="搜索次数" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 热门关键词表格 */}
      <div className="rounded-lg bg-white shadow">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">关键词详情</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  关键词
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  关联企业
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  搜索次数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  点击次数
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  点击率
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {stats?.hotKeywords.map((item, index) => (
                <tr key={index}>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                    {item.keyword}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {item.businessName || '-'}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {item.searchCount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {item.clickCount}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500">
                    {item.searchCount > 0
                      ? `${((item.clickCount / item.searchCount) * 100).toFixed(2)}%`
                      : '0%'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
