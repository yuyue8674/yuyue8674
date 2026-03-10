'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FileText,
  Copy,
  Check,
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Download,
  Building2,
} from 'lucide-react';

interface Business {
  id: number;
  name: string;
  businessType?: string;
  city?: string;
  province?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  description?: string;
}

interface BaikeContent {
  business: string;
  content: {
    wikiFormat: string;
    plainText: string;
    sections: {
      basicInfo: string;
      introduction: string;
      businessScope: string;
      serviceArea: string;
      culture: string;
      history: string;
      contact: string;
    };
  };
  submitUrl: string;
  requirements: {
    materials: string[];
    notes: string[];
  };
}

export default function BaikeGeneratorPage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusinessId, setSelectedBusinessId] = useState<string>('');
  const [baikeContent, setBaikeContent] = useState<BaikeContent | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // 加载企业列表
  useEffect(() => {
    fetch('/api/businesses')
      .then((res) => res.json())
      .then((data) => {
        setBusinesses(data);
        if (data.length > 0) {
          setSelectedBusinessId(data[0].id.toString());
        }
      })
      .catch((error) => console.error('加载企业列表失败:', error));
  }, []);

  // 生成百科词条
  const handleGenerate = async () => {
    if (!selectedBusinessId) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/baike?businessId=${selectedBusinessId}`);
      const data = await response.json();
      setBaikeContent(data);
    } catch (error) {
      console.error('生成百科词条失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 复制到剪贴板
  const handleCopy = async (text: string, key: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  };

  // 下载为文本文件
  const handleDownload = (text: string, filename: string) => {
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            百度百科词条生成器
          </h1>
          <p className="text-lg text-gray-600">
            自动生成符合百度百科规范的企业词条内容，快速提交到百度百科平台
          </p>
        </div>

        {/* 快速入口 */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-600">词条生成</div>
                  <div className="text-sm text-gray-600">自动生成</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-green-600">格式规范</div>
                  <div className="text-sm text-gray-600">符合百科标准</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <Copy className="h-8 w-8 text-purple-600" />
                <div>
                  <div className="text-2xl font-bold text-purple-600">一键复制</div>
                  <div className="text-sm text-gray-600">快速提交</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 border-orange-200 bg-orange-50">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3">
                <ExternalLink className="h-8 w-8 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-orange-600">免费提交</div>
                  <div className="text-sm text-gray-600">百度百科</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* 左侧：选择企业 */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>选择企业</CardTitle>
                <CardDescription>
                  选择要生成百科词条的企业
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Select
                  value={selectedBusinessId}
                  onValueChange={setSelectedBusinessId}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择企业" />
                  </SelectTrigger>
                  <SelectContent>
                    {businesses.map((business) => (
                      <SelectItem key={business.id} value={business.id.toString()}>
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          <span>{business.name}</span>
                          {business.businessType && (
                            <Badge variant="outline" className="ml-2">
                              {business.businessType}
                            </Badge>
                          )}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedBusinessId && (
                  <div className="p-4 bg-gray-50 rounded-lg">
                    {(() => {
                      const business = businesses.find(
                        (b) => b.id.toString() === selectedBusinessId
                      );
                      if (!business) return null;
                      return (
                        <div className="space-y-2 text-sm">
                          <div>
                            <span className="font-medium">名称：</span>
                            {business.name}
                          </div>
                          {business.businessType && (
                            <div>
                              <span className="font-medium">类型：</span>
                              {business.businessType}
                            </div>
                          )}
                          {business.city && (
                            <div>
                              <span className="font-medium">城市：</span>
                              {business.province} {business.city}
                            </div>
                          )}
                          {business.phone && (
                            <div>
                              <span className="font-medium">电话：</span>
                              {business.phone}
                            </div>
                          )}
                        </div>
                      );
                    })()}
                  </div>
                )}

                <Button
                  className="w-full"
                  onClick={handleGenerate}
                  disabled={!selectedBusinessId || loading}
                >
                  {loading ? '生成中...' : '生成百科词条'}
                </Button>
              </CardContent>
            </Card>

            {/* 提交要求 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">提交要求</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-600" />
                    所需材料
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {baikeContent?.requirements.materials.map((material, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-600">✓</span>
                        {material}
                      </li>
                    )) || (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          营业执照副本照片
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          法人身份证正反面
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          企业Logo（可选）
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-green-600">✓</span>
                          门店或办公场所照片（可选）
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    注意事项
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {baikeContent?.requirements.notes.map((note, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-blue-600">•</span>
                        {note}
                      </li>
                    )) || (
                      <>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          企业名称需与营业执照完全一致
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          词条内容需客观真实
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-600">•</span>
                          审核时间通常为3-7个工作日
                        </li>
                      </>
                    )}
                  </ul>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  asChild
                >
                  <a
                    href={baikeContent?.submitUrl || 'https://baike.baidu.com/business/'}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    访问百度百科
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* 右侧：词条内容 */}
          <div className="lg:col-span-2">
            {baikeContent ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{baikeContent.business} - 百科词条</CardTitle>
                      <CardDescription>
                        已生成符合百度百科规范的词条内容
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleDownload(
                            baikeContent.content.wikiFormat,
                            `${baikeContent.business}-百度百科词条.txt`
                          )
                        }
                      >
                        <Download className="h-4 w-4 mr-2" />
                        下载
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          handleCopy(baikeContent.content.wikiFormat, 'full')
                        }
                      >
                        {copied === 'full' ? (
                          <>
                            <Check className="h-4 w-4 mr-2" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4 mr-2" />
                            复制全部
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="wiki" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="wiki">百科格式</TabsTrigger>
                      <TabsTrigger value="plain">纯文本格式</TabsTrigger>
                      <TabsTrigger value="sections">分段内容</TabsTrigger>
                    </TabsList>

                    {/* 百科格式 */}
                    <TabsContent value="wiki">
                      <div className="relative">
                        <pre className="bg-gray-900 text-gray-100 p-6 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap font-mono">
                          {baikeContent.content.wikiFormat}
                        </pre>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            handleCopy(baikeContent.content.wikiFormat, 'wiki')
                          }
                        >
                          {copied === 'wiki' ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>

                    {/* 纯文本格式 */}
                    <TabsContent value="plain">
                      <div className="relative">
                        <pre className="bg-white border p-6 rounded-lg overflow-x-auto text-sm whitespace-pre-wrap">
                          {baikeContent.content.plainText}
                        </pre>
                        <Button
                          variant="secondary"
                          size="sm"
                          className="absolute top-2 right-2"
                          onClick={() =>
                            handleCopy(baikeContent.content.plainText, 'plain')
                          }
                        >
                          {copied === 'plain' ? (
                            <Check className="h-4 w-4" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </TabsContent>

                    {/* 分段内容 */}
                    <TabsContent value="sections">
                      <div className="space-y-4">
                        {Object.entries(baikeContent.content.sections).map(
                          ([key, value]) => {
                            if (!value) return null;
                            const titles: Record<string, string> = {
                              basicInfo: '基本信息',
                              introduction: '企业简介',
                              businessScope: '主营业务',
                              serviceArea: '服务区域',
                              culture: '企业文化',
                              history: '发展历程',
                              contact: '联系方式',
                            };
                            return (
                              <div key={key} className="border rounded-lg p-4">
                                <div className="flex items-center justify-between mb-3">
                                  <h3 className="font-semibold">
                                    {titles[key] || key}
                                  </h3>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCopy(value, key)}
                                  >
                                    {copied === key ? (
                                      <Check className="h-4 w-4 text-green-600" />
                                    ) : (
                                      <Copy className="h-4 w-4" />
                                    )}
                                  </Button>
                                </div>
                                <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                                  {value}
                                </pre>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="py-16">
                  <div className="text-center">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      选择企业后生成词条
                    </h3>
                    <p className="text-gray-600">
                      从左侧选择要生成百科词条的企业，点击"生成百科词条"按钮
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* 使用指南 */}
        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>📖 如何提交到百度百科</CardTitle>
              <CardDescription>
                按照以下步骤，将企业信息提交到百度百科
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 md:grid-cols-4">
                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">生成词条</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      选择企业，生成百科词条内容
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">准备材料</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      营业执照、法人身份证等材料
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">提交审核</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      访问百度百科企业中心提交
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-semibold">审核通过</h4>
                    <p className="text-sm text-gray-600 mt-1">
                      3-7个工作日后生效
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">
                  💡 温馨提示
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 百度百科词条免费创建，无需任何费用</li>
                  <li>• 文心一言、百度搜索会优先展示百科内容</li>
                  <li>• 词条内容需客观真实，避免广告性质描述</li>
                  <li>• 定期更新企业信息可提高搜索排名</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
