# 🖥️ 换电脑部署完整指南

---

## 📋 方案选择

### 方案A：GitHub克隆（推荐）✅

**前提**：先完成代码推送到GitHub

**优点**：
- ✅ 最简单，一键克隆
- ✅ 完整保留所有历史记录
- ✅ 自动同步更新

**步骤**：
```bash
# 在新电脑上
git clone https://github.com/yuyue8674/geo-customer-system.git
cd geo-customer-system
pnpm install
```

---

### 方案B：重新创建项目

在新电脑上重新初始化项目，我提供关键文件代码。

---

## 🎯 推荐流程

### 第一步：完成GitHub推送（旧电脑或当前环境）

#### 选项1：在当前环境完成推送

网络恢复后，提供Token给我，我立即完成推送。

#### 选项2：在旧电脑上完成推送

如果您有旧电脑且网络正常：

```bash
# 1. 配置Git
git config --global user.name "yuyue8674"
git config --global user.email "306602542@qq.com"

# 2. 创建GitHub仓库
# 访问：https://github.com/new
# Repository name: geo-customer-system
# Visibility: Public

# 3. 创建Token
# 访问：https://github.com/settings/tokens/new
# Scopes: ✅ repo
# 复制Token

# 4. 推送代码
git remote add origin https://github.com/yuyue8674/geo-customer-system.git
git push -u origin main
# Username: yuyue8674
# Password: [粘贴Token]
```

---

### 第二步：在新电脑上部署

#### 1. 安装必要工具

**Node.js（必需）**：
```
https://nodejs.org
```
推荐安装 LTS 版本（18.x 或 20.x）

**pnpm（必需）**：
```bash
npm install -g pnpm
```

**Git（必需）**：
```
https://git-scm.com
```

#### 2. 克隆项目

```bash
# 克隆项目
git clone https://github.com/yuyue8674/geo-customer-system.git

# 进入项目目录
cd geo-customer-system

# 安装依赖
pnpm install

# 创建环境变量文件
cp .env.example .env.local
```

#### 3. 配置环境变量

编辑 `.env.local` 文件：
```bash
# 豆包大模型API密钥（必填）
ARK_API_KEY=your_api_key_here
```

#### 4. 本地运行

```bash
pnpm dev
```

访问：http://localhost:5000

#### 5. 部署到Vercel

```bash
# 安装Vercel CLI
npm install -g vercel

# 登录Vercel
vercel login

# 部署
vercel --prod
```

---

## 📦 项目信息

### 基本信息

| 项目 | 内容 |
|------|------|
| 项目名称 | GEO获客系统 |
| GitHub仓库 | `yuyue8674/geo-customer-system` |
| 用户名 | `yuyue8674` |
| 邮箱 | `306602542@qq.com` |

### 项目结构

```
geo-customer-system/
├── src/
│   ├── app/              # 页面和API路由
│   │   ├── api/          # API接口
│   │   ├── ai-search/    # AI搜索页面
│   │   ├── baike/        # 百科词条生成
│   │   ├── businesses/   # 企业管理
│   │   ├── geo-fences/   # 地理围栏
│   │   ├── keywords/     # 关键词管理
│   │   ├── platform-guide/ # 平台对接指南
│   │   ├── show/         # 企业公开展示
│   │   └── page.tsx      # 首页
│   ├── components/       # 组件
│   ├── db/              # 数据库
│   ├── hooks/           # React Hooks
│   └── lib/             # 工具函数
├── data/                # 数据文件
├── public/              # 静态资源
├── scripts/             # 脚本
├── package.json         # 依赖配置
├── vercel.json          # Vercel配置
├── .env.example         # 环境变量示例
└── .coze                # Coze配置
```

### 关键文件

| 文件 | 说明 |
|------|------|
| `package.json` | 项目依赖配置 |
| `.env.local` | 环境变量（API密钥） |
| `vercel.json` | Vercel部署配置 |
| `data/geo-data.json` | 企业数据存储 |

---

## 🔧 环境变量配置

### 必需变量

```bash
# .env.local
ARK_API_KEY=your_doubao_api_key
```

### 获取API密钥

豆包大模型API密钥：
1. 访问：https://console.volcengine.com/ark
2. 创建API Key
3. 复制密钥到 `.env.local`

---

## 🚀 快速命令

```bash
# 克隆项目
git clone https://github.com/yuyue8674/geo-customer-system.git

# 进入目录
cd geo-customer-system

# 安装依赖
pnpm install

# 配置环境变量
cp .env.example .env.local
# 编辑 .env.local，添加 ARK_API_KEY

# 本地运行
pnpm dev

# 部署到Vercel
vercel --prod
```

---

## 📋 检查清单

### 新电脑准备

- [ ] 安装 Node.js（18.x 或 20.x）
- [ ] 安装 pnpm（`npm install -g pnpm`）
- [ ] 安装 Git
- [ ] 安装 VS Code（推荐）

### 项目设置

- [ ] 克隆项目
- [ ] 安装依赖（`pnpm install`）
- [ ] 配置环境变量（`.env.local`）
- [ ] 本地测试（`pnpm dev`）

### 部署准备

- [ ] 注册Vercel账号
- [ ] 连接GitHub仓库
- [ ] 配置环境变量
- [ ] 完成部署

---

## 💡 提示

1. **GitHub推送**：建议先完成代码推送到GitHub，然后在任何电脑上都可以克隆
2. **环境变量**：`.env.local` 文件不会提交到GitHub，需要在每台电脑上单独配置
3. **数据文件**：`data/geo-data.json` 会随代码一起推送

---

## 📞 下一步

### 如果您现在就想在新电脑上开始：

1. **先完成GitHub推送**（提供Token给我）
2. **在新电脑上克隆项目**
3. **配置环境变量**
4. **本地运行测试**
5. **部署到Vercel**

### 如果需要手动迁移：

告诉我，我会提供关键文件的完整代码，您可以在新电脑上手动创建。

---

**建议：先完成GitHub推送，然后在新电脑上克隆项目，这是最简单的方式！**
