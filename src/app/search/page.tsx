'use client';

import { useState } from 'react';
import { Search, MapPin, Phone, Mail, Globe, Star } from 'lucide-react';

interface SearchResult {
  id: number;
  name: string;
  description: string | null;
  businessType: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  latitude: number | null;
  longitude: number | null;
  matchedKeyword: string | null;
  priority: number;
}

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [userLocation, setUserLocation] = useState({
    latitude: '',
    longitude: '',
    city: '',
  });
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setSearched(true);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          keyword: keyword.trim(),
          userLatitude: userLocation.latitude
            ? parseFloat(userLocation.latitude)
            : null,
          userLongitude: userLocation.longitude
            ? parseFloat(userLocation.longitude)
            : null,
          userCity: userLocation.city || null,
          deviceType: 'desktop',
        }),
      });

      const data = await response.json();
      if (data.success) {
        setResults(data.data);
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('搜索失败:', error);
      alert('搜索失败，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('您的浏览器不支持地理定位');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          ...userLocation,
          latitude: position.coords.latitude.toString(),
          longitude: position.coords.longitude.toString(),
        });
      },
      (error) => {
        console.error('获取位置失败:', error);
        alert('无法获取您的位置，请手动输入');
      }
    );
  };

  return (
    <div className="min-h-full bg-gradient-to-b from-blue-50 to-white p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900">AI智能搜索</h1>
          <p className="mt-2 text-gray-600">
            搜索关键词，发现附近优质商家
          </p>
        </div>

        {/* 搜索框 */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="输入关键词搜索，例如：餐厅、咖啡、健身房..."
                className="w-full rounded-lg border border-gray-300 py-3 pl-12 pr-4 text-lg focus:border-blue-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              disabled={loading || !keyword.trim()}
              className="rounded-lg bg-blue-600 px-8 py-3 text-lg font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? '搜索中...' : '搜索'}
            </button>
          </div>
        </form>

        {/* 位置设置 */}
        <div className="mb-8 rounded-lg bg-white p-4 shadow">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-medium text-gray-900">位置设置</h3>
            <button
              type="button"
              onClick={getCurrentLocation}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
            >
              <MapPin className="h-4 w-4" />
              获取当前位置
            </button>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            <div>
              <label className="mb-1 block text-sm text-gray-600">纬度</label>
              <input
                type="text"
                value={userLocation.latitude}
                onChange={(e) =>
                  setUserLocation({ ...userLocation, latitude: e.target.value })
                }
                placeholder="例如：39.9042"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">经度</label>
              <input
                type="text"
                value={userLocation.longitude}
                onChange={(e) =>
                  setUserLocation({
                    ...userLocation,
                    longitude: e.target.value,
                  })
                }
                placeholder="例如：116.4074"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-600">城市</label>
              <input
                type="text"
                value={userLocation.city}
                onChange={(e) =>
                  setUserLocation({ ...userLocation, city: e.target.value })
                }
                placeholder="例如：北京"
                className="w-full rounded border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* 搜索结果 */}
        {searched && (
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                搜索结果 {results.length > 0 && `(${results.length})`}
              </h2>
            </div>

            {loading ? (
              <div className="py-12 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
                <p className="mt-3 text-gray-500">正在搜索中...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="rounded-lg bg-white p-12 text-center shadow">
                <Search className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-4 text-lg font-medium text-gray-900">
                  未找到相关结果
                </h3>
                <p className="mt-2 text-gray-500">
                  请尝试其他关键词或调整位置设置
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    className="rounded-lg bg-white p-6 shadow transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-600">
                            {index + 1}
                          </span>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-900">
                              {result.name}
                            </h3>
                            {result.businessType && (
                              <span className="inline-block rounded bg-blue-100 px-2 py-0.5 text-xs text-blue-600">
                                {result.businessType}
                              </span>
                            )}
                          </div>
                        </div>

                        {result.description && (
                          <p className="mb-3 text-gray-600">
                            {result.description}
                          </p>
                        )}

                        <div className="grid gap-2 text-sm text-gray-600 md:grid-cols-2">
                          {result.address && (
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-gray-400" />
                              <span>{result.address}</span>
                            </div>
                          )}
                          {result.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-gray-400" />
                              <span>{result.phone}</span>
                            </div>
                          )}
                          {result.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-gray-400" />
                              <span>{result.email}</span>
                            </div>
                          )}
                          {result.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-gray-400" />
                              <a
                                href={result.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:underline"
                              >
                                访问网站
                              </a>
                            </div>
                          )}
                        </div>

                        {result.matchedKeyword && (
                          <div className="mt-3 flex items-center gap-1 text-xs text-gray-500">
                            <Star className="h-3 w-3 text-yellow-500" />
                            匹配关键词：{result.matchedKeyword}
                            <span className="ml-2">
                              (优先级: {result.priority})
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
