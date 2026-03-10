import { pgTable, serial, varchar, text, timestamp, integer, doublePrecision, boolean, jsonb } from 'drizzle-orm/pg-core';

// 企业信息表
export const businesses = pgTable('businesses', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  businessType: varchar('business_type', { length: 100 }),
  phone: varchar('phone', { length: 50 }),
  email: varchar('email', { length: 255 }),
  website: varchar('website', { length: 500 }),
  address: varchar('address', { length: 500 }),
  city: varchar('city', { length: 100 }),
  province: varchar('province', { length: 100 }),
  latitude: doublePrecision('latitude'),
  longitude: doublePrecision('longitude'),
  logo: varchar('logo', { length: 500 }),
  images: jsonb('images').$type<string[]>(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 关键词表
export const keywords = pgTable('keywords', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  keyword: varchar('keyword', { length: 100 }).notNull(),
  priority: integer('priority').default(0).notNull(), // 优先级，数字越大优先级越高
  matchType: varchar('match_type', { length: 20 }).default('exact').notNull(), // exact, partial, broad
  status: varchar('status', { length: 20 }).default('active').notNull(), // active, paused, inactive
  clickCount: integer('click_count').default(0).notNull(),
  searchCount: integer('search_count').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 地理围栏表
export const geoFences = pgTable('geo_fences', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  centerLatitude: doublePrecision('center_latitude').notNull(),
  centerLongitude: doublePrecision('center_longitude').notNull(),
  radius: doublePrecision('radius').notNull(), // 半径，单位：公里
  regionType: varchar('region_type', { length: 50 }).default('circle').notNull(), // circle, polygon
  polygonCoordinates: jsonb('polygon_coordinates').$type<Array<{ lat: number; lng: number }>>(),
  isActive: boolean('is_active').default(true).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// 搜索记录表
export const searchLogs = pgTable('search_logs', {
  id: serial('id').primaryKey(),
  keyword: varchar('keyword', { length: 255 }).notNull(),
  businessId: integer('business_id').references(() => businesses.id, { onDelete: 'set null' }),
  userLatitude: doublePrecision('user_latitude'),
  userLongitude: doublePrecision('user_longitude'),
  userCity: varchar('user_city', { length: 100 }),
  userProvince: varchar('user_province', { length: 100 }),
  deviceType: varchar('device_type', { length: 50 }), // mobile, desktop, tablet
  isClicked: boolean('is_clicked').default(false).notNull(),
  clickPosition: integer('click_position'), // 用户点击的搜索结果位置
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 获客统计表
export const customerStats = pgTable('customer_stats', {
  id: serial('id').primaryKey(),
  businessId: integer('business_id').notNull().references(() => businesses.id, { onDelete: 'cascade' }),
  date: timestamp('date').notNull(),
  impressions: integer('impressions').default(0).notNull(), // 曝光次数
  clicks: integer('clicks').default(0).notNull(), // 点击次数
  conversions: integer('conversions').default(0).notNull(), // 转化次数
  clickRate: doublePrecision('click_rate').default(0).notNull(), // 点击率
  conversionRate: doublePrecision('conversion_rate').default(0).notNull(), // 转化率
  avgPosition: doublePrecision('avg_position'), // 平均排名位置
  createdAt: timestamp('created_at').defaultNow().notNull(),
});

// 类型导出
export type Business = typeof businesses.$inferSelect;
export type NewBusiness = typeof businesses.$inferInsert;
export type Keyword = typeof keywords.$inferSelect;
export type NewKeyword = typeof keywords.$inferInsert;
export type GeoFence = typeof geoFences.$inferSelect;
export type NewGeoFence = typeof geoFences.$inferInsert;
export type SearchLog = typeof searchLogs.$inferSelect;
export type NewSearchLog = typeof searchLogs.$inferInsert;
export type CustomerStat = typeof customerStats.$inferSelect;
export type NewCustomerStat = typeof customerStats.$inferInsert;
