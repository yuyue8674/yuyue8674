import { MetadataRoute } from 'next';
import { fileStore } from '@/lib/file-store';

// 动态生成sitemap.xml
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.jining-shouyinji.cn';
  
  // 获取所有企业
  const businesses = await fileStore.getBusinesses();
  
  // 静态页面
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/businesses`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/keywords`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/baike`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/platform-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];
  
  // 企业详情页面
  const businessPages: MetadataRoute.Sitemap = businesses
    .filter((b) => b.isActive)
    .map((business) => ({
      url: `${baseUrl}/show/${business.id}`,
      lastModified: new Date(business.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));
  
  return [...staticPages, ...businessPages];
}
