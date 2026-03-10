# ✅ Vercel部署准备完成清单

准备时间：2026-03-10

---

## 📦 已准备文件

### 1. Vercel配置文件
- ✅ `vercel.json` - Vercel部署配置
  - 路由配置
  - 函数超时设置
  - 缓存策略
  
### 2. 环境变量模板
- ✅ `.env.example` - 环境变量模板
  - 必填变量说明
  - 可选变量说明
  - 获取方式指引

### 3. 部署脚本
- ✅ `scripts/prepare-vercel.sh` - 部署准备脚本
- ✅ `scripts/deploy-vercel.sh` - 快速部署脚本

### 4. 部署文档
- ✅ `VERCEL-DEPLOYMENT-GUIDE.md` - 详细部署指南
  - GitHub自动部署
  - Vercel CLI手动部署
  - 环境变量配置
  - 域名绑定
  - 常见问题

---

## 🚀 两种部署方式

### 方式一：GitHub自动部署（推荐）⭐

**优势**：
- ✅ 代码推送自动部署
- ✅ PR预览环境
- ✅ 部署历史记录

**步骤**：

```bash
# 1. 准备部署
./scripts/prepare-vercel.sh

# 2. 推送到GitHub
git remote add origin https://github.com/your-username/geo-customer-system.git
git push -u origin main

# 3. 在Vercel导入项目
# 访问：https://vercel.com/new
# 选择GitHub仓库 → 导入 → 部署

# 4. 配置环境变量
# 在Vercel控制台添加：
# - ARK_API_KEY
# - NEXT_PUBLIC_SITE_URL

# 5. 完成！
```

**预计时间**：10分钟

---

### 方式二：Vercel CLI手动部署

**优势**：
- ✅ 不需要GitHub仓库
- ✅ 本地直接部署

**步骤**：

```bash
# 1. 准备部署
./scripts/prepare-vercel.sh

# 2. 使用快速部署脚本
./scripts/deploy-vercel.sh

# 或手动执行：
# npm install -g vercel
# vercel login
# vercel --prod

# 3. 完成！
```

**预计时间**：5分钟

---

## 🔐 必填环境变量

### ARK_API_KEY（豆包API密钥）

**用途**：AI搜索功能

**获取方式**：
1. 访问：https://www.volcengine.com/
2. 注册/登录账号
3. 开通豆包大模型服务
4. 创建API密钥

**配置方式**：
- Vercel控制台：Settings → Environment Variables
- 添加：`ARK_API_KEY` = `your-api-key`

---

## 📋 部署前检查清单

### 必须完成 ✅
- [ ] 1. 编辑 `.env.local` 文件，填写 `ARK_API_KEY`
- [ ] 2. 执行 `./scripts/prepare-vercel.sh` 准备部署
- [ ] 3. 选择部署方式（GitHub 或 CLI）
- [ ] 4. 完成部署
- [ ] 5. 访问网站验证部署成功

### 推荐完成 ⭐
- [ ] 6. 绑定自定义域名
- [ ] 7. 配置百度站长平台
- [ ] 8. 提交sitemap
- [ ] 9. 地图平台标注
- [ ] 10. 创建百度百科

---

## 🌐 部署后访问地址

### 默认域名
- 格式：`https://your-project.vercel.app`
- 自动HTTPS
- 全球CDN

### 自定义域名（推荐）
- 格式：`https://geo.yourcompany.com`
- 需要购买域名
- DNS解析配置
- 自动SSL证书

---

## ✅ 部署后验证

### 1. 页面访问测试

访问以下URL确认部署成功：

- [ ] 首页：`https://your-domain.com/`
- [ ] 企业目录：`https://your-domain.com/show`
- [ ] 企业展示：`https://your-domain.com/show/5`
- [ ] 百科生成：`https://your-domain.com/baike`
- [ ] 平台指南：`https://your-domain.com/platform-guide`
- [ ] AI搜索：`https://your-domain.com/ai-search`

### 2. API接口测试

```bash
# 测试企业API
curl https://your-domain.com/api/businesses

# 测试数据导出
curl https://your-domain.com/api/export?format=json-ld

# 测试AI搜索（需要ARK_API_KEY）
curl -X POST https://your-domain.com/api/ai-search \
  -H "Content-Type: application/json" \
  -d '{"keyword":"济宁收银机","location":"济宁"}'
```

### 3. SEO验证

```bash
# 检查robots.txt
curl https://your-domain.com/robots.txt

# 检查sitemap
curl https://your-domain.com/sitemap.xml

# 检查结构化数据
curl https://your-domain.com/show/5 | grep "application/ld+json"
```

---

## 📊 部署后流量来源

### 1. 搜索引擎（SEO）
- 百度搜索收录（需要提交sitemap）
- Google搜索收录（需要提交sitemap）
- 其他搜索引擎自动收录

### 2. 地图平台
- 百度地图标注（3-5天审核）
- 高德地图标注（3-5天审核）
- 腾讯地图标注（3-5天审核）

### 3. AI搜索引擎
- 文心一言（引用百度百科）
- 通义千问（引用高德地图）
- 豆包（引用百度地图/百科）

### 4. 直接访问
- 域名直接访问
- 二维码扫码访问
- 分享链接访问

---

## 🎯 预期效果时间线

### 第1天：部署上线
- ✅ 系统公网可访问
- ✅ HTTPS证书配置
- ✅ 功能正常使用

### 第1周：搜索引擎收录
- ✅ 提交sitemap
- ✅ 等待爬虫抓取
- ✅ 开始收录页面

### 第2周：地图标注生效
- ✅ 地图平台审核通过
- ✅ 用户可在地图搜索企业
- ✅ AI搜索开始展示

### 第3-4周：百科创建
- ✅ 百度百科审核通过
- ✅ 文心一言开始引用
- ✅ 权威性提升

### 1-3个月：SEO效果显现
- ✅ 搜索排名提升
- ✅ 自然流量增长
- ✅ 客户咨询增加

### 3-6个月：稳定运营
- ✅ 每月稳定曝光
- ✅ 品牌知名度提升
- ✅ 获客效果显著

---

## 🔧 常见问题快速解决

### 问题1：部署失败
```bash
# 检查本地构建
pnpm run build

# 查看错误信息
npx tsc --noEmit

# 修复后重新部署
git add . && git commit -m "fix: 修复问题" && git push
```

### 问题2：AI搜索不工作
```bash
# 检查环境变量
vercel env ls

# 添加缺失的变量
vercel env add ARK_API_KEY

# 重新部署
vercel --prod
```

### 问题3：域名无法访问
```bash
# 检查DNS解析
nslookup your-domain.com

# 检查域名配置
vercel domains inspect your-domain.com
```

---

## 📞 获取帮助

### 文档资源
- 📖 详细部署指南：`VERCEL-DEPLOYMENT-GUIDE.md`
- 🌐 平台对接指南：访问 `/platform-guide`
- 📝 百科词条生成：访问 `/baike`

### Vercel官方资源
- 📚 Vercel文档：https://vercel.com/docs
- 💬 Vercel社区：https://github.com/vercel/vercel/discussions
- 🎫 Vercel支持：https://vercel.com/support

---

## 🎉 准备完成！

**当前状态**：
- ✅ Vercel配置文件已准备
- ✅ 环境变量模板已准备
- ✅ 部署脚本已准备
- ✅ 部署文档已完成

**下一步**：
1. 执行 `./scripts/prepare-vercel.sh`
2. 选择部署方式
3. 完成部署
4. 验证功能

**预计时间**：10-15分钟

---

**祝你部署顺利！🚀**
