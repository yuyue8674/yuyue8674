import { db, businesses, keywords, geoFences } from './schema';
import { eq } from 'drizzle-orm';

// 演示数据种子
async function seed() {
  console.log('开始种子数据...');

  // 创建示例企业
  const sampleBusinesses = [
    {
      name: '美味轩餐厅',
      description: '提供正宗川菜和粤菜，环境优雅，服务周到',
      businessType: '餐饮',
      phone: '010-12345678',
      email: 'info@meiweixuan.com',
      address: '北京市朝阳区建国路88号',
      city: '北京',
      province: '北京',
      latitude: 39.9042,
      longitude: 116.4074,
      isActive: true,
    },
    {
      name: '阳光健身房',
      description: '专业健身教练指导，设备齐全，24小时营业',
      businessType: '健身',
      phone: '010-87654321',
      email: 'contact@sunshinegym.com',
      address: '北京市海淀区中关村大街1号',
      city: '北京',
      province: '北京',
      latitude: 39.9842,
      longitude: 116.3074,
      isActive: true,
    },
    {
      name: '咖啡时光',
      description: '精品咖啡，手工甜点，适合办公和休闲',
      businessType: '咖啡',
      phone: '010-11112222',
      email: 'hello@coffeetime.com',
      address: '北京市朝阳区三里屯路19号',
      city: '北京',
      province: '北京',
      latitude: 39.9342,
      longitude: 116.4574,
      isActive: true,
    },
    {
      name: '悦读书店',
      description: '精选图书，文化沙龙，亲子阅读空间',
      businessType: '书店',
      phone: '010-33334444',
      email: 'read@happybooks.com',
      address: '北京市西城区西单北大街120号',
      city: '北京',
      province: '北京',
      latitude: 39.9142,
      longitude: 116.3774,
      isActive: true,
    },
  ];

  console.log('插入企业数据...');
  const insertedBusinesses = await db.insert(businesses).values(sampleBusinesses).returning();

  // 创建关键词
  const sampleKeywords = [
    { businessId: insertedBusinesses[0].id, keyword: '餐厅', priority: 10, matchType: 'exact', status: 'active' },
    { businessId: insertedBusinesses[0].id, keyword: '川菜', priority: 9, matchType: 'exact', status: 'active' },
    { businessId: insertedBusinesses[0].id, keyword: '粤菜', priority: 8, matchType: 'exact', status: 'active' },
    { businessId: insertedBusinesses[0].id, keyword: '美食', priority: 7, matchType: 'partial', status: 'active' },
    { businessId: insertedBusinesses[0].id, keyword: '附近餐厅', priority: 6, matchType: 'broad', status: 'active' },

    { businessId: insertedBusinesses[1].id, keyword: '健身房', priority: 10, matchType: 'exact', status: 'active' },
    { businessId: insertedBusinesses[1].id, keyword: '健身', priority: 9, matchType: 'exact', status: 'active' },
    { businessId: insertedBusinesses[1].id, keyword: '运动', priority: 7, matchType: 'partial', status: 'active' },
    { businessId: insertedBusinesses[1].id, keyword: '减肥', priority: 6, matchType: 'broad', status: 'active' },

    { businessId: insertedBusinesses[2].id, keyword: '咖啡', priority: 10, matchType: 'exact', status: 'active' },
    { businessId: insertedBusinesses[2].id, keyword: '咖啡厅', priority: 9, matchType: 'exact', status: 'active' },
    { businessId: insertedBusinesses[2].id, keyword: '下午茶', priority: 8, matchType: 'exact', status: 'active' },
    { businessId: insertedBusinesses[2].id, keyword: '甜品', priority: 7, matchType: 'partial', status: 'active' },

    { businessId: insertedBusinesses[3].id, keyword: '书店', priority: 10, matchType: 'exact', status: 'active' },
    { businessId: insertedBusinesses[3].id, keyword: '图书', priority: 9, matchType: 'exact', status: 'active' },
    { businessId: insertedBusinesses[3].id, keyword: '阅读', priority: 8, matchType: 'exact', status: 'active' },
    { businessId: insertedBusinesses[3].id, keyword: '文化', priority: 6, matchType: 'broad', status: 'active' },
  ];

  console.log('插入关键词数据...');
  await db.insert(keywords).values(sampleKeywords);

  // 创建地理围栏
  const sampleGeoFences = [
    {
      businessId: insertedBusinesses[0].id,
      name: '朝阳区覆盖区',
      description: '覆盖朝阳区核心商圈',
      centerLatitude: 39.9042,
      centerLongitude: 116.4074,
      radius: 10,
      regionType: 'circle',
      isActive: true,
    },
    {
      businessId: insertedBusinesses[1].id,
      name: '海淀区覆盖区',
      description: '覆盖海淀区核心商圈',
      centerLatitude: 39.9842,
      centerLongitude: 116.3074,
      radius: 8,
      regionType: 'circle',
      isActive: true,
    },
    {
      businessId: insertedBusinesses[2].id,
      name: '三里屯商圈',
      description: '覆盖三里屯核心区域',
      centerLatitude: 39.9342,
      centerLongitude: 116.4574,
      radius: 5,
      regionType: 'circle',
      isActive: true,
    },
    {
      businessId: insertedBusinesses[3].id,
      name: '西单商圈',
      description: '覆盖西单核心区域',
      centerLatitude: 39.9142,
      centerLongitude: 116.3774,
      radius: 6,
      regionType: 'circle',
      isActive: true,
    },
  ];

  console.log('插入地理围栏数据...');
  await db.insert(geoFences).values(sampleGeoFences);

  console.log('种子数据完成！');
  console.log(`创建了 ${insertedBusinesses.length} 个企业`);
  console.log(`创建了 ${sampleKeywords.length} 个关键词`);
  console.log(`创建了 ${sampleGeoFences.length} 个地理围栏`);
}

seed().catch((error) => {
  console.error('种子数据失败:', error);
  process.exit(1);
});
