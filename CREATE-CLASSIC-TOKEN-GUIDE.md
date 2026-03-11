# 🔑 创建Classic Token详细步骤

---

## ⚠️ 重要区别

| Token类型 | 格式前缀 | 权限 |
|-----------|----------|------|
| **Classic Token** | `ghp_` | ✅ 完整权限，推荐 |
| Fine-grained Token | `github_pat_` | ❌ 需要额外配置 |

**您当前创建的是 Fine-grained Token，权限不足！**

---

## 📱 创建Classic Token（手机端）

### 第1步：访问Token页面

点击浏览器地址栏，输入：
```
https://github.com/settings/tokens
```

### 第2步：选择Classic

页面会显示两种选项：

```
Personal access tokens
├── Tokens (classic)        ← 点击这个！
└── Fine-grained tokens     ← 不要点这个
```

**点击 "Tokens (classic)"**

### 第3步：创建新Token

点击 **"Generate new token"**
选择 **"Generate new token (classic)"**

### 第4步：填写信息

| 字段 | 填写内容 |
|------|----------|
| **Note** | `geo-customer-system` |
| **Expiration** | 选择 `No expiration` |
| **Select scopes** | ✅ 勾选 `repo` |

### 第5步：生成

点击绿色按钮 **"Generate token"**

### 第6步：复制Token

Classic Token格式：**`ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`**

---

## 📋 页面选择示意

```
Settings
└── Developer settings (底部)
    └── Personal access tokens
        ├── Tokens (classic)      ← 点击这里
        │   └── [Generate new token (classic)]  ← 选这个
        │
        └── Fine-grained tokens   ← 不要点
```

---

## ✅ 检查清单

创建Token时确认：

- [ ] 选择了 **"Tokens (classic)"**
- [ ] 选择了 **"Generate new token (classic)"**
- [ ] Token以 **`ghp_`** 开头（不是 `github_pat_`）
- [ ] 勾选了 **`repo`** 权限
- [ ] Expiration设为 **`No expiration`**

---

## 🔍 如何验证Token类型

**Classic Token**：
```
ghp_1234567890abcdefghijklmnopqrstuvwxyz
```
✅ 以 `ghp_` 开头

**Fine-grained Token**：
```
github_pat_11ABCDEFGHIJKLMNOPQRSTUVWXYZ...
```
❌ 以 `github_pat_` 开头

---

## 📞 创建成功后

**告诉我Classic Token**（格式：`ghp_xxxxx...`）

我会立即推送代码！

---

## 💡 如果找不到Classic选项

直接访问：
```
https://github.com/settings/tokens/new
```

确保页面URL中有 "classic" 或者生成的Token以 `ghp_` 开头。

---

**现在请创建Classic Token（ghp_开头）！**
