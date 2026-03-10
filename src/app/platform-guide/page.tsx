'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Download,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Info,
  FileText,
  MapPin,
  Building2,
  Database,
  Globe,
} from 'lucide-react';

export default function PlatformGuidePage() {
  const [exportingFormat, setExportingFormat] = useState<string | null>(null);

  const handleExport = async (format: string) => {
    setExportingFormat(format);
    try {
      const response = await fetch(`/api/export?format=${format}`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `business-export-${format}.${format === 'sitemap' ? 'xml' : 'json'}`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('导出失败:', error);
    } finally {
      setExportingFormat(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            AI平台对接指南
          </h1>
          <p className="text-lg text-gray-600">
            将企业信息提交到百度、阿里云、腾讯云等AI平台，让企业在AI搜索中被精准展示
          </p>
        </div>

        {/* 快速入口 */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Globe className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">企业目录</div>
                  <div className="text-sm text-gray-600">公开展示页面</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">结构化数据</div>
                  <div className="text-sm text-gray-600">Schema.org</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Database className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">数据导出</div>
                  <div className="text-sm text-gray-600">多平台格式</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">地图标注</div>
                  <div className="text-sm text-gray-600">增加曝光</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 主要内容 */}
        <Tabs defaultValue="quick" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quick">快速开始</TabsTrigger>
            <TabsTrigger value="platforms">平台对接</TabsTrigger>
            <TabsTrigger value="export">数据导出</TabsTrigger>
            <TabsTrigger value="seo">SEO优化</TabsTrigger>
          </TabsList>

          {/* 快速开始 */}
          <TabsContent value="quick" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🚀 快速开始：让企业被AI搜索收录</CardTitle>
                <CardDescription>
                  按照以下步骤，快速将企业信息提交到各大AI平台
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 步骤1 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      完善企业信息
                    </h3>
                    <p className="text-gray-600 mb-3">
                      确保企业名称、地址、电话、描述等信息完整准确。这些信息将被AI搜索引擎抓取和展示。
                    </p>
                    <Button variant="outline" size="sm">
                      <Building2 className="h-4 w-4 mr-2" />
                      管理企业信息
                    </Button>
                  </div>
                </div>

                {/* 步骤2 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      导出企业数据
                    </h3>
                    <p className="text-gray-600 mb-3">
                      系统已自动生成符合各平台要求的数据格式，点击导出即可下载。
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleExport('json-ld')}
                        disabled={exportingFormat !== null}
                      >
                        {exportingFormat === 'json-ld' ? '导出中...' : '导出 JSON-LD'}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleExport('baidu')}
                        disabled={exportingFormat !== null}
                      >
                        {exportingFormat === 'baidu' ? '导出中...' : '导出百度格式'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* 步骤3 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      提交到各平台
                    </h3>
                    <p className="text-gray-600 mb-3">
                      将导出的数据提交到百度地图、高德地图、百度企业百科等平台。具体操作请查看"平台对接"标签页。
                    </p>
                    <Button variant="outline" size="sm">
                      查看平台对接指南
                    </Button>
                  </div>
                </div>

                {/* 步骤4 */}
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold">
                    ✓
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      等待收录生效
                    </h3>
                    <p className="text-gray-600 mb-3">
                      平台审核通过后，企业信息将在AI搜索结果中展示。通常需要3-7个工作日。
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Info className="h-4 w-4" />
                      <span>定期更新企业信息可以提高搜索排名</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 平台对接 */}
          <TabsContent value="platforms" className="space-y-6">
            {/* 百度 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      百度智能云 · 文心一言
                      <Badge className="bg-blue-500">推荐</Badge>
                    </CardTitle>
                    <CardDescription>
                      国内最大的AI搜索平台，优先展示百度地图和企业百科数据
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://cloud.baidu.com/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      访问平台
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin className="h-5 w-5 text-blue-600" />
                      <h4 className="font-semibold">百度地图标注</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      在百度地图添加企业地点，AI搜索"附近XX"时会优先展示
                    </p>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>✅ 免费提交</li>
                      <li>✅ 审核时间：3-5天</li>
                      <li>✅ 需要营业执照</li>
                    </ul>
                    <Button className="w-full mt-3" size="sm" asChild>
                      <a href="https://lbsyun.baidu.com/" target="_blank" rel="noopener noreferrer">
                        立即标注
                      </a>
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <FileText className="h-5 w-5 text-green-600" />
                      <h4 className="font-semibold">百度企业百科</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      创建企业百科词条，文心一言会引用百科内容
                    </p>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>✅ 免费创建</li>
                      <li>✅ 权威性高</li>
                      <li>✅ 长期有效</li>
                    </ul>
                    <Button className="w-full mt-3" size="sm" asChild>
                      <a href="https://baike.baidu.com/business/" target="_blank" rel="noopener noreferrer">
                        创建词条
                      </a>
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Database className="h-5 w-5 text-purple-600" />
                      <h4 className="font-semibold">企业知识库</h4>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      通过API将企业数据接入文心一言知识库
                    </p>
                    <ul className="text-sm space-y-1 text-gray-600">
                      <li>✅ 实时更新</li>
                      <li>✅ 精准匹配</li>
                      <li>⚠️ 需要API调用费用</li>
                    </ul>
                    <Button className="w-full mt-3" variant="outline" size="sm" asChild>
                      <a href="https://cloud.baidu.com/product/ai.html" target="_blank" rel="noopener noreferrer">
                        了解详情
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 高德地图 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>高德地图 · 阿里云通义千问</CardTitle>
                    <CardDescription>
                      高德地图标注的数据会被通义千问引用，适合本地服务类企业
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://lbs.amap.com/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      访问平台
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">高德地图标注</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      在高德地图添加企业地点，通义千问搜索时会优先展示
                    </p>
                    <Button className="w-full" size="sm" asChild>
                      <a href="https://lbs.amap.com/" target="_blank" rel="noopener noreferrer">
                        立即标注
                      </a>
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">阿里云企业知识库</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      通过通义千问企业版接入企业知识库
                    </p>
                    <Button className="w-full" variant="outline" size="sm" asChild>
                      <a href="https://www.aliyun.com/product/bailian" target="_blank" rel="noopener noreferrer">
                        了解详情
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 腾讯 */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle>腾讯地图 · 混元大模型</CardTitle>
                    <CardDescription>
                      腾讯地图标注和微信搜一搜的数据会被混元大模型引用
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://lbs.qq.com/" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      访问平台
                    </a>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">腾讯地图标注</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      在腾讯地图添加企业地点，微信搜一搜会优先展示
                    </p>
                    <Button className="w-full" size="sm" asChild>
                      <a href="https://lbs.qq.com/" target="_blank" rel="noopener noreferrer">
                        立即标注
                      </a>
                    </Button>
                  </div>

                  <div className="border rounded-lg p-4">
                    <h4 className="font-semibold mb-2">腾讯云混元知识库</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      通过混元大模型企业版接入知识库
                    </p>
                    <Button className="w-full" variant="outline" size="sm" asChild>
                      <a href="https://cloud.tencent.com/product/hunyuan" target="_blank" rel="noopener noreferrer">
                        了解详情
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 数据导出 */}
          <TabsContent value="export" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>📥 数据导出</CardTitle>
                <CardDescription>
                  导出符合各平台要求的数据格式，快速提交到AI平台
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {/* JSON-LD */}
                  <div className="border-2 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <FileText className="h-6 w-6 text-blue-600" />
                      <h3 className="font-semibold text-lg">JSON-LD</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Schema.org标准格式，适用于所有搜索引擎和AI平台
                    </p>
                    <ul className="text-sm space-y-1 text-gray-600 mb-4">
                      <li>✅ 通用SEO优化</li>
                      <li>✅ 结构化数据</li>
                      <li>✅ AI搜索引擎友好</li>
                    </ul>
                    <Button
                      className="w-full"
                      onClick={() => handleExport('json-ld')}
                      disabled={exportingFormat !== null}
                    >
                      {exportingFormat === 'json-ld' ? '导出中...' : '导出 JSON-LD'}
                    </Button>
                  </div>

                  {/* 百度格式 */}
                  <div className="border-2 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin className="h-6 w-6 text-red-600" />
                      <h3 className="font-semibold text-lg">百度格式</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      百度地图POI数据格式，可直接导入百度地图平台
                    </p>
                    <ul className="text-sm space-y-1 text-gray-600 mb-4">
                      <li>✅ 百度地图标注</li>
                      <li>✅ 文心一言推荐</li>
                      <li>✅ POI数据格式</li>
                    </ul>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleExport('baidu')}
                      disabled={exportingFormat !== null}
                    >
                      {exportingFormat === 'baidu' ? '导出中...' : '导出百度格式'}
                    </Button>
                  </div>

                  {/* 阿里云格式 */}
                  <div className="border-2 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="h-6 w-6 text-orange-600" />
                      <h3 className="font-semibold text-lg">阿里云格式</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      阿里云通义千问知识库格式，可直接导入企业知识库
                    </p>
                    <ul className="text-sm space-y-1 text-gray-600 mb-4">
                      <li>✅ 通义千问推荐</li>
                      <li>✅ 知识库格式</li>
                      <li>✅ 智能问答优化</li>
                    </ul>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleExport('aliyun')}
                      disabled={exportingFormat !== null}
                    >
                      {exportingFormat === 'aliyun' ? '导出中...' : '导出阿里云格式'}
                    </Button>
                  </div>

                  {/* 腾讯格式 */}
                  <div className="border-2 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="h-6 w-6 text-green-600" />
                      <h3 className="font-semibold text-lg">腾讯格式</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      腾讯云混元知识库格式，可直接导入企业知识库
                    </p>
                    <ul className="text-sm space-y-1 text-gray-600 mb-4">
                      <li>✅ 混元大模型推荐</li>
                      <li>✅ 问答对格式</li>
                      <li>✅ 微信搜索优化</li>
                    </ul>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleExport('tencent')}
                      disabled={exportingFormat !== null}
                    >
                      {exportingFormat === 'tencent' ? '导出中...' : '导出腾讯格式'}
                    </Button>
                  </div>

                  {/* 站点地图 */}
                  <div className="border-2 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="h-6 w-6 text-purple-600" />
                      <h3 className="font-semibold text-lg">XML站点地图</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      Sitemap格式，帮助搜索引擎快速收录企业页面
                    </p>
                    <ul className="text-sm space-y-1 text-gray-600 mb-4">
                      <li>✅ 搜索引擎收录</li>
                      <li>✅ 网站SEO优化</li>
                      <li>✅ 自动爬虫引导</li>
                    </ul>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleExport('sitemap')}
                      disabled={exportingFormat !== null}
                    >
                      {exportingFormat === 'sitemap' ? '导出中...' : '导出站点地图'}
                    </Button>
                  </div>

                  {/* 原始数据 */}
                  <div className="border-2 rounded-lg p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="h-6 w-6 text-gray-600" />
                      <h3 className="font-semibold text-lg">原始JSON</h3>
                    </div>
                    <p className="text-sm text-gray-600 mb-4">
                      系统原始数据格式，可用于自定义处理
                    </p>
                    <ul className="text-sm space-y-1 text-gray-600 mb-4">
                      <li>✅ 完整数据</li>
                      <li>✅ 自定义处理</li>
                      <li>✅ 数据备份</li>
                    </ul>
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleExport('json')}
                      disabled={exportingFormat !== null}
                    >
                      {exportingFormat === 'json' ? '导出中...' : '导出原始数据'}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SEO优化 */}
          <TabsContent value="seo" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>🔍 SEO优化建议</CardTitle>
                <CardDescription>
                  优化企业信息，提高在AI搜索中的排名和展示效果
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 基本信息 */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">基本信息优化</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">企业名称</div>
                        <div className="text-sm text-gray-600">
                          使用官方全称，避免简称或昵称
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">详细地址</div>
                        <div className="text-sm text-gray-600">
                          包含省市区街道，便于AI定位
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">联系电话</div>
                        <div className="text-sm text-gray-600">
                          使用座机或官方手机号
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">企业描述</div>
                        <div className="text-sm text-gray-600">
                          100-300字，包含主营业务和特色
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 关键词优化 */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">关键词优化</h3>
                  <div className="bg-blue-50 rounded-lg p-4">
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>地域+服务：</strong>例如"北京川菜餐厅"、"上海律师咨询"
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>长尾关键词：</strong>例如"附近性价比高的川菜餐厅"
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>业务特色：</strong>例如"24小时营业"、"免费停车"、"包间预订"
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* 注意事项 */}
                <div>
                  <h3 className="font-semibold text-lg mb-3">注意事项</h3>
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">信息真实性</div>
                        <div className="text-sm text-gray-600">
                          确保所有信息真实准确，虚假信息会被平台下架
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">定期更新</div>
                        <div className="text-sm text-gray-600">
                          定期更新企业信息，保持数据新鲜度
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">营业执照</div>
                        <div className="text-sm text-gray-600">
                          准备好营业执照，部分平台需要审核
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="font-medium">联系方式</div>
                        <div className="text-sm text-gray-600">
                          保持联系方式畅通，便于平台审核联系
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
