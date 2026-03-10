#!/bin/bash

# ========================================
# Vercel部署准备脚本
# ========================================

set -e

echo "🚀 开始准备Vercel部署..."
echo ""

# 1. 检查必要文件
echo "📋 检查必要文件..."
required_files=("package.json" "vercel.json" ".env.example" "next.config.ts")
for file in "${required_files[@]}"; do
    if [ ! -f "$file" ]; then
        echo "❌ 缺少文件: $file"
        exit 1
    fi
done
echo "✅ 所有必要文件已就绪"
echo ""

# 2. 创建.env.local（如果不存在）
echo "🔐 检查环境变量配置..."
if [ ! -f ".env.local" ]; then
    echo "📝 创建 .env.local 文件..."
    cp .env.example .env.local
    echo "⚠️  请编辑 .env.local 文件，填写真实的配置值："
    echo "   - ARK_API_KEY（豆包API密钥）"
    echo "   - NEXT_PUBLIC_SITE_URL（部署后的域名）"
    echo ""
    read -p "按回车键继续..."
else
    echo "✅ .env.local 已存在"
fi
echo ""

# 3. 检查Git状态
echo "📦 检查Git状态..."
if [ ! -d ".git" ]; then
    echo "🔧 初始化Git仓库..."
    git init
    echo "✅ Git仓库已初始化"
else
    echo "✅ Git仓库已存在"
fi
echo ""

# 4. 添加文件到Git
echo "📤 添加文件到Git..."
git add .
echo "✅ 文件已添加"
echo ""

# 5. 提交更改
echo "💾 提交更改..."
read -p "请输入提交信息 (默认: feat: 准备Vercel部署): " commit_msg
commit_msg=${commit_msg:-"feat: 准备Vercel部署"}
git commit -m "$commit_msg"
echo "✅ 更改已提交"
echo ""

# 6. 显示下一步操作
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ 部署准备完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📖 下一步操作："
echo ""
echo "方式一：GitHub自动部署（推荐）"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 创建GitHub仓库：https://github.com/new"
echo "2. 推送代码："
echo "   git remote add origin https://github.com/your-username/geo-customer-system.git"
echo "   git push -u origin main"
echo "3. 访问 Vercel：https://vercel.com/new"
echo "4. 导入GitHub仓库并部署"
echo ""
echo "方式二：Vercel CLI手动部署"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "1. 安装Vercel CLI："
echo "   npm install -g vercel"
echo "2. 登录Vercel："
echo "   vercel login"
echo "3. 部署项目："
echo "   vercel --prod"
echo ""
echo "📚 详细文档："
echo "   cat VERCEL-DEPLOYMENT-GUIDE.md"
echo ""
echo "🎉 准备就绪，开始部署吧！"
echo ""
