# 📱 添加仓库权限（当前页面操作）

---

## ✅ 已完成

- ✅ 选择了 "Only select repositories"
- ✅ 已选择仓库：yuyue8674/yuyue8674

---

## 🎯 下一步：添加仓库权限

### 第1步：点击 "+ Add permissions" 按钮

找到 **"Permissions"** 区域，点击右侧的 **"+ Add permissions"** 按钮：

```
Permissions
├── Repositories 0
├── Account 0
└── [+ Add permissions]  ← 点击这个按钮
```

---

### 第2步：添加Contents权限

点击后会显示权限列表，找到并添加：

#### Contents权限

1. 找到 **"Contents"**
2. 点击下拉菜单
3. 选择 **"Read and write"**

```
Repository permissions
├── Contents: [Read and write ▼]  ← 选择这个
│   ├── No access
│   ├── Read-only
│   └── Read and write  ← 选这个
```

---

### 第3步：添加Pull requests权限

同样方式，找到并添加：

#### Pull requests权限

1. 找到 **"Pull requests"**
2. 点击下拉菜单
3. 选择 **"Read and write"**

---

### 第4步：保存设置

点击右上角的 **"Update"** 按钮（绿色按钮）：

```
[Update]  [Cancel]
   ↑
 点击保存
```

---

## 📋 操作示意

```
步骤1：点击 [+ Add permissions]
    ↓
步骤2：找到 Contents → 选择 Read and write
    ↓
步骤3：找到 Pull requests → 选择 Read and write
    ↓
步骤4：点击 [Update] 保存
```

---

## ✅ 最终确认

保存后，页面应显示：

```
Permissions
├── Repositories 2
│   ├── Contents: Read and write
│   └── Pull requests: Read and write
└── Account 0
```

---

## 💡 提示

- Contents必须设为 **Read and write**（不能是Read-only）
- Pull requests必须设为 **Read and write**
- 设置完成后点击 **Update** 按钮

---

**现在请点击 "+ Add permissions" 按钮添加权限！**
