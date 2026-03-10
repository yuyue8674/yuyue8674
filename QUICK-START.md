# ✅ GitHub自动部署 - 快速操作清单

部署时间：预计10分钟

---

## 🎯 第一步：创建GitHub仓库

访问：https://github.com/new

填写信息：
- Repository name: `geo-customer-system`
- Description: `GEO获客系统 - AI搜索优化平台`
- Visibility: ✅ Public
- 点击 "Create repository"

---

## 🚀 第二步：推送代码到GitHub

```bash
# 1. 添加远程仓库（替换your-username为你的GitHub用户名）
git remote add origin https://github.com/your-username/geo-customer-system.git

# 2. 推送代码
git push -u origin main
```

---

## 📦 第三步：在Vercel导入项目

访问：https://vercel.com/new

步骤：
1. 使用GitHub账号登录Vercel
2. 找到 `geo-customer-system` 仓库
3. 点击 "Import"

---

## ⚙️ 第四步：配置项目

Vercel会自动识别配置，直接点击 "Deploy" 即可。

### 可选：配置环境变量

如果需要AI搜索功能，添加环境变量：
- Name: `ARK_API_KEY`
- Value: `your-ark-api-key`
- Environments: 全选

---

## ✅ 第五步：获取部署地址

部署完成后，Vercel会提供访问地址：
```
https://geo-customer-system.vercel.app
```

---

## 🎊 完成！

访问你的网站，开始使用！

---

## 📚 详细文档

需要帮助？查看详细指南：
```bash
cat GITHUB-DEPLOYMENT-GUIDE.md
```

---

## 📋 部署后必做

1. ✅ 提交sitemap到百度站长平台
2. ✅ 地图平台标注（百度/高德/腾讯）
3. ✅ 创建百度百科词条
4. ✅ 绑定自定义域名（可选）

详见：部署后访问 `/platform-guide`
