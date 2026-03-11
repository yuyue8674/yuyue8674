# 📱 手机端配置Token权限（详细步骤）

---

## 🎯 目标

为您的Fine-grained Token添加写入权限，使我能推送代码。

---

## 📋 详细操作步骤

### 第1步：访问Token管理页面

在浏览器地址栏输入：
```
https://github.com/settings/personal-access-tokens
```

### 第2步：找到您的Token

页面会显示您创建的Token列表，找到名为 `geo-customer-system` 的Token。

**点击该Token进入编辑页面。**

### 第3步：配置Repository access（仓库访问权限）

找到 **"Repository access"** 区域：

- 选择 **"Only select repositories"**（仅选定的仓库）
- 在下方仓库列表中，勾选 ✅ `yuyue8674`

### 第4步：配置Permissions（权限设置）

找到 **"Permissions"** 区域，展开 **"Repository permissions"**：

设置以下权限：

| 权限名称 | 设置为 |
|---------|--------|
| **Contents** | `Read and write` ✅ |
| **Metadata** | `Read`（自动选中） |
| **Pull requests** | `Read and write` ✅ |
| **Issues** | `Read and write`（可选） |

### 第5步：保存设置

点击页面底部的 **"Update token"** 或 **"Save"** 按钮。

---

## 📸 权限设置示意

```
Repository access
├── ✅ Only select repositories
│   └── ✅ yuyue8674  ← 勾选这个仓库
│
Permissions
└── Repository permissions
    ├── Contents: Read and write  ← 设为读写
    ├── Metadata: Read
    └── Pull requests: Read and write  ← 设为读写
```

---

## ✅ 检查清单

配置完成后，确认：

- [ ] Repository access 中勾选了 `yuyue8674`
- [ ] Contents 权限设为 `Read and write`
- [ ] Pull requests 权限设为 `Read and write`
- [ ] 已点击保存按钮

---

## 📞 配置完成后

**告诉我"已配置"**，我会立即推送代码！

---

## 🔄 方案2：创建Classic Token（更简单）

如果上述步骤太复杂，可以直接创建Classic Token：

### 访问
```
https://github.com/settings/tokens/new
```

### 设置
- Note: `geo-customer-system`
- Expiration: `No expiration`
- Scopes: ✅ 勾选 `repo`

### 获取Token
Token格式：`ghp_xxxxx...`

**告诉我新Token，我立即推送！**

---

## 💡 推荐方案

| 方案 | 难度 | 推荐度 |
|------|------|--------|
| 配置Fine-grained权限 | 中等 | ⭕ |
| 创建Classic Token | 简单 | ✅ 推荐 |

---

**请按照步骤操作，完成后告诉我！**
