# 🔧 Fine-grained Token 权限配置

---

## 📌 您当前的Token

Token类型：**Fine-grained Token**
前缀：`github_pat_`

这种Token需要额外配置仓库权限才能使用。

---

## 🎯 配置Fine-grained Token权限

### 第1步：访问Token设置

```
https://github.com/settings/personal-access-tokens/new
```

### 第2步：配置Token信息

| 字段 | 填写内容 |
|------|----------|
| **Token name** | `geo-customer-system` |
| **Expiration** | `No expiration` |

### 第3步：配置Repository access

**重要**：选择 **"Only select repositories"**

然后选择：✅ `yuyue8674` 仓库

### 第4步：配置Permissions（关键！）

#### Repository permissions（仓库权限）

展开 **"Repository permissions"**，设置以下权限：

| 权限项 | 设置值 |
|--------|--------|
| **Contents** | `Read and write` ✅ |
| **Metadata** | `Read` ✅（自动选中） |
| **Pull requests** | `Read and write` ✅ |

**或者全部设为 `Read and write`**

### 第5步：创建Token

点击底部 **"Generate token"**

---

## 📋 权限配置检查清单

**Repository access**：
- [ ] ✅ 选择了 `yuyue8674` 仓库

**Repository permissions**：
- [ ] Contents: `Read and write`
- [ ] Metadata: `Read`
- [ ] Pull requests: `Read and write`

---

## 🔄 如果仍然失败

### 最简单方案：创建Classic Token

直接访问：
```
https://github.com/settings/tokens/new
```

**关键**：确保页面标题是 **"Create Personal Access Token (Classic)"**

然后：
- Note: `geo-customer-system`
- Expiration: `No expiration`
- Scopes: ✅ `repo`
- 生成Token（`ghp_xxxxx...`）

---

## 📞 配置完成后

**重新提供Token**，我会立即推送代码！

---

## 💡 两种方案对比

| 方案 | 难度 | 推荐 |
|------|------|------|
| 配置Fine-grained权限 | 中等 | ⭕ |
| 创建Classic Token | 简单 | ✅ 推荐 |

---

**建议：直接创建Classic Token（ghp_开头），最简单！**
