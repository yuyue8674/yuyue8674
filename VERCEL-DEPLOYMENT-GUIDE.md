# 🚀 Vercel公网部署指南

部署平台：Vercel（免费）  
预计时间：10-15分钟  
最后更新：2026-03-10

---

## 📋 目录

1. [部署前准备](#部署前准备)
2. [方式一：GitHub自动部署（推荐）](#方式一github自动部署推荐)
3. [方式二：Vercel CLI手动部署](#方式二vercel-cli手动部署)
4. [环境变量配置](#环境变量配置)
5. [域名绑定](#域名绑定)
6. [部署后验证](#部署后验证)
7. [常见问题](#常见问题)

---

## 🎯 部署前准备

### 1. 准备GitHub账号

- ✅ 注册GitHub账号：https://github.com/
- ✅ 创建新仓库（或使用现有仓库）

### 2. 准备Vercel账号

- ✅ 注册Vercel账号：https://vercel.com/
- ✅ 建议使用GitHub账号登录（自动关联）

### 3. 准备AI API密钥（可选）

如果需要AI搜索功能，需要准备豆包API密钥：
- 访问：https://www.volcengine.com/
- 注册并创建API密钥

---

## 🚀 方式一：GitHub自动部署（推荐）

### 优势
- ✅ 代码推送自动部署
- ✅ PR预览环境
- ✅ 部署历史记录
- ✅ 回滚方便

### 步骤1：代码推送到GitHub

```bash
# 1. 初始化Git仓库（如果还没有）
git init

# 2. 添加所有文件
git add .

# 3. 提交代码
git commit -m "feat: GEO获客系统初始化"

# 4. 添加远程仓库
git remote add origin https://github.com/your-username/geo-customer-system.git

# 5. 推送到GitHub
git push -u origin main
```

### 步骤2：在Vercel导入项目

1. **访问Vercel控制台**
   - 打开：https://vercel.com/new

2. **导入GitHub仓库**
   - 点击 "Import Git Repository"
   - 选择你的GitHub账号
   - 找到 `geo-customer-system` 仓库
   - 点击 "Import"

3. **配置项目**
   - **Project Name**: `geo-customer-system`（或自定义）
   - **Framework Preset**: Next.js（自动识别）
   - **Root Directory**: `./`
   - **Build Command**: `pnpm run build`（默认）
   - **Output Directory**: `.next`（默认）

4. **配置环境变量**（重要）
   
   点击 "Environment Variables"，添加以下变量：

   ```
   ARK_API_KEY=your-ark-api-key-here
   NEXT_PUBLIC_SITE_URL=https://geo-customer-system.vercel.app
   ```

5. **开始部署**
   - 点击 "Deploy"
   - 等待部署完成（约2-3分钟）

6. **获取部署地址**
   - 部署成功后，Vercel会提供一个地址：
   - 例如：`https://geo-customer-system.vercel.app`

### 步骤3：配置自动部署

Vercel会自动配置：
- ✅ 每次 `git push` 自动部署
- ✅ PR自动创建预览环境
- ✅ 主分支自动更新生产环境

---

## 🔧 方式二：Vercel CLI手动部署

### 优势
- ✅ 不需要GitHub仓库
- ✅ 本地直接部署
- ✅ 快速测试

### 步骤1：安装Vercel CLI

```bash
# 使用npm安装
npm install -g vercel

# 或使用pnpm安装
pnpm add -g vercel
```

### 步骤2：登录Vercel

```bash
# 登录Vercel
vercel login

# 按提示选择登录方式（推荐GitHub）
```

### 步骤3：部署项目

```bash
# 在项目根目录执行
vercel

# 第一次部署会询问：
# ? Set up and deploy "~/workspace/projects"? [Y/n] y
# ? Which scope do you want to deploy to? 选择你的账号
# ? Link to existing project? [y/N] n
# ? What's your project's name? geo-customer-system
# ? In which directory is your code located? ./
# ? Want to modify these settings? [y/N] n

# 等待部署完成
```

### 步骤4：部署到生产环境

```bash
# 部署到生产环境
vercel --prod

# 或使用简写
vercel -p
```

### 步骤5：查看部署信息

```bash
# 查看部署列表
vercel list

# 查看部署详情
vercel inspect [deployment-url]
```

---

## 🔐 环境变量配置

### 必填变量

| 变量名 | 说明 | 获取方式 |
|--------|------|---------|
| `ARK_API_KEY` | 豆包API密钥 | https://www.volcengine.com/ |

### 可选变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `NEXT_PUBLIC_SITE_URL` | 网站公网地址 | 自动生成 |
| `BAIDU_ZIYUAN_TOKEN` | 百度站长Token | 无 |

### 配置方式1：Vercel控制台（推荐）

1. 进入项目页面：https://vercel.com/dashboard
2. 选择你的项目
3. 点击 "Settings"
4. 点击 "Environment Variables"
5. 添加变量：
   - Name: `ARK_API_KEY`
   - Value: `your-api-key`
   - Environment: `Production`, `Preview`, `Development`（全选）
6. 点击 "Save"
7. **重新部署**以使变量生效

### 配置方式2：使用.env.local文件

```bash
# 1. 创建.env.local文件
cp .env.example .env.local

# 2. 编辑文件，填写真实值
vi .env.local

# 3. 添加到.gitignore（防止泄露）
echo ".env.local" >> .gitignore
```

### 配置方式3：Vercel CLI

```bash
# 添加环境变量
vercel env add ARK_API_KEY

# 按提示输入：
# ? What's the value of ARK_API_KEY? your-api-key
# ? Add ARK_API_KEY to which Environments? Production, Preview, Development
```

---

## 🌐 域名绑定

### 使用Vercel默认域名

Vercel会自动分配域名：
- 格式：`your-project.vercel.app`
- 自动HTTPS
- 全球CDN加速

### 绑定自定义域名

#### 步骤1：准备域名

- 从域名服务商购买域名（阿里云、腾讯云、GoDaddy等）
- 例如：`geo.yourcompany.com`

#### 步骤2：在Vercel添加域名

1. 进入项目页面
2. 点击 "Settings"
3. 点击 "Domains"
4. 输入域名：`geo.yourcompany.com`
5. 点击 "Add"

#### 步骤3：配置DNS解析

Vercel会提供DNS配置信息，添加到域名服务商：

**A记录**：
```
类型: A
主机记录: geo
记录值: 76.76.21.21
```

**CNAME记录**（如果使用子域名）：
```
类型: CNAME
主机记录: geo
记录值: cname.vercel-dns.com
```

#### 步骤4：等待DNS生效

- 通常需要几分钟到几小时
- Vercel会自动配置HTTPS证书
- 证书由Let's Encrypt免费提供

#### 步骤5：设置主域名

在Vercel中将自定义域名设置为默认：
1. 进入 "Domains" 设置
2. 点击域名旁的三个点
3. 选择 "Make Primary Domain"

---

## ✅ 部署后验证

### 1. 访问网站

访问你的Vercel域名：
- 默认域名：`https://your-project.vercel.app`
- 自定义域名：`https://geo.yourcompany.com`

### 2. 验证页面

访问以下页面确认部署成功：

- ✅ 首页：`/`
- ✅ 企业目录：`/show`
- ✅ 企业展示：`/show/5`
- ✅ 百科生成：`/baike`
- ✅ 平台指南：`/platform-guide`
- ✅ AI搜索：`/ai-search`
- ✅ Sitemap：`/sitemap.xml`
- ✅ Robots：`/robots.txt`

### 3. 测试API

```bash
# 测试API接口
curl https://your-project.vercel.app/api/businesses

# 测试AI搜索（需要配置ARK_API_KEY）
curl -X POST https://your-project.vercel.app/api/ai-search \
  -H "Content-Type: application/json" \
  -d '{"keyword":"济宁收银机","location":"济宁"}'

# 测试数据导出
curl https://your-project.vercel.app/api/export?format=json-ld
```

### 4. SEO检查

```bash
# 检查robots.txt
curl https://your-project.vercel.app/robots.txt

# 检查sitemap
curl https://your-project.vercel.app/sitemap.xml

# 检查结构化数据
curl https://your-project.vercel.app/show/5 | grep "application/ld+json"
```

### 5. 性能检查

使用Google PageSpeed Insights检查：
- https://pagespeed.web.dev/
- 输入你的网站地址
- 检查性能得分

---

## 📊 部署后必做事项

### 1. 提交Sitemap到搜索引擎

#### 百度搜索

1. 访问：https://ziyuan.baidu.com/
2. 添加网站：`https://your-domain.com`
3. 验证网站所有权
4. 提交sitemap：`https://your-domain.com/sitemap.xml`

#### Google搜索

1. 访问：https://search.google.com/search-console
2. 添加网站属性
3. 验证网站所有权
4. 提交sitemap：`https://your-domain.com/sitemap.xml`

### 2. 地图平台标注

详见：`/platform-guide`

- 百度地图：https://lbsyun.baidu.com/
- 高德地图：https://lbs.amap.com/
- 腾讯地图：https://lbs.qq.com/

### 3. 创建百度百科

详见：`/baike`

- 访问：https://baike.baidu.com/business/
- 使用系统生成词条内容
- 提交审核

---

## ❓ 常见问题

### 1. 部署失败：Build Error

**原因**：TypeScript类型错误或依赖问题

**解决**：
```bash
# 本地先测试构建
pnpm run build

# 检查类型错误
npx tsc --noEmit

# 修复错误后重新推送
git add .
git commit -m "fix: 修复构建错误"
git push
```

### 2. 环境变量不生效

**原因**：环境变量未正确配置或未重新部署

**解决**：
1. 在Vercel控制台确认变量已添加
2. 重新部署项目：
   - 方式1：推送新代码
   - 方式2：在Vercel控制台点击 "Redeploy"

### 3. AI搜索不工作

**原因**：ARK_API_KEY未配置或配置错误

**解决**：
1. 检查环境变量配置
2. 确认API密钥有效
3. 查看Vercel日志：
   - 进入项目页面
   - 点击 "Deployments"
   - 点击最新部署
   - 点击 "Functions" 查看日志

### 4. 域名无法访问

**原因**：DNS解析未生效或配置错误

**解决**：
1. 检查DNS解析状态：
   ```bash
   nslookup geo.yourcompany.com
   ```
2. 确认DNS记录正确
3. 等待DNS生效（最长48小时）

### 5. HTTPS证书问题

**原因**：自定义域名证书未自动配置

**解决**：
1. 在Vercel控制台检查域名状态
2. 确认DNS已正确指向Vercel
3. Vercel会自动配置Let's Encrypt证书

### 6. 数据持久化问题

**原因**：Vercel Serverless环境无状态

**解决方案**：

**方案一：使用外部数据库**（推荐）
- Supabase：https://supabase.com/
- PlanetScale：https://planetscale.com/
- MongoDB Atlas：https://www.mongodb.com/atlas

**方案二：使用Vercel KV存储**
```bash
# 安装Vercel KV
pnpm add @vercel/kv
```

**方案三：保持文件存储（限制）**
- 当前系统使用文件存储
- 在Vercel环境中，数据会重置
- 建议：每天导出数据备份

---

## 📈 监控与优化

### 1. 查看部署日志

```bash
# 使用CLI查看日志
vercel logs [deployment-url]

# 或在Vercel控制台查看
```

### 2. 性能监控

- Vercel Analytics：自动启用
- Web Vitals：自动收集
- 访问 Analytics 页面查看数据

### 3. 错误追踪

集成Sentry进行错误监控：
```bash
pnpm add @sentry/nextjs
```

---

## 🎯 下一步行动

### 立即执行（今天）

1. ✅ 选择部署方式（推荐GitHub）
2. ✅ 推送代码到GitHub
3. ✅ 在Vercel导入项目
4. ✅ 配置环境变量
5. ✅ 完成部署

### 本周执行

1. ✅ 绑定自定义域名
2. ✅ 提交sitemap到搜索引擎
3. ✅ 地图平台标注
4. ✅ 创建百度百科

### 持续优化

1. ✅ 监控网站性能
2. ✅ 优化SEO
3. ✅ 分析用户行为
4. ✅ 更新企业信息

---

## 📞 技术支持

### Vercel官方文档
- 部署文档：https://vercel.com/docs
- Next.js集成：https://vercel.com/solutions/nextjs

### 项目相关
- 平台指南：`/platform-guide`
- 百科生成：`/baike`
- 数据导出：`/api/export`

---

**文档版本**：1.0  
**更新时间**：2026-03-10  
**预计部署时间**：10-15分钟
