# 🚀 Vercel部署完整步骤（手机端）

---

## 📋 准备工作

| 项目 | 状态 |
|------|------|
| GitHub仓库 | ✅ https://github.com/yuyue8674/yuyue8674 |
| API密钥 | ✅ `24345fee-03c5-4013-b98a-28f889f157c2` |

---

## 🎯 部署步骤

### 第1步：访问Vercel

在浏览器中打开：
```
https://vercel.com
```

---

### 第2步：使用GitHub登录

**2.1 点击登录**

点击页面上的 **"Continue with GitHub"** 按钮

**2.2 授权Vercel**

- 如果是首次使用，需要授权
- 点击 **"Authorize Vercel"**

---

### 第3步：导入项目

**3.1 添加新项目**

登录后：
- 点击右上角 **"Add New..."** 按钮
- 选择 **"Project"**

**3.2 选择仓库**

在 "Import Git Repository" 页面：
- 找到 **"yuyue8674"** 仓库
- 点击右侧的 **"Import"** 按钮

---

### 第4步：配置项目（重要！）

**4.1 框架设置**

- Framework Preset: **Next.js**（自动识别）
- Root Directory: `./`（保持默认）

**4.2 配置环境变量**

找到 **"Environment Variables"** 区域：

**输入以下信息：**

```
Key:   ARK_API_KEY
Value: 24345fee-03c5-4013-b98a-28f889f157c2
```

**操作步骤：**
1. 在 Key 输入框输入：`ARK_API_KEY`
2. 在 Value 输入框输入：`24345fee-03c5-4013-b98a-28f889f157c2`
3. 确保勾选：
   - ✅ Production
   - ✅ Preview
   - ✅ Development
4. 点击 **"Add"** 按钮

---

### 第5步：开始部署

**5.1 点击部署**

点击页面底部的 **"Deploy"** 按钮

**5.2 等待部署**

- 部署时间：约 **2-3分钟**
- 可以查看实时构建日志

---

### 第6步：访问网站

**6.1 部署成功**

看到 🎉 庆祝动画，表示部署成功！

**6.2 访问网站**

点击 **"Continue to Dashboard"** 或 **"Visit"**

**6.3 网站地址**

您的网站地址类似：
```
https://yuyue8674.vercel.app
```

---

## 📱 页面操作示意

### 环境变量配置界面

```
┌─────────────────────────────────────────┐
│ Environment Variables                    │
├─────────────────────────────────────────┤
│                                         │
│ Key          Value                      │
│ [ARK_API_KEY] [24345fee-03c5...       ] │
│                                         │
│ ✅ Production  ✅ Preview  ✅ Development│
│                                         │
│ [Add]                                   │
│                                         │
└─────────────────────────────────────────┘
```

---

## ✅ 部署后检查清单

访问您的网站，测试以下功能：

- [ ] **首页加载正常**
- [ ] **企业管理功能正常**
- [ ] **AI搜索功能正常**（测试关键词搜索）
- [ ] **百科生成功能正常**
- [ ] **企业展示页面正常**

---

## 🎯 测试AI功能

部署完成后，测试AI功能：

1. 访问：`https://your-domain.vercel.app/ai-search`
2. 输入测试关键词：`济宁收银机`
3. 点击搜索
4. 查看AI是否返回推荐结果

---

## ⚠️ 常见问题

### Q1: 找不到yuyue8674仓库？

**解决**：
- 确认已用GitHub登录Vercel
- 刷新页面
- 或点击 "Adjust GitHub App Permissions"

### Q2: 部署失败？

**检查**：
- 查看Build Logs错误信息
- 确认环境变量配置正确
- 告诉我错误信息，我帮您解决

### Q3: AI功能不工作？

**检查**：
- 确认 ARK_API_KEY 环境变量已添加
- 确认API Key正确
- 查看Vercel Functions日志

---

## 📞 需要帮助？

如果在部署过程中遇到问题，请：
1. 截图错误页面
2. 告诉我错误信息
3. 我会立即帮您解决

---

## 🔗 快速链接

| 项目 | 链接 |
|------|------|
| Vercel官网 | https://vercel.com |
| 您的仓库 | https://github.com/yuyue8674/yuyue8674 |
| 豆包控制台 | https://console.volcengine.com/ark |

---

## 📋 复制这些信息

**在Vercel配置环境变量时粘贴：**

```
Key:   ARK_API_KEY
Value: 24345fee-03c5-4013-b98a-28f889f157c2
```

---

**现在开始部署！**

**访问**：https://vercel.com
