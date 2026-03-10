'use client';

import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2, MapPin } from 'lucide-react';

interface GeoFence {
  geoFence: {
    id: number;
    businessId: number;
    name: string;
    description: string | null;
    centerLatitude: number;
    centerLongitude: number;
    radius: number;
    regionType: string;
    isActive: boolean;
  };
  business: {
    id: number;
    name: string;
  } | null;
}

interface Business {
  id: number;
  name: string;
  latitude: number | null;
  longitude: number | null;
}

export default function GeoFencesPage() {
  const [geoFences, setGeoFences] = useState<GeoFence[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingFence, setEditingFence] = useState<GeoFence['geoFence'] | null>(null);
  const [formData, setFormData] = useState({
    businessId: '',
    name: '',
    description: '',
    centerLatitude: '',
    centerLongitude: '',
    radius: '5',
    regionType: 'circle',
    isActive: 'true',
  });

  useEffect(() => {
    fetchGeoFences();
    fetchBusinesses();
  }, []);

  const fetchGeoFences = async () => {
    try {
      const response = await fetch('/api/geo-fences');
      const data = await response.json();
      if (data.success) {
        setGeoFences(data.data);
      }
    } catch (error) {
      console.error('获取地理围栏列表失败:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBusinesses = async () => {
    try {
      const response = await fetch('/api/businesses');
      const data = await response.json();
      if (data.success) {
        setBusinesses(data.data);
      }
    } catch (error) {
      console.error('获取企业列表失败:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingFence
        ? `/api/geo-fences/${editingFence.id}`
        : '/api/geo-fences';
      const method = editingFence ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessId: parseInt(formData.businessId),
          name: formData.name,
          description: formData.description || null,
          centerLatitude: parseFloat(formData.centerLatitude),
          centerLongitude: parseFloat(formData.centerLongitude),
          radius: parseFloat(formData.radius),
          regionType: formData.regionType,
          isActive: formData.isActive === 'true',
        }),
      });

      const data = await response.json();
      if (data.success) {
        fetchGeoFences();
        closeModal();
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('保存地理围栏失败:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('确定要删除这个地理围栏吗？')) return;

    try {
      const response = await fetch(`/api/geo-fences/${id}`, {
        method: 'DELETE',
      });
      const data = await response.json();
      if (data.success) {
        fetchGeoFences();
      }
    } catch (error) {
      console.error('删除地理围栏失败:', error);
    }
  };

  const openModal = (fence?: GeoFence) => {
    if (fence) {
      setEditingFence(fence.geoFence);
      setFormData({
        businessId: fence.geoFence.businessId.toString(),
        name: fence.geoFence.name,
        description: fence.geoFence.description || '',
        centerLatitude: fence.geoFence.centerLatitude.toString(),
        centerLongitude: fence.geoFence.centerLongitude.toString(),
        radius: fence.geoFence.radius.toString(),
        regionType: fence.geoFence.regionType,
        isActive: fence.geoFence.isActive.toString(),
      });
    } else {
      setEditingFence(null);
      setFormData({
        businessId: '',
        name: '',
        description: '',
        centerLatitude: '',
        centerLongitude: '',
        radius: '5',
        regionType: 'circle',
        isActive: 'true',
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingFence(null);
  };

  const handleBusinessChange = (businessId: string) => {
    const business = businesses.find((b) => b.id === parseInt(businessId));
    setFormData({
      ...formData,
      businessId,
      centerLatitude: business?.latitude?.toString() || formData.centerLatitude,
      centerLongitude: business?.longitude?.toString() || formData.centerLongitude,
    });
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-gray-500">加载中...</div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">地理围栏管理</h1>
          <p className="mt-2 text-gray-600">
            配置地理位置覆盖范围，精准触达目标客户
          </p>
        </div>
        <button
          onClick={() => openModal()}
          className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          添加围栏
        </button>
      </div>

      {/* 地理围栏列表 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {geoFences.map((item) => (
          <div
            key={item.geoFence.id}
            className="rounded-lg bg-white p-6 shadow"
          >
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-blue-100 p-2">
                  <MapPin className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {item.geoFence.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.business?.name || '-'}
                  </p>
                </div>
              </div>
              <span
                className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                  item.geoFence.isActive
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {item.geoFence.isActive ? '启用' : '停用'}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex items-center justify-between">
                <span>中心位置</span>
                <span className="font-medium text-gray-900">
                  {item.geoFence.centerLatitude.toFixed(4)},{' '}
                  {item.geoFence.centerLongitude.toFixed(4)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>覆盖半径</span>
                <span className="font-medium text-gray-900">
                  {item.geoFence.radius} 公里
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>围栏类型</span>
                <span className="font-medium text-gray-900">
                  {item.geoFence.regionType === 'circle' ? '圆形' : '多边形'}
                </span>
              </div>
            </div>

            {item.geoFence.description && (
              <p className="mt-3 text-sm text-gray-500">
                {item.geoFence.description}
              </p>
            )}

            <div className="mt-4 flex justify-end gap-2 border-t pt-4">
              <button
                onClick={() => openModal(item)}
                className="flex items-center gap-1 rounded px-3 py-1 text-sm text-blue-600 hover:bg-blue-50"
              >
                <Edit className="h-4 w-4" />
                编辑
              </button>
              <button
                onClick={() => handleDelete(item.geoFence.id)}
                className="flex items-center gap-1 rounded px-3 py-1 text-sm text-red-600 hover:bg-red-50"
              >
                <Trash2 className="h-4 w-4" />
                删除
              </button>
            </div>
          </div>
        ))}
      </div>

      {geoFences.length === 0 && (
        <div className="rounded-lg bg-white p-12 text-center shadow">
          <MapPin className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-4 text-lg font-medium text-gray-900">
            暂无地理围栏
          </h3>
          <p className="mt-2 text-gray-500">
            点击右上角"添加围栏"按钮创建第一个地理围栏
          </p>
        </div>
      )}

      {/* 模态框 */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-lg bg-white p-6">
            <h2 className="mb-4 text-xl font-bold">
              {editingFence ? '编辑地理围栏' : '添加地理围栏'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    关联企业 *
                  </label>
                  <select
                    required
                    value={formData.businessId}
                    onChange={(e) => handleBusinessChange(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">请选择企业</option>
                    {businesses.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    围栏名称 *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    placeholder="例如：市中心覆盖区"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    描述
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={2}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      中心纬度 *
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      required
                      value={formData.centerLatitude}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          centerLatitude: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      中心经度 *
                    </label>
                    <input
                      type="number"
                      step="0.0001"
                      required
                      value={formData.centerLongitude}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          centerLongitude: e.target.value,
                        })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    覆盖半径（公里）*
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    required
                    value={formData.radius}
                    onChange={(e) =>
                      setFormData({ ...formData, radius: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    状态
                  </label>
                  <select
                    value={formData.isActive}
                    onChange={(e) =>
                      setFormData({ ...formData, isActive: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
                  >
                    <option value="true">启用</option>
                    <option value="false">停用</option>
                  </select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                  保存
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
