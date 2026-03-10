#!/bin/bash

# ========================================
# 快速部署到Vercel脚本
# ========================================

set -e

echo "🚀 开始部署到Vercel..."
echo ""

# 1. 检查Vercel CLI
echo "📋 检查Vercel CLI..."
if ! command -v vercel &> /dev/null; then
    echo "❌ 未安装Vercel CLI"
    echo "📝 正在安装..."
    npm install -g vercel
    echo "✅ Vercel CLI安装完成"
else
    echo "✅ Vercel CLI已安装"
fi
echo ""

# 2. 检查登录状态
echo "🔐 检查登录状态..."
if ! vercel whoami &> /dev/null; then
    echo "⚠️  未登录Vercel"
    echo "📝 请登录..."
    vercel login
else
    echo "✅ 已登录Vercel"
fi
echo ""

# 3. 部署项目
echo "📦 开始部署项目..."
echo ""

read -p "部署到生产环境？(Y/n): " deploy_prod
deploy_prod=${deploy_prod:-Y}

if [[ $deploy_prod =~ ^[Yy]$ ]]; then
    echo "🚀 部署到生产环境..."
    vercel --prod
else
    echo "🔍 部署到预览环境..."
    vercel
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✨ 部署完成！"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📊 查看部署信息："
echo "   vercel list"
echo ""
echo "🔍 查看部署日志："
echo "   vercel logs"
echo ""
echo "🌐 访问你的网站："
echo "   vercel open"
echo ""
