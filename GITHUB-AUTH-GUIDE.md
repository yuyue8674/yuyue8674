# 🔐 GitHub认证配置指南

---

## ⚠️ 推送失败原因

```
fatal: could not read Username for 'https://github.com': No such device or address
```

**原因**：GitHub已不支持密码认证，需要使用 **Personal Access Token** 进行认证。

---

## 🎯 解决方案（推荐方案1）

---

## 方案1：创建Personal Access Token（推荐）

### 第1步：创建Token

1. 在浏览器打开：
   ```
   https://github.com/settings/tokens/new
   ```

2. 填写Token信息：
   - **Note**（名称）：`geo-customer-system`
   - **Expiration**（过期时间）：`No expiration`（永不过期）
   - **Select scopes**（权限）：勾选 `repo`（完整仓库权限）

3. 点击页面底部 **"Generate token"**

4. **立即复制Token**（格式：`ghp_xxxxxxxxxxxx`）
   
   ⚠️ **重要**：Token只显示一次，请立即保存！

### 第2步：提供Token

**将Token提供给我**，我会帮您配置并推送代码。

格式示例：`ghp_1234567890abcdefghijklmnopqrstuvwxyz`

---

## 方案2：使用SSH方式（需配置SSH密钥）

### 第1步：生成SSH密钥

```bash
ssh-keygen -t ed25519 -C "306602542@qq.com"
# 按3次回车使用默认设置
```

### 第2步：查看公钥

```bash
cat ~/.ssh/id_ed25519.pub
```

### 第3步：添加到GitHub

1. 复制公钥内容
2. 访问：https://github.com/settings/keys
3. 点击 **"New SSH key"**
4. Title: `geo-customer-system`
5. 粘贴公钥内容
6. 点击 **"Add SSH key"**

### 第4步：修改远程地址

```bash
git remote set-url origin git@github.com:yuyue8674/geo-customer-system.git
git push -u origin main
```

---

## 🎯 推荐方案1（最简单）

### ✅ 只需2步：

1. **创建Token**：https://github.com/settings/tokens/new
   - Note: `geo-customer-system`
   - Expiration: `No expiration`
   - Scopes: ✅ `repo`

2. **提供Token给我**（格式：`ghp_xxxxx...`）

---

## 📋 Token创建链接

**👉 点击直接创建**：
```
https://github.com/settings/tokens/new
```

---

## 💡 安全提示

- Token具有完整的仓库权限，请妥善保管
- 不要泄露给他人
- 可以随时在GitHub设置中撤销

---

**创建好Token后，直接告诉我即可！**
