import fs from 'fs';
import path from 'path';

// 数据文件路径
const DATA_FILE = path.join(process.cwd(), 'data', 'geo-data.json');

// 确保数据目录存在
function ensureDataDir() {
  const dataDir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// 数据结构
interface Business {
  id: number;
  name: string;
  description: string | null;
  businessType: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  latitude: number | null;
  longitude: number | null;
  logo: string | null;
  images: string[] | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Keyword {
  id: number;
  businessId: number;
  keyword: string;
  priority: number;
  matchType: string;
  status: string;
  searchCount: number;
  clickCount: number;
  createdAt: string;
  updatedAt: string;
}

interface GeoFence {
  id: number;
  businessId: number;
  name: string;
  description: string | null;
  centerLatitude: number;
  centerLongitude: number;
  radius: number;
  regionType: string;
  polygonCoordinates: Array<{ lat: number; lng: number }> | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface SearchLog {
  id: number;
  keyword: string;
  businessId: number | null;
  userLatitude: number | null;
  userLongitude: number | null;
  userCity: string | null;
  userProvince: string | null;
  deviceType: string | null;
  isClicked: boolean;
  clickPosition: number | null;
  createdAt: string;
}

interface DataStore {
  businesses: Business[];
  keywords: Keyword[];
  geoFences: GeoFence[];
  searchLogs: SearchLog[];
  nextBusinessId: number;
  nextKeywordId: number;
  nextGeoFenceId: number;
  nextSearchLogId: number;
}

// 获取默认数据
function getDefaultData(): DataStore {
  const now = new Date().toISOString();
  return {
    businesses: [
      {
        id: 1,
        name: '美味轩餐厅',
        description: '提供正宗川菜和粤菜，环境优雅，服务周到',
        businessType: '餐饮',
        phone: '010-12345678',
        email: 'info@meiweixuan.com',
        website: null,
        address: '北京市朝阳区建国路88号',
        city: '北京',
        province: '北京',
        latitude: 39.9042,
        longitude: 116.4074,
        logo: null,
        images: null,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        name: '阳光健身房',
        description: '专业健身教练指导，设备齐全，24小时营业',
        businessType: '健身',
        phone: '010-87654321',
        email: 'contact@sunshinegym.com',
        website: null,
        address: '北京市海淀区中关村大街1号',
        city: '北京',
        province: '北京',
        latitude: 39.9842,
        longitude: 116.3074,
        logo: null,
        images: null,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 3,
        name: '咖啡时光',
        description: '精品咖啡，手工甜点，适合办公和休闲',
        businessType: '咖啡',
        phone: '010-11112222',
        email: 'hello@coffeetime.com',
        website: null,
        address: '北京市朝阳区三里屯路19号',
        city: '北京',
        province: '北京',
        latitude: 39.9342,
        longitude: 116.4574,
        logo: null,
        images: null,
        isActive: true,
        createdAt: now,
        updatedAt: now,
      },
    ],
    keywords: [
      { id: 1, businessId: 1, keyword: '餐厅', priority: 10, matchType: 'exact', status: 'active', searchCount: 150, clickCount: 45, createdAt: now, updatedAt: now },
      { id: 2, businessId: 1, keyword: '川菜', priority: 9, matchType: 'exact', status: 'active', searchCount: 120, clickCount: 38, createdAt: now, updatedAt: now },
      { id: 3, businessId: 1, keyword: '美食', priority: 7, matchType: 'partial', status: 'active', searchCount: 200, clickCount: 52, createdAt: now, updatedAt: now },
      { id: 4, businessId: 2, keyword: '健身房', priority: 10, matchType: 'exact', status: 'active', searchCount: 180, clickCount: 65, createdAt: now, updatedAt: now },
      { id: 5, businessId: 2, keyword: '健身', priority: 9, matchType: 'exact', status: 'active', searchCount: 160, clickCount: 48, createdAt: now, updatedAt: now },
      { id: 6, businessId: 3, keyword: '咖啡', priority: 10, matchType: 'exact', status: 'active', searchCount: 220, clickCount: 78, createdAt: now, updatedAt: now },
      { id: 7, businessId: 3, keyword: '咖啡厅', priority: 9, matchType: 'exact', status: 'active', searchCount: 140, clickCount: 42, createdAt: now, updatedAt: now },
    ],
    geoFences: [
      { id: 1, businessId: 1, name: '朝阳区覆盖区', description: '覆盖朝阳区核心商圈', centerLatitude: 39.9042, centerLongitude: 116.4074, radius: 10, regionType: 'circle', polygonCoordinates: null, isActive: true, createdAt: now, updatedAt: now },
      { id: 2, businessId: 2, name: '海淀区覆盖区', description: '覆盖海淀区核心商圈', centerLatitude: 39.9842, centerLongitude: 116.3074, radius: 8, regionType: 'circle', polygonCoordinates: null, isActive: true, createdAt: now, updatedAt: now },
      { id: 3, businessId: 3, name: '三里屯商圈', description: '覆盖三里屯核心区域', centerLatitude: 39.9342, centerLongitude: 116.4574, radius: 5, regionType: 'circle', polygonCoordinates: null, isActive: true, createdAt: now, updatedAt: now },
    ],
    searchLogs: [],
    nextBusinessId: 4,
    nextKeywordId: 8,
    nextGeoFenceId: 4,
    nextSearchLogId: 1,
  };
}

// 文件存储类
class FileStore {
  private data: DataStore;

  constructor() {
    ensureDataDir();
    this.data = this.loadData();
  }

  private loadData(): DataStore {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const content = fs.readFileSync(DATA_FILE, 'utf-8');
        return JSON.parse(content);
      }
    } catch (error) {
      console.error('读取数据文件失败:', error);
    }
    // 返回默认数据
    const defaultData = getDefaultData();
    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(data: DataStore = this.data) {
    try {
      ensureDataDir();
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
      console.error('保存数据文件失败:', error);
    }
  }

  // Business methods
  async getBusinesses(filters?: { search?: string; city?: string; type?: string }) {
    let result = [...this.data.businesses];
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(b => 
        b.name.toLowerCase().includes(search) ||
        b.description?.toLowerCase().includes(search)
      );
    }
    if (filters?.city) {
      const city = filters.city;
      result = result.filter(b => b.city?.includes(city));
    }
    if (filters?.type) {
      const type = filters.type;
      result = result.filter(b => b.businessType?.includes(type));
    }
    
    return result;
  }

  async getBusinessById(id: number) {
    return this.data.businesses.find(b => b.id === id);
  }

  async createBusiness(businessData: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const newBusiness: Business = {
      ...businessData,
      id: this.data.nextBusinessId++,
      createdAt: now,
      updatedAt: now,
    };
    this.data.businesses.push(newBusiness);
    this.saveData();
    return newBusiness;
  }

  async updateBusiness(id: number, updateData: Partial<Business>) {
    const index = this.data.businesses.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    this.data.businesses[index] = {
      ...this.data.businesses[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    this.saveData();
    return this.data.businesses[index];
  }

  async deleteBusiness(id: number) {
    const index = this.data.businesses.findIndex(b => b.id === id);
    if (index === -1) return false;
    
    this.data.businesses.splice(index, 1);
    // 删除关联的关键词和地理围栏
    this.data.keywords = this.data.keywords.filter(k => k.businessId !== id);
    this.data.geoFences = this.data.geoFences.filter(g => g.businessId !== id);
    this.saveData();
    return true;
  }

  // Keyword methods
  async getKeywords(filters?: { businessId?: number; search?: string; status?: string }) {
    let result = this.data.keywords.map(keyword => ({
      keyword,
      business: this.data.businesses.find(b => b.id === keyword.businessId) || null,
    }));
    
    if (filters?.businessId) {
      result = result.filter(k => k.keyword.businessId === filters.businessId);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(k => k.keyword.keyword.toLowerCase().includes(search));
    }
    if (filters?.status) {
      result = result.filter(k => k.keyword.status === filters.status);
    }
    
    return result.sort((a, b) => b.keyword.priority - a.keyword.priority);
  }

  async getKeywordById(id: number) {
    return this.data.keywords.find(k => k.id === id);
  }

  async createKeyword(keywordData: Omit<Keyword, 'id' | 'searchCount' | 'clickCount' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const newKeyword: Keyword = {
      ...keywordData,
      id: this.data.nextKeywordId++,
      searchCount: 0,
      clickCount: 0,
      createdAt: now,
      updatedAt: now,
    };
    this.data.keywords.push(newKeyword);
    this.saveData();
    return newKeyword;
  }

  async updateKeyword(id: number, updateData: Partial<Keyword>) {
    const index = this.data.keywords.findIndex(k => k.id === id);
    if (index === -1) return null;
    
    this.data.keywords[index] = {
      ...this.data.keywords[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    this.saveData();
    return this.data.keywords[index];
  }

  async deleteKeyword(id: number) {
    const index = this.data.keywords.findIndex(k => k.id === id);
    if (index === -1) return false;
    
    this.data.keywords.splice(index, 1);
    this.saveData();
    return true;
  }

  async incrementKeywordSearchCount(id: number) {
    const keyword = this.data.keywords.find(k => k.id === id);
    if (keyword) {
      keyword.searchCount++;
      keyword.updatedAt = new Date().toISOString();
      this.saveData();
    }
  }

  // GeoFence methods
  async getGeoFences(filters?: { businessId?: number; search?: string; isActive?: boolean }) {
    let result = this.data.geoFences.map(geoFence => ({
      geoFence,
      business: this.data.businesses.find(b => b.id === geoFence.businessId) || null,
    }));
    
    if (filters?.businessId) {
      result = result.filter(g => g.geoFence.businessId === filters.businessId);
    }
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(g => g.geoFence.name.toLowerCase().includes(search));
    }
    if (filters?.isActive !== undefined) {
      result = result.filter(g => g.geoFence.isActive === filters.isActive);
    }
    
    return result;
  }

  async getGeoFenceById(id: number) {
    return this.data.geoFences.find(g => g.id === id);
  }

  async createGeoFence(fenceData: Omit<GeoFence, 'id' | 'createdAt' | 'updatedAt'>) {
    const now = new Date().toISOString();
    const newGeoFence: GeoFence = {
      ...fenceData,
      id: this.data.nextGeoFenceId++,
      createdAt: now,
      updatedAt: now,
    };
    this.data.geoFences.push(newGeoFence);
    this.saveData();
    return newGeoFence;
  }

  async updateGeoFence(id: number, updateData: Partial<GeoFence>) {
    const index = this.data.geoFences.findIndex(g => g.id === id);
    if (index === -1) return null;
    
    this.data.geoFences[index] = {
      ...this.data.geoFences[index],
      ...updateData,
      updatedAt: new Date().toISOString(),
    };
    this.saveData();
    return this.data.geoFences[index];
  }

  async deleteGeoFence(id: number) {
    const index = this.data.geoFences.findIndex(g => g.id === id);
    if (index === -1) return false;
    
    this.data.geoFences.splice(index, 1);
    this.saveData();
    return true;
  }

  // Search methods
  async search(keyword: string, userLat?: number, userLng?: number) {
    // 查找匹配的关键词
    const matchedKeywords = this.data.keywords.filter(k => 
      k.status === 'active' && (
        k.keyword === keyword || 
        k.keyword.includes(keyword) || 
        keyword.includes(k.keyword)
      )
    );

    if (matchedKeywords.length === 0) {
      // 记录搜索日志
      this.data.searchLogs.push({
        id: this.data.nextSearchLogId++,
        keyword,
        businessId: null,
        userLatitude: userLat || null,
        userLongitude: userLng || null,
        userCity: null,
        userProvince: null,
        deviceType: 'desktop',
        isClicked: false,
        clickPosition: null,
        createdAt: new Date().toISOString(),
      });
      this.saveData();
      return [];
    }

    // 获取关联的企业
    const businessIds = new Set(matchedKeywords.map(k => k.businessId));
    let matchedBusinesses = this.data.businesses.filter(b => 
      b.isActive && businessIds.has(b.id)
    );

    // 如果有用户位置，检查地理围栏
    if (userLat && userLng) {
      const fencesInScope = new Set<number>();
      this.data.geoFences.forEach(fence => {
        if (fence.isActive && businessIds.has(fence.businessId)) {
          const distance = this.calculateDistance(
            userLat, userLng,
            fence.centerLatitude, fence.centerLongitude
          );
          if (distance <= fence.radius) {
            fencesInScope.add(fence.businessId);
          }
        }
      });

      if (fencesInScope.size > 0) {
        matchedBusinesses = matchedBusinesses.filter(b => fencesInScope.has(b.id));
      }
    }

    // 更新搜索次数
    matchedKeywords.forEach(k => {
      k.searchCount++;
      k.updatedAt = new Date().toISOString();
    });

    // 记录搜索日志
    this.data.searchLogs.push({
      id: this.data.nextSearchLogId++,
      keyword,
      businessId: matchedBusinesses[0]?.id || null,
      userLatitude: userLat || null,
      userLongitude: userLng || null,
      userCity: null,
      userProvince: null,
      deviceType: 'desktop',
      isClicked: false,
      clickPosition: null,
      createdAt: new Date().toISOString(),
    });

    this.saveData();

    // 返回结果，按优先级排序
    return matchedBusinesses.map(business => {
      const keywordInfo = matchedKeywords.find(k => k.businessId === business.id);
      return {
        ...business,
        keywordInfo,
        matchedKeyword: keywordInfo?.keyword,
        priority: keywordInfo?.priority || 0,
      };
    }).sort((a, b) => b.priority - a.priority);
  }

  private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
    const R = 6371;
    const dLat = this.toRad(lat2 - lat1);
    const dLng = this.toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private toRad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // Stats methods
  async getStats() {
    const totalSearches = this.data.searchLogs.length;
    const totalClicks = this.data.searchLogs.filter(l => l.isClicked).length;
    const totalBusinesses = this.data.businesses.filter(b => b.isActive).length;
    const totalKeywords = this.data.keywords.filter(k => k.status === 'active').length;

    const hotKeywords = this.data.keywords
      .filter(k => k.status === 'active')
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, 10)
      .map(k => ({
        keyword: k.keyword,
        searchCount: k.searchCount,
        clickCount: k.clickCount,
        businessName: this.data.businesses.find(b => b.id === k.businessId)?.name || null,
      }));

    // 最近7天的趋势
    const last7Days: Array<{ date: string; count: number }> = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = this.data.searchLogs.filter(l => 
        l.createdAt.split('T')[0] === dateStr
      ).length;
      last7Days.push({ date: dateStr, count });
    }

    return {
      overview: {
        totalSearches,
        totalClicks,
        totalBusinesses,
        totalKeywords,
      },
      hotKeywords,
      trend: last7Days,
    };
  }
}

// 单例实例
export const fileStore = new FileStore();
