# 📱 找到并配置Token权限

---

## 🎯 您当前看到的页面

页面显示：**细粒度个人访问令牌**

您有一个Token，名称是：**yuyue**

---

## 📋 操作步骤

### 第1步：点击Token

**直接点击 "yuyue" 这一行文字**，进入Token详情页面。

```
┌────────────────────────────────┐
│  细粒度个人访问令牌             │
├────────────────────────────────┤
│                                │
│  yuyue          ← 点击这里！   │
│  从未使用                       │
│  ⚠️ 此令牌没有到期日期          │
│                      [删除]    │
│                                │
└────────────────────────────────┘
```

---

### 第2步：配置权限（进入详情页后）

找到以下设置项并修改：

#### ① Repository access（仓库访问）

找到 **"Repository access"** 区域：
- 选择 **"Only select repositories"**
- 勾选 ✅ `yuyue8674`

#### ② Repository permissions（仓库权限）

找到 **"Repository permissions"** 区域：

| 权限项 | 设置为 |
|--------|--------|
| **Contents** | `Read and write` ✅ |
| **Metadata** | `Read`（自动选中） |
| **Pull requests** | `Read and write` ✅ |

---

### 第3步：保存

点击页面底部的 **"Update token"** 按钮。

---

## 🔄 更简单的方案：创建Classic Token

如果配置Fine-grained Token太复杂，建议创建Classic Token：

### 访问
```
https://github.com/settings/tokens/new
```

### 设置
- Note: `yuyue`
- Expiration: `No expiration`
- ✅ 勾选 `repo`

### 获取Token
格式：`ghp_xxxxx...`

---

## 📸 操作示意

### 步骤1：点击yuyue Token

```
当前页面：
┌─────────────────────────────────┐
│  yuyue        ← 点击这个名称    │
│  从未使用                        │
└─────────────────────────────────┘
```

### 步骤2：进入详情页后

```
Repository access
├── ○ All repositories
└── ● Only select repositories
    └── ✅ yuyue8674  ← 勾选

Repository permissions
├── Contents: Read and write  ← 改为读写
└── Pull requests: Read and write  ← 改为读写
```

---

## 💡 提示

- 点击 **"yuyue"** 这行文字即可进入配置页面
- 不需要点"删除"按钮
- 配置完成后点击"Update token"保存

---

**现在请点击 "yuyue" 进入配置页面！**
