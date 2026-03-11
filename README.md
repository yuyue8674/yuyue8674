# GEO获客系统 - AI搜索优化平台

## 项目简介

基于地理位置的智能获客系统，通过关键词匹配和地理围栏技术，帮助企业在AI搜索中精准获客。

## 功能特性

- ✅ **企业管理**：录入和管理企业基本信息
- ✅ **关键词管理**：配置搜索关键词和匹配规则
- ✅ **地理围栏**：设置地理围栏，精准定位目标区域
- ✅ **AI搜索**：集成豆包大模型，实现智能搜索推荐
- ✅ **百科词条生成**：自动生成符合百度百科规范的内容
- ✅ **平台对接指南**：提供百度、高德、腾讯等平台标注详细步骤
- ✅ **企业展示页面**：SEO优化，支持搜索引擎收录

## 技术栈

- **框架**：Next.js 16 (App Router)
- **前端**：React 19 + TypeScript 5
- **UI组件**：shadcn/ui + Tailwind CSS 4
- **AI大模型**：豆包大模型 (doubao-seed-2-0-pro-260215)
- **数据存储**：文件持久化存储 (JSON)

## 快速开始

### 环境要求

- Node.js 18.x 或 20.x
- pnpm (推荐) 或 npm

### 安装依赖

```bash
pnpm install
```

### 配置环境变量

创建 `.env.local` 文件：

```bash
# 豆包大模型API密钥（必填）
ARK_API_KEY=your_api_key_here
```

### 启动开发服务器

```bash
pnpm dev
```

访问：http://localhost:5000

### 构建生产版本

```bash
pnpm build
```

### 启动生产服务器

```bash
pnpm start
```

## 项目结构

```
src/
├── app/                      # Next.js App Router 目录
│   ├── api/                 # API 路由
│   ├── ai-search/           # AI搜索页面
│   ├── baike/               # 百科词条生成
│   ├── businesses/          # 企业管理
│   ├── geo-fences/          # 地理围栏
│   ├── keywords/            # 关键词管理
│   ├── platform-guide/      # 平台对接指南
│   ├── show/                # 企业公开展示
│   └── page.tsx             # 首页
├── components/              # React 组件
│   ├── ui/                  # shadcn/ui 组件
│   └── sidebar.tsx          # 侧边栏导航
├── db/                      # 数据库配置
├── hooks/                   # React Hooks
└── lib/                     # 工具函数
```

## 部署到Vercel

### 方式1：通过Vercel网站

1. 访问：https://vercel.com
2. 使用GitHub登录
3. Import Project → 选择 `yuyue8674/yuyue8674`
4. 配置环境变量：`ARK_API_KEY`
5. 点击 Deploy

### 方式2：通过命令行

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录并部署
vercel login
vercel --prod
```

## 功能模块

### 1. 企业管理

- 添加、编辑、删除企业信息
- 支持企业名称、地址、联系方式等基本信息
- 支持企业图片上传

### 2. 关键词管理

- 配置搜索关键词
- 设置关键词匹配规则
- 支持关键词权重设置

### 3. 地理围栏

- 设置圆形地理围栏
- 支持多个围栏配置
- 可视化围栏范围

### 4. AI搜索

- 集成豆包大模型
- 流式输出搜索结果
- 基于企业数据智能推荐

### 5. 百科词条生成

- 自动生成符合百度百科规范的内容
- 支持多种词条类型
- 一键复制生成结果

### 6. 平台对接指南

- 百度地图标注
- 高德地图标注
- 腾讯地图标注
- 企业百科创建

## 数据持久化

项目使用文件存储方式，数据保存在 `data/geo-data.json` 文件中。

## 相关文档

- [创建GitHub仓库指引](./CREATE-GITHUB-REPO.md)
- [GitHub认证配置指南](./GITHUB-AUTH-GUIDE.md)
- [新电脑部署指南](./NEW-COMPUTER-DEPLOY-GUIDE.md)
- [快速部署指南](./QUICK-DEPLOY-GUIDE.md)

## 许可证

MIT License
