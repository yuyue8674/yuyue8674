# 🚀 GitHub自动部署完整指南

部署方式：GitHub + Vercel自动部署  
预计时间：10-15分钟  
最后更新：2026-03-10

---

## 📋 部署流程概览

```
创建GitHub仓库 → 推送代码 → Vercel导入 → 配置环境变量 → 自动部署
     ↓              ↓           ↓              ↓              ↓
   2分钟         2分钟       2分钟          2分钟         2分钟
```

---

## 第一步：创建GitHub仓库

### 方式一：在GitHub网站创建（推荐）

1. **访问GitHub**
   - 打开：https://github.com/new
   - 如未登录，先登录你的GitHub账号

2. **填写仓库信息**
   - **Repository name**: `geo-customer-system`
   - **Description**: `GEO获客系统 - AI搜索优化平台`
   - **Visibility**: ✅ Public（公开，可部署到Vercel）
   - **Initialize**: ❌ 不要勾选任何选项（已有代码）
   
3. **点击 "Create repository"**

### 方式二：使用GitHub CLI（如果已安装gh）

```bash
# 创建公开仓库
gh repo create geo-customer-system --public --description "GEO获客系统 - AI搜索优化平台"

# 或创建私有仓库
gh repo create geo-customer-system --private --description "GEO获客系统 - AI搜索优化平台"
```

---

## 第二步：推送代码到GitHub

### 方式一：使用SSH（推荐）

```bash
# 1. 添加远程仓库（替换your-username为你的GitHub用户名）
git remote add origin git@github.com:your-username/geo-customer-system.git

# 2. 推送代码到GitHub
git push -u origin main

# 如果默认分支是master
git push -u origin master
```

### 方式二：使用HTTPS

```bash
# 1. 添加远程仓库
git remote add origin https://github.com/your-username/geo-customer-system.git

# 2. 推送代码到GitHub
git push -u origin main

# 如果提示输入用户名和密码，请输入GitHub用户名和Personal Access Token
# Personal Access Token获取：https://github.com/settings/tokens
```

### 验证推送成功

访问你的仓库页面：
```
https://github.com/your-username/geo-customer-system
```

确认所有文件都已上传。

---

## 第三步：在Vercel导入项目

### 1. 访问Vercel

- 打开：https://vercel.com/new
- 如果未登录，使用GitHub账号登录（推荐）

### 2. 导入GitHub仓库

1. **查看仓库列表**
   - Vercel会自动列出你的GitHub仓库
   - 如果看不到新仓库，点击 "Adjust GitHub App Permissions"
   - 授权Vercel访问你的仓库

2. **选择仓库**
   - 找到 `geo-customer-system` 仓库
   - 点击 "Import"

### 3. 配置项目

Vercel会自动识别Next.js项目，默认配置即可：

- **Project Name**: `geo-customer-system`（可自定义）
- **Framework Preset**: Next.js ✅（自动识别）
- **Root Directory**: `./`（默认）
- **Build Command**: `pnpm run build`（自动识别）
- **Output Directory**: `.next`（自动识别）
- **Install Command**: `pnpm install`（自动识别）

### 4. 配置环境变量（重要！）

在部署前，点击 "Environment Variables" 添加必填变量：

#### 必填变量

| Name | Value | Environment |
|------|-------|-------------|
| `ARK_API_KEY` | `your-ark-api-key` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://geo-customer-system.vercel.app` | Production, Preview, Development |

**获取ARK_API_KEY**：
1. 访问：https://www.volcengine.com/
2. 注册并登录
3. 开通豆包大模型服务
4. 创建API密钥

**注意**：如果暂时没有API密钥，可以先不填，部署后再在Vercel控制台添加。

### 5. 开始部署

- 点击 "Deploy"
- 等待部署完成（约2-3分钟）

---

## 第四步：获取部署地址

### 1. 部署成功页面

部署完成后，Vercel会显示：
- 🎉 部署成功提示
- 🌐 网站访问地址

### 2. 默认域名

Vercel会自动分配域名，格式如下：
```
https://geo-customer-system.vercel.app
或
https://geo-customer-system-your-username.vercel.app
```

### 3. 访问你的网站

点击Vercel提供的链接，或直接访问：
```
https://你的项目名.vercel.app
```

---

## 第五步：验证部署成功

### 1. 页面访问测试

访问以下页面确认功能正常：

- ✅ 首页：`https://your-domain.com/`
- ✅ 企业目录：`https://your-domain.com/show`
- ✅ 企业展示：`https://your-domain.com/show/5`
- ✅ 百科生成：`https://your-domain.com/baike`
- ✅ 平台指南：`https://your-domain.com/platform-guide`
- ✅ AI搜索：`https://your-domain.com/ai-search`

### 2. API接口测试

```bash
# 测试企业API
curl https://your-domain.com/api/businesses

# 测试数据导出
curl https://your-domain.com/api/export?format=json-ld

# 测试AI搜索（需要配置ARK_API_KEY）
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
```

