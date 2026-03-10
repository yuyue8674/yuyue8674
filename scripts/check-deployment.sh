#!/bin/bash

# ========================================
# 部署状态检查脚本
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 GitHub + Vercel 部署状态检查"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 第1步：检查GitHub仓库
echo "【第1步】GitHub仓库状态"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if git remote | grep -q "origin"; then
    REMOTE_URL=$(git remote get-url origin)
    echo "✅ 已配置远程仓库："
    echo "   $REMOTE_URL"
    echo ""
    echo "🌐 GitHub仓库地址："
    echo "   ${REMOTE_URL%.git}"
else
    echo "❌ 未配置远程仓库"
    echo ""
    echo "📝 操作步骤："
    echo "   1. 访问：https://github.com/new"
    echo "   2. 创建仓库：geo-customer-system"
    echo "   3. 执行：git remote add origin https://github.com/YOUR-USERNAME/geo-customer-system.git"
fi
echo ""

# 第2步：检查代码推送
echo "【第2步】代码推送状态"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if git remote | grep -q "origin"; then
    # 检查是否已推送
    LOCAL_COMMIT=$(git rev-parse HEAD)
    REMOTE_COMMIT=$(git rev-parse origin/main 2>/dev/null || echo "")
    
    if [ "$LOCAL_COMMIT" = "$REMOTE_COMMIT" ] && [ -n "$REMOTE_COMMIT" ]; then
        echo "✅ 代码已推送到GitHub"
        echo "   最新提交：${LOCAL_COMMIT:0:7}"
    else
        echo "⚠️  代码未推送或远程分支不同"
        echo ""
        echo "📝 操作步骤："
        echo "   git push -u origin main"
    fi
else
    echo "⚠️  请先完成第1步"
fi
echo ""

# 第3步：Vercel项目
echo "【第3步】Vercel项目状态"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if command -v vercel &> /dev/null; then
    echo "✅ Vercel CLI已安装"
    vercel whoami &> /dev/null && echo "✅ 已登录Vercel" || echo "⚠️  未登录Vercel"
else
    echo "⚠️  Vercel CLI未安装"
    echo ""
    echo "📝 操作步骤："
    echo "   访问：https://vercel.com/new"
    echo "   或安装CLI：npm install -g vercel"
fi
echo ""

# 第4步：环境变量
echo "【第4步】环境变量状态"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ -f ".env.local" ]; then
    echo "✅ 本地环境变量已配置"
    if grep -q "ARK_API_KEY" .env.local; then
        API_KEY=$(grep "ARK_API_KEY" .env.local | cut -d'=' -f2)
        echo "   ARK_API_KEY: ${API_KEY:0:10}..."
    fi
else
    echo "❌ 本地环境变量未配置"
fi
echo ""
echo "⚠️  Vercel环境变量需要在Vercel控制台手动配置"
echo "   访问：项目 → Settings → Environment Variables"
echo ""

# 第5步：部署状态
echo "【第5步】部署状态"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if git remote | grep -q "origin" && [ -n "$(git rev-parse origin/main 2>/dev/null)" ]; then
    echo "⚠️  请访问Vercel检查部署状态"
    echo "   https://vercel.com/dashboard"
else
    echo "⚠️  请先完成前4步"
fi
echo ""

# 总结
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📊 完成进度"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

STEPS_DONE=0
[ -f ".env.local" ] && STEPS_DONE=$((STEPS_DONE + 1))
git remote | grep -q "origin" && STEPS_DONE=$((STEPS_DONE + 1))
(git remote | grep -q "origin" && [ -n "$(git rev-parse origin/main 2>/dev/null)" ]) && STEPS_DONE=$((STEPS_DONE + 1))

echo "已完成：$STEPS_DONE / 5 步"
echo ""

case $STEPS_DONE in
    0)
        echo "📝 下一步："
        echo "   1. 访问 https://github.com/new 创建仓库"
        ;;
    1)
        echo "📝 下一步："
        echo "   1. 访问 https://github.com/new 创建仓库"
        echo "   2. 添加远程仓库：git remote add origin https://github.com/YOUR-USERNAME/geo-customer-system.git"
        ;;
    2)
        echo "📝 下一步："
        echo "   推送代码：git push -u origin main"
        ;;
    3)
        echo "📝 下一步："
        echo "   1. 访问 https://vercel.com/new 导入项目"
        echo "   2. 配置环境变量：ARK_API_KEY"
        ;;
    *)
        echo "📝 下一步："
        echo "   检查Vercel部署状态：https://vercel.com/dashboard"
        ;;
esac

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
