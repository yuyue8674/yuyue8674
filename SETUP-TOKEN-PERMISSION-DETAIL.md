# 📱 设置Token权限（详细步骤）

---

## 🎯 当前状态

您的Token仍然显示：
- ❌ 无权访问任何仓库
- ❌ 没有任何用户权限
- ❌ 没有任何仓库权限

---

## 📋 操作步骤

### 第1步：点击Edit按钮

页面上有多个Edit按钮，**点击右上角的灰色"Edit"按钮**：

```
┌────────────────────────────────┐
│  yuyue            [Edit] ← 点这个│
│  No description                 │
│  Created today.                 │
│  ⚠️ This token has no...        │
│                    [Delete]      │
│                [Regenerate token]│
└────────────────────────────────┘
```

**或者点击 "Access on yuyue8674" 右侧的Edit按钮**

---

### 第2步：配置仓库访问

点击Edit后，找到 **"Repository access"** 区域：

#### 选择仓库访问方式

- ✅ 选择 **"Only select repositories"**

#### 选择仓库

在下方仓库列表中，勾选 ✅ **yuyue8674**

```
Repository access
├── ○ All repositories
├── ○ Public repositories (read only)
└── ● Only select repositories  ← 选这个
    └── ✅ yuyue8674  ← 勾选这个
```

---

### 第3步：配置仓库权限

找到 **"Repository permissions"** 区域：

#### 设置权限

点击下拉菜单，设置以下权限：

| 权限名称 | 设置为 |
|---------|--------|
| **Contents** | ✅ **Read and write** |
| **Metadata** | Read（自动选中） |
| **Pull requests** | ✅ **Read and write** |

**重要**：Contents和Pull requests必须设为 **Read and write**！

```
Repository permissions
├── Contents: [Read and write ▼]  ← 选这个
├── Metadata: Read
├── Pull requests: [Read and write ▼]  ← 选这个
├── Issues: No access
└── ... (其他保持默认)
```

---

### 第4步：保存设置

滚动到页面底部，点击 **"Update token"** 按钮。

---

## 📸 完整操作流程

```
第1步：点击Edit按钮
    ↓
第2步：Repository access → Only select repositories → 勾选yuyue8674
    ↓
第3步：Repository permissions → Contents: Read and write
                            → Pull requests: Read and write
    ↓
第4步：点击Update token保存
```

---

## ⚠️ 关键点

1. **必须选择"Only select repositories"**
2. **必须勾选"yuyue8674"仓库**
3. **Contents必须是"Read and write"（不能是Read）**
4. **Pull requests必须是"Read and write"**
5. **必须点击"Update token"保存**

---

## 🔄 如果还是失败

### 最简单的方案：创建Classic Token

访问：
```
https://github.com/settings/tokens/new
```

设置：
- ✅ 只需勾选 **`repo`**
- 获取 **`ghp_xxxxx...`** 格式的Token
- 提供给我

---

**现在请点击右上角的"Edit"按钮开始配置！**
