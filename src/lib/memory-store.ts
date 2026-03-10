// 内存存储 - 用于演示和开发环境
// 生产环境建议使用真实数据库

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
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
  updatedAt: Date;
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
  createdAt: Date;
}

class MemoryStore {
  private businesses: Business[] = [];
  private keywords: Keyword[] = [];
  private geoFences: GeoFence[] = [];
  private searchLogs: SearchLog[] = [];
  private nextBusinessId = 1;
  private nextKeywordId = 1;
  private nextGeoFenceId = 1;
  private nextSearchLogId = 1;

  constructor() {
    this.initDemoData();
  }

  private initDemoData() {
    // 初始化演示数据
    const demoBusinesses: Business[] = [
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
        createdAt: new Date(),
        updatedAt: new Date(),
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
        createdAt: new Date(),
        updatedAt: new Date(),
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
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    const demoKeywords: Keyword[] = [
      { id: 1, businessId: 1, keyword: '餐厅', priority: 10, matchType: 'exact', status: 'active', searchCount: 150, clickCount: 45, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, businessId: 1, keyword: '川菜', priority: 9, matchType: 'exact', status: 'active', searchCount: 120, clickCount: 38, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, businessId: 1, keyword: '美食', priority: 7, matchType: 'partial', status: 'active', searchCount: 200, clickCount: 52, createdAt: new Date(), updatedAt: new Date() },
      { id: 4, businessId: 2, keyword: '健身房', priority: 10, matchType: 'exact', status: 'active', searchCount: 180, clickCount: 65, createdAt: new Date(), updatedAt: new Date() },
      { id: 5, businessId: 2, keyword: '健身', priority: 9, matchType: 'exact', status: 'active', searchCount: 160, clickCount: 48, createdAt: new Date(), updatedAt: new Date() },
      { id: 6, businessId: 3, keyword: '咖啡', priority: 10, matchType: 'exact', status: 'active', searchCount: 220, clickCount: 78, createdAt: new Date(), updatedAt: new Date() },
      { id: 7, businessId: 3, keyword: '咖啡厅', priority: 9, matchType: 'exact', status: 'active', searchCount: 140, clickCount: 42, createdAt: new Date(), updatedAt: new Date() },
    ];

    const demoGeoFences: GeoFence[] = [
      { id: 1, businessId: 1, name: '朝阳区覆盖区', description: '覆盖朝阳区核心商圈', centerLatitude: 39.9042, centerLongitude: 116.4074, radius: 10, regionType: 'circle', polygonCoordinates: null, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 2, businessId: 2, name: '海淀区覆盖区', description: '覆盖海淀区核心商圈', centerLatitude: 39.9842, centerLongitude: 116.3074, radius: 8, regionType: 'circle', polygonCoordinates: null, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      { id: 3, businessId: 3, name: '三里屯商圈', description: '覆盖三里屯核心区域', centerLatitude: 39.9342, centerLongitude: 116.4574, radius: 5, regionType: 'circle', polygonCoordinates: null, isActive: true, createdAt: new Date(), updatedAt: new Date() },
    ];

    this.businesses = demoBusinesses;
    this.keywords = demoKeywords;
    this.geoFences = demoGeoFences;
    this.nextBusinessId = 4;
    this.nextKeywordId = 8;
    this.nextGeoFenceId = 4;
  }

  // Business methods
  async getBusinesses(filters?: { search?: string; city?: string; type?: string }) {
    let result = [...this.businesses];
    
    if (filters?.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(b => 
        b.name.toLowerCase().includes(search) ||
        b.description?.toLowerCase().includes(search)
      );
    }
    if (filters?.city) {
      result = result.filter(b => b.city?.includes(filters.city));
    }
    if (filters?.type) {
      result = result.filter(b => b.businessType?.includes(filters.type));
    }
    
    return result;
  }

  async getBusinessById(id: number) {
    return this.businesses.find(b => b.id === id);
  }

  async createBusiness(data: Omit<Business, 'id' | 'createdAt' | 'updatedAt'>) {
    const newBusiness: Business = {
      ...data,
      id: this.nextBusinessId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.businesses.push(newBusiness);
    return newBusiness;
  }

  async updateBusiness(id: number, data: Partial<Business>) {
    const index = this.businesses.findIndex(b => b.id === id);
    if (index === -1) return null;
    
    this.businesses[index] = {
      ...this.businesses[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.businesses[index];
  }

  async deleteBusiness(id: number) {
    const index = this.businesses.findIndex(b => b.id === id);
    if (index === -1) return false;
    
    this.businesses.splice(index, 1);
    // 删除关联的关键词和地理围栏
    this.keywords = this.keywords.filter(k => k.businessId !== id);
    this.geoFences = this.geoFences.filter(g => g.businessId !== id);
    return true;
  }

  // Keyword methods
  async getKeywords(filters?: { businessId?: number; search?: string; status?: string }) {
    let result = this.keywords.map(keyword => ({
      keyword,
      business: this.businesses.find(b => b.id === keyword.businessId) || null,
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
    return this.keywords.find(k => k.id === id);
  }

  async createKeyword(data: Omit<Keyword, 'id' | 'searchCount' | 'clickCount' | 'createdAt' | 'updatedAt'>) {
    const newKeyword: Keyword = {
      ...data,
      id: this.nextKeywordId++,
      searchCount: 0,
      clickCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.keywords.push(newKeyword);
    return newKeyword;
  }

  async updateKeyword(id: number, data: Partial<Keyword>) {
    const index = this.keywords.findIndex(k => k.id === id);
    if (index === -1) return null;
    
    this.keywords[index] = {
      ...this.keywords[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.keywords[index];
  }

  async deleteKeyword(id: number) {
    const index = this.keywords.findIndex(k => k.id === id);
    if (index === -1) return false;
    
    this.keywords.splice(index, 1);
    return true;
  }

  async incrementKeywordSearchCount(id: number) {
    const keyword = this.keywords.find(k => k.id === id);
    if (keyword) {
      keyword.searchCount++;
      keyword.updatedAt = new Date();
    }
  }

  // GeoFence methods
  async getGeoFences(filters?: { businessId?: number; search?: string; isActive?: boolean }) {
    let result = this.geoFences.map(geoFence => ({
      geoFence,
      business: this.businesses.find(b => b.id === geoFence.businessId) || null,
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
    return this.geoFences.find(g => g.id === id);
  }

  async createGeoFence(data: Omit<GeoFence, 'id' | 'createdAt' | 'updatedAt'>) {
    const newGeoFence: GeoFence = {
      ...data,
      id: this.nextGeoFenceId++,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.geoFences.push(newGeoFence);
    return newGeoFence;
  }

  async updateGeoFence(id: number, data: Partial<GeoFence>) {
    const index = this.geoFences.findIndex(g => g.id === id);
    if (index === -1) return null;
    
    this.geoFences[index] = {
      ...this.geoFences[index],
      ...data,
      updatedAt: new Date(),
    };
    return this.geoFences[index];
  }

  async deleteGeoFence(id: number) {
    const index = this.geoFences.findIndex(g => g.id === id);
    if (index === -1) return false;
    
    this.geoFences.splice(index, 1);
    return true;
  }

  // Search methods
  async search(keyword: string, userLat?: number, userLng?: number) {
    // 查找匹配的关键词
    const matchedKeywords = this.keywords.filter(k => 
      k.status === 'active' && (
        k.keyword === keyword || 
        k.keyword.includes(keyword) || 
        keyword.includes(k.keyword)
      )
    );

    if (matchedKeywords.length === 0) {
      // 记录搜索日志
      this.searchLogs.push({
        id: this.nextSearchLogId++,
        keyword,
        businessId: null,
        userLatitude: userLat || null,
        userLongitude: userLng || null,
        userCity: null,
        userProvince: null,
        deviceType: 'desktop',
        isClicked: false,
        clickPosition: null,
        createdAt: new Date(),
      });
      return [];
    }

    // 获取关联的企业
    const businessIds = new Set(matchedKeywords.map(k => k.businessId));
    let matchedBusinesses = this.businesses.filter(b => 
      b.isActive && businessIds.has(b.id)
    );

    // 如果有用户位置，检查地理围栏
    if (userLat && userLng) {
      const fencesInScope = new Set<number>();
      this.geoFences.forEach(fence => {
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
      k.updatedAt = new Date();
    });

    // 记录搜索日志
    this.searchLogs.push({
      id: this.nextSearchLogId++,
      keyword,
      businessId: matchedBusinesses[0]?.id || null,
      userLatitude: userLat || null,
      userLongitude: userLng || null,
      userCity: null,
      userProvince: null,
      deviceType: 'desktop',
      isClicked: false,
      clickPosition: null,
      createdAt: new Date(),
    });

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
    const totalSearches = this.searchLogs.length;
    const totalClicks = this.searchLogs.filter(l => l.isClicked).length;
    const totalBusinesses = this.businesses.filter(b => b.isActive).length;
    const totalKeywords = this.keywords.filter(k => k.status === 'active').length;

    const hotKeywords = this.keywords
      .filter(k => k.status === 'active')
      .sort((a, b) => b.searchCount - a.searchCount)
      .slice(0, 10)
      .map(k => ({
        keyword: k.keyword,
        searchCount: k.searchCount,
        clickCount: k.clickCount,
        businessName: this.businesses.find(b => b.id === k.businessId)?.name || null,
      }));

    // 最近7天的趋势
    const last7Days: Array<{ date: string; count: number }> = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];
      const count = this.searchLogs.filter(l => 
        l.createdAt.toISOString().split('T')[0] === dateStr
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
export const memoryStore = new MemoryStore();
