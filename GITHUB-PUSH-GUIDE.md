# 🚀 GitHub仓库创建和代码推送指南

生成时间：2026-03-10 23:45

---

## ✅ 当前状态

- ✅ Git仓库已初始化
- ✅ 代码已提交（最新提交：5efea1f）
- ✅ 在main分支
- ❌ 未配置远程仓库

---

## 📝 第1步：创建GitHub仓库（必须先完成）

### ⚠️ 这一步需要您在浏览器中手动操作

**操作步骤**：

1. **打开浏览器，访问**：https://github.com/new

2. **填写仓库信息**：
   - **Repository name**: `geo-customer-system`
   - **Description**: `GEO获客系统 - AI搜索优化平台`
   - **Visibility**: ✅ Public（公开）
   - **重要**: ❌ **不要勾选**任何初始化选项：
     - ❌ Add a README file
     - ❌ Add .gitignore
     - ❌ Choose a license

3. **点击**："Create repository"

4. **记下您的GitHub用户名**（在仓库地址中可以看到）

---

## 📝 第2步：推送代码命令

### 创建GitHub仓库后，在终端执行以下命令

**⚠️ 替换 YOUR-USERNAME 为您的GitHub用户名**

```bash
# 添加远程仓库
git remote add origin https://github.com/YOUR-USERNAME/geo-customer-system.git

# 推送代码到GitHub
git push -u origin main
```

---

## 🔐 如果需要密码认证

GitHub已不再支持密码认证，需要使用Personal Access Token：

### 获取Personal Access Token：

1. 访问：https://github.com/settings/tokens
2. 点击："Generate new token (classic)"
3. 设置：
   - Note: `GEO系统部署`
   - Expiration: `No expiration` 或选择有效期
   - Select scopes: ✅ `repo`（勾选所有repo权限）
4. 点击："Generate token"
5. **复制并保存token**（只显示一次）

### 使用Token推送：

```bash
git push -u origin main
# Username: 输入您的GitHub用户名
# Password: 粘贴Personal Access Token
```

---

## 📝 第3步：Vercel部署

### 推送成功后，在浏览器操作

1. **访问**：https://vercel.com/new

2. **登录Vercel**：
   - 推荐使用GitHub账号登录（自动关联）

3. **导入GitHub仓库**：
   - 在仓库列表找到 `geo-customer-system`
   - 点击 "Import"

4. **配置项目**：
   - Framework Preset: Next.js ✅（自动识别）
   - Root Directory: `./`

5. **配置环境变量**（重要！）：
   - 点击 "Environment Variables"
   - 添加变量：
     - Name: `ARK_API_KEY`
     - Value: `api-key-20260310232352`
     - Environments: ✅ Production, ✅ Preview, ✅ Development
   - 点击 "Add"

6. **开始部署**：
   - 点击 "Deploy"
   - 等待2-3分钟

7. **获取部署地址**：
   - 部署成功后，Vercel会提供地址
   - 例如：`https://geo-customer-system.vercel.app`

---

## ✅ 验证部署成功

### 访问以下页面：

- 首页：`https://geo-customer-system.vercel.app/`
- AI搜索：`https://geo-customer-system.vercel.app/ai-search`
- 企业目录：`https://geo-customer-system.vercel.app/show`
- 百科生成：`https://geo-customer-system.vercel.app/baike`

### 测试AI搜索：

```bash
curl -X POST https://geo-customer-system.vercel.app/api/ai-search \
  -H 'Content-Type: application/json' \
  -d '{"keyword":"济宁收银机","location":"济宁"}'
```

---

## 📊 完整命令总结

```bash
# ===== 第1步：在浏览器创建GitHub仓库 =====
# 访问：https://github.com/new
# Repository name: geo-customer-system
# Visibility: Public
# 不要勾选任何初始化选项

# ===== 第2步：推送代码（替换YOUR-USERNAME）=====
git remote add origin https://github.com/YOUR-USERNAME/geo-customer-system.git
git push -u origin main

# ===== 第3步：在浏览器Vercel部署 =====
# 访问：https://vercel.com/new
# 导入仓库 → 配置环境变量 → Deploy

# ===== 环境变量 =====
# ARK_API_KEY=api-key-20260310232352
```

---

## 🎯 现在开始

**立即执行第1步**：

👉 **在浏览器中打开**：https://github.com/new

创建仓库后，记下您的GitHub用户名，然后执行推送命令！

---

## 💡 常见问题

### Q1: 推送失败，提示"fatal: remote origin already exists"

**解决**：
```bash
git remote remove origin
git remote add origin https://github.com/YOUR-USERNAME/geo-customer-system.git
git push -u origin main
```

### Q2: 推送失败，提示"fatal: Authentication failed"

**解决**：
- 使用Personal Access Token而非密码
- 获取Token：https://github.com/settings/tokens

### Q3: Vercel看不到仓库

**解决**：
- 在Vercel导入页面点击 "Adjust GitHub App Permissions"
- 授权Vercel访问您的仓库

---

**现在开始第1步，在浏览器创建GitHub仓库！🚀**