---

## 🎯 后续配置（可选）

### 1. 绑定自定义域名

#### 步骤1：准备域名
- 从域名服务商购买域名（阿里云、腾讯云、Cloudflare等）
- 例如：`geo.yourcompany.com`

#### 步骤2：在Vercel添加域名
1. 进入项目页面：https://vercel.com/dashboard
2. 选择你的项目
3. 点击 "Settings" → "Domains"
4. 输入域名：`geo.yourcompany.com`
5. 点击 "Add"

#### 步骤3：配置DNS解析

在域名服务商添加DNS记录：

**方式一：A记录**
```
类型: A
主机记录: geo
记录值: 76.76.21.21
TTL: 600
```

**方式二：CNAME记录**
```
类型: CNAME
主机记录: geo
记录值: cname.vercel-dns.com
TTL: 600
```

#### 步骤4：等待生效
- DNS解析通常需要几分钟到几小时
- Vercel会自动配置SSL证书
- 证书由Let's Encrypt免费提供

---

### 2. 配置自动部署

Vercel已自动配置：
- ✅ 每次 `git push` 自动部署
- ✅ Pull Request自动创建预览环境
- ✅ 主分支自动更新生产环境

### 3. 查看部署历史

1. 进入项目页面
2. 点击 "Deployments"
3. 查看所有部署记录
4. 可随时回滚到之前的版本

---

## 📊 部署后必做事项

### 立即执行（今天）

#### 1. 提交Sitemap到搜索引擎

**百度站长平台**：
1. 访问：https://ziyuan.baidu.com/
2. 添加网站：`https://your-domain.com`
3. 验证网站所有权（推荐文件验证）
4. 提交sitemap：`https://your-domain.com/sitemap.xml`

**Google Search Console**：
1. 访问：https://search.google.com/search-console
2. 添加网站属性
3. 验证网站所有权
4. 提交sitemap：`https://your-domain.com/sitemap.xml`

---

### 本周执行

#### 2. 地图平台标注

**百度地图**：
- 访问：https://lbsyun.baidu.com/
- 登录 → 地点标注 → 添加地点 → 提交审核
- 需要：营业执照、企业信息
- 审核时间：3-5天

**高德地图**：
- 访问：https://lbs.amap.com/
- 登录 → 地点管理 → 新增地点 → 提交审核
- 审核时间：3-5天

**腾讯地图**：
- 访问：https://lbs.qq.com/
- 添加地点 → 提交审核

---

#### 3. 创建百度百科

**步骤**：
1. 访问：https://baike.baidu.com/business/
2. 使用百度账号登录
3. 点击"创建企业词条"
4. 填写企业信息：
   - 使用系统生成的词条内容（访问 `/baike` 页面）
   - 复制生成的词条内容
5. 上传材料：
   - 营业执照副本照片
   - 法人身份证正反面
   - 企业Logo（可选）
6. 提交审核
7. 等待审核（3-7天）

---

## 🔧 常见问题解决

### 问题1：GitHub仓库未显示在Vercel

**原因**：Vercel未授权访问该仓库

**解决**：
1. 在Vercel导入页面点击 "Adjust GitHub App Permissions"
2. 选择 "All repositories" 或 "Only select repositories"
3. 如果选择后者，勾选 `geo-customer-system` 仓库
4. 点击 "Save"
5. 刷新页面，仓库应该会出现

---

### 问题2：推送代码到GitHub失败

**错误**：`Permission denied (publickey)`

**解决**：
```bash
# 方式一：使用HTTPS代替SSH
git remote set-url origin https://github.com/your-username/geo-customer-system.git
git push -u origin main

# 方式二：配置SSH密钥
# 生成SSH密钥
ssh-keygen -t ed25519 -C "your-email@example.com"

# 查看公钥
cat ~/.ssh/id_ed25519.pub

# 复制公钥，添加到GitHub：Settings → SSH and GPG keys → New SSH key
```

**错误**：`Authentication failed`

**解决**：
```bash
# GitHub不再支持密码认证，需要使用Personal Access Token
# 1. 访问：https://github.com/settings/tokens
# 2. 点击 "Generate new token (classic)"
# 3. 选择权限：repo（全部）
# 4. 生成token并复制
# 5. 推送时使用token代替密码
git push -u origin main
# Username: your-username
# Password: ghp_xxxxxxxxxxxxx（使用token）
```

---

### 问题3：Vercel部署失败

**错误**：`Build Error`

**解决**：
1. 在Vercel查看构建日志
2. 常见原因：
   - TypeScript类型错误
   - 依赖安装失败
   - 环境变量缺失

3. 本地测试构建：
```bash
# 本地构建测试
pnpm run build

# 检查类型错误
npx tsc --noEmit
```

4. 修复后重新推送：
```bash
git add .
git commit -m "fix: 修复构建错误"
git push
```

---

### 问题4：AI搜索不工作

**原因**：ARK_API_KEY未配置或配置错误

