'use client';

import { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Loader2, Sparkles } from 'lucide-react';

export default function AISearchPage() {
  const [keyword, setKeyword] = useState('');
  const [userLocation, setUserLocation] = useState({
    latitude: '',
    longitude: '',
    city: '',
  });
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const responseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 自动滚动到底部
    if (responseRef.current) {
      responseRef.current.scrollTop = responseRef.current.scrollHeight;
    }
  }, [aiResponse]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keyword.trim()) return;

    setLoading(true);
    setSearched(true);
    setAiResponse('');

    try {
      const response = await fetch('/api/ai-search', {
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
        }),
      });

      if (!response.ok) {
        throw new Error('搜索请求失败');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        throw new Error('无法读取响应流');
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.slice(6);
            if (data === '[DONE]') {
              break;
            }
            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                setAiResponse((prev) => prev + parsed.content);
              }
            } catch (e) {
              // 忽略解析错误
            }
          }
        }
      }
    } catch (error) {
      console.error('AI搜索失败:', error);
      setAiResponse('抱歉，搜索服务暂时不可用，请稍后重试。');
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
    <div className="min-h-full bg-gradient-to-b from-blue-50 via-white to-purple-50 p-8">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-3">
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI智能搜索
          </h1>
          <p className="mt-2 text-gray-600">
            基于AI的智能企业搜索，精准匹配您的需求
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
                placeholder="输入您想找的服务，例如：附近好吃的川菜餐厅、咖啡厅..."
                className="w-full rounded-xl border-2 border-gray-200 py-4 pl-12 pr-4 text-lg focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all"
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !keyword.trim()}
              className="rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-medium text-white hover:from-blue-700 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50 transition-all shadow-lg hover:shadow-xl"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'AI搜索'
              )}
            </button>
          </div>
        </form>

        {/* 位置设置 */}
        <div className="mb-8 rounded-xl bg-white p-5 shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-blue-600" />
              位置设置（可选）
            </h3>
            <button
              type="button"
              onClick={getCurrentLocation}
              className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              <MapPin className="h-4 w-4" />
              自动获取位置
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* AI回复 */}
        {searched && (
          <div className="rounded-xl bg-white shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                AI智能推荐
              </h2>
            </div>
            <div
              ref={responseRef}
              className="p-6 max-h-[600px] overflow-y-auto"
            >
              {loading && !aiResponse ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-3 text-gray-600">AI正在思考中...</span>
                </div>
              ) : (
                <div className="prose prose-blue max-w-none">
                  <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
                    {aiResponse}
                    {loading && (
                      <span className="inline-block ml-1 h-5 w-2 animate-pulse bg-blue-600"></span>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 使用提示 */}
        {!searched && (
          <div className="rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 p-8 text-center">
            <div className="mb-4 text-4xl">🎯</div>
            <h3 className="mb-2 text-lg font-semibold text-gray-900">
              开始智能搜索
            </h3>
            <p className="text-gray-600 mb-4">
              输入您想找的服务类型，AI将为您智能匹配最合适的企业
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['川菜餐厅', '咖啡厅', '健身房', '附近美食'].map((tag) => (
                <button
                  key={tag}
                  onClick={() => setKeyword(tag)}
                  className="rounded-full bg-white px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors shadow-sm"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
