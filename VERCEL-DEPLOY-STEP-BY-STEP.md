# 🚀 Vercel部署配置指南

---

## ✅ 已完成准备

- ✅ API密钥已配置：`24345fee-03c5-4013-b98a-28f889f157c2`
- ✅ 代码已推送到GitHub：`https://github.com/yuyue8674/yuyue8674`

---

## 🎯 部署步骤

### 第1步：访问Vercel

在浏览器中打开：
```
https://vercel.com
```

---

### 第2步：使用GitHub登录

**2.1 点击登录方式**

点击 **"Continue with GitHub"**

**2.2 授权Vercel**

- 如果是首次使用，需要授权Vercel访问您的GitHub
- 点击 **"Authorize Vercel"**

---

### 第3步：导入项目

**3.1 点击添加项目**

登录后，点击右上角的 **"Add New..."** → **"Project"**

**3.2 选择仓库**

在 "Import Git Repository" 页面：

- 找到 **"yuyue8674"** 仓库
- 点击 **"Import"** 按钮

---

### 第4步：配置项目

**4.1 框架预设**

Vercel会自动识别为 **Next.js** 框架，无需修改。

**4.2 根目录**

保持默认：`./`

---

### 第5步：配置环境变量（关键！）

**5.1 展开环境变量区域**

找到 **"Environment Variables"** 区域，点击展开

**5.2 添加环境变量**

输入以下信息：

| 字段 | 值 |
|------|-----|
| **Key** | `ARK_API_KEY` |
| **Value** | `24345fee-03c5-4013-b98a-28f889f157c2` |

**5.3 选择环境**

勾选以下环境：
- ✅ Production
- ✅ Preview
- ✅ Development

**5.4 添加**

点击 **"Add"** 按钮

---

### 第6步：开始部署

**6.1 点击部署**

点击页面底部的 **"Deploy"** 按钮

**6.2 等待部署**

部署过程约需 **2-3分钟**，请耐心等待

---

### 第7步：访问网站

**7.1 部署成功**

看到 🎉 庆祝动画后，表示部署成功

**7.2 访问网站**

点击 **"Continue to Dashboard"** 或 **"Visit"** 查看网站

**7.3 网站地址**

格式类似：
```
https://yuyue8674.vercel.app
```

---

## 📱 手机端操作示意

### 页面流程

```
1. 访问 vercel.com
    ↓
2. Continue with GitHub
    ↓
3. Add New... → Project
    ↓
4. 选择 yuyue8674 仓库 → Import
    ↓
5. Environment Variables
   - Key: ARK_API_KEY
   - Value: 24345fee-03c5-4013-b98a-28f889f157c2
   - Add
    ↓
6. Deploy
    ↓
7. 等待2-3分钟
    ↓
8. 访问网站
```

---

## 📋 环境变量配置

### 必需配置

| Key | Value | 说明 |
|-----|-------|------|
| `ARK_API_KEY` | `24345fee-03c5-4013-b98a-28f889f157c2` | 豆包API密钥（AI功能必需） |

### 可选配置

| Key | Value | 说明 |
|-----|-------|------|
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | 网站URL |
| `BAIDU_ZIYUAN_TOKEN` | - | 百度站长Token |
| `GOOGLE_SITE_VERIFICATION` | - | Google验证码 |

---

## ✅ 部署后检查清单

### 功能测试

访问部署后的网站，测试以下功能：

- [ ] **首页**：能否正常显示
- [ ] **企业管理**：能否添加/编辑企业
- [ ] **关键词管理**：能否添加关键词
- [ ] **AI搜索**：能否正常使用AI搜索
- [ ] **百科生成**：能否生成百科词条
- [ ] **企业展示**：能否查看企业详情

---

## 🎯 部署后下一步

### 1. 测试AI功能

访问 `/ai-search` 页面，测试AI搜索是否正常工作

### 2. 添加企业数据

在企业管理中添加您的企业信息

### 3. 配置关键词

为您的企业配置搜索关键词

### 4. 提交搜索引擎收录

提交sitemap到百度、Google等搜索引擎

---

## ⚠️ 常见问题

### Q1: 部署失败怎么办？

**检查**：
- 确认选择了正确的仓库
- 查看Build Logs错误信息
- 确认环境变量配置正确

### Q2: AI功能不工作？

**检查**：
- 确认 `ARK_API_KEY` 环境变量已配置
- 确认API Key有效
- 查看Vercel函数日志

### Q3: 页面404？

**检查**：
- 确认框架选择为Next.js
- 查看Build Logs
- 重新部署

### Q4: 如何修改环境变量？

**步骤**：
1. 进入项目Dashboard
2. 点击 **Settings**
3. 点击 **Environment Variables**
4. 编辑或添加变量
5. 重新部署

---

## 📞 需要帮助？

部署过程中遇到问题，请告诉我具体的错误信息，我会帮您解决！

---

## 🔗 重要链接

| 项目 | 链接 |
|------|------|
| Vercel | https://vercel.com |
| GitHub仓库 | https://github.com/yuyue8674/yuyue8674 |
| 豆包控制台 | https://console.volcengine.com/ark |

---

**现在请访问 Vercel 开始部署！**
```
https://vercel.com
```

**您的API密钥已准备好**：
```
ARK_API_KEY = 24345fee-03c5-4013-b98a-28f889f157c2
```