**解决**：
1. 在Vercel控制台检查环境变量：
   - 进入项目 → Settings → Environment Variables
   - 确认 `ARK_API_KEY` 已添加

2. 重新部署：
   - 方式1：推送新代码
   - 方式2：在Vercel控制台点击 "Redeploy"

3. 查看函数日志：
   - 进入项目 → Deployments → 最新部署 → Functions
   - 查看API路由的日志输出

---

### 问题5：环境变量不生效

**原因**：环境变量配置后未重新部署

**解决**：
```bash
# 在Vercel添加环境变量后，需要重新部署
# 方式1：推送新代码
git commit --allow-empty -m "chore: 触发重新部署"
git push

# 方式2：在Vercel控制台点击 "Redeploy"
```

---

## 📈 自动部署配置

### 推送代码自动部署

Vercel已自动配置，每次推送代码到GitHub都会自动部署：

```bash
# 修改代码后
git add .
git commit -m "feat: 添加新功能"
git push

# Vercel会自动：
# 1. 检测到新的推送
# 2. 拉取最新代码
# 3. 执行构建
# 4. 部署到生产环境
```

### PR预览环境

每次创建Pull Request，Vercel会自动创建预览环境：

```bash
# 创建新分支
git checkout -b feature/new-feature

# 修改代码
git add .
git commit -m "feat: 添加新功能"
git push -u origin feature/new-feature

# 在GitHub创建Pull Request
# Vercel会自动创建预览链接，如：
# https://geo-customer-system-abc123-username.vercel.app
```

### 分支部署

可以为不同分支配置不同的部署环境：
- `main` → 生产环境
- `develop` → 测试环境
- `feature/*` → 预览环境

在Vercel配置：
1. 进入项目 → Settings → Git
2. 配置 "Production Branch"
3. 配置 "Ignored Build Step"

---

## 🎯 预期效果时间线

### 第1天：部署成功
- ✅ 系统公网可访问
- ✅ HTTPS自动配置
- ✅ 全球CDN加速
- ✅ 所有功能正常

### 第1周：搜索引擎收录
- ✅ 提交sitemap
- ✅ 百度、Google开始爬取
- ✅ 页面开始收录

### 第2周：地图标注生效
- ✅ 百度地图审核通过
- ✅ 高德地图审核通过
- ✅ AI搜索"附近XX"开始展示

### 第3-4周：百度百科上线
- ✅ 百科词条审核通过
- ✅ 文心一言开始引用
- ✅ 企业权威性提升

### 1-3个月：SEO效果显现
- ✅ 搜索排名提升
- ✅ 自然流量增长
- ✅ 客户咨询增加

### 3-6个月：稳定运营
- ✅ 每月稳定曝光
- ✅ 品牌知名度提升
- ✅ 获客效果显著

---

## 📊 监控与分析

### Vercel Analytics

Vercel自动提供分析数据：
1. 进入项目 → Analytics
2. 查看：
   - 页面访问量
   - 访客地域分布
   - 访问设备类型
   - 性能指标

### Web Vitals

自动收集Web性能指标：
- LCP（最大内容绘制）
- FID（首次输入延迟）
- CLS（累积布局偏移）

### 日志查看

查看实时日志：
1. 进入项目 → Deployments
2. 点击最新部署
3. 点击 "Functions"
4. 查看API路由日志

---

## 📞 获取帮助

### Vercel官方资源
- 📚 Vercel文档：https://vercel.com/docs
- 💬 Vercel社区：https://github.com/vercel/vercel/discussions
- 🎫 Vercel支持：https://vercel.com/support

### GitHub官方资源
- 📚 GitHub文档：https://docs.github.com/
- 💬 GitHub社区：https://github.community/

### 项目相关
- 📖 平台对接指南：部署后访问 `/platform-guide`
- 📝 百科词条生成：部署后访问 `/baike`
- 📋 详细部署清单：`VERCEL-CHECKLIST.md`

---

## ✅ 快速命令清单

### Git命令
```bash
# 查看状态
git status

# 添加远程仓库
git remote add origin git@github.com:your-username/geo-customer-system.git

# 推送代码
git push -u origin main

# 查看远程仓库
git remote -v
```

### Vercel命令
```bash
# 安装Vercel CLI
npm install -g vercel

# 登录Vercel
vercel login

# 查看项目列表
vercel list

# 查看部署日志
vercel logs

# 打开项目
vercel open
```

---

## 🎉 开始部署

### 完整命令序列

```bash
# 1. 添加远程仓库（替换your-username）
git remote add origin git@github.com:your-username/geo-customer-system.git

# 2. 推送代码
git push -u origin main

# 3. 访问Vercel导入项目
# https://vercel.com/new

# 4. 配置环境变量
# ARK_API_KEY=your-api-key

# 5. 完成部署！

# 6. 访问你的网站
# https://geo-customer-system.vercel.app
```

---

**祝你部署顺利！🚀**

如有问题，请查看"常见问题解决"章节或查阅官方文档。
