#!/bin/bash

# ========================================
# 部署助手 - 分步操作指引
# ========================================

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🚀 开始部署到公网"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

echo "📋 当前状态检查："
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 检查Git状态
echo "【Git状态】"
if git remote | grep -q "origin"; then
    REMOTE=$(git remote get-url origin)
    echo "✅ 远程仓库已配置：$REMOTE"
else
    echo "⚠️  未配置远程仓库"
fi

# 检查代码状态
CHANGES=$(git status --porcelain | wc -l)
if [ "$CHANGES" -eq 0 ]; then
    echo "✅ 代码已提交，工作区干净"
else
    echo "⚠️  有 $CHANGES 个文件未提交"
fi

# 检查环境变量
if [ -f ".env.local" ] && grep -q "ARK_API_KEY" .env.local; then
    echo "✅ 环境变量已配置"
else
    echo "⚠️  环境变量未配置"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 第1步：创建GitHub仓库"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "请在浏览器中操作："
echo ""
echo "1. 打开：https://github.com/new"
echo ""
echo "2. 填写信息："
echo "   • Repository name: geo-customer-system"
echo "   • Description: GEO获客系统 - AI搜索优化平台"
echo "   • Visibility: ✅ Public"
echo "   • ❌ 不要勾选任何初始化选项"
echo ""
echo "3. 点击 'Create repository'"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 第2步：推送代码命令"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "创建GitHub仓库后，复制并执行以下命令："
echo ""
echo "# ⚠️ 替换 YOUR-USERNAME 为您的GitHub用户名"
echo ""
echo "git remote add origin https://github.com/YOUR-USERNAME/geo-customer-system.git"
echo "git push -u origin main"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 第3步：Vercel部署"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "推送代码成功后，在浏览器操作："
echo ""
echo "1. 打开：https://vercel.com/new"
echo ""
echo "2. 使用GitHub账号登录"
echo ""
echo "3. 找到 geo-customer-system 仓库"
echo ""
echo "4. 点击 'Import'"
echo ""
echo "5. 配置环境变量："
echo "   点击 'Environment Variables'"
echo "   Name: ARK_API_KEY"
echo "   Value: api-key-20260310232352"
echo "   Environments: ✅ 全选"
echo ""
echo "6. 点击 'Deploy'"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "⏱️  预计时间"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "• 创建GitHub仓库：2分钟"
echo "• 推送代码：2分钟"
echo "• Vercel部署：5分钟"
echo "• 总计：约10分钟"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "✅ 部署后验证"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "部署完成后访问："
echo ""
echo "• 首页：https://geo-customer-system.vercel.app"
echo "• AI搜索：https://geo-customer-system.vercel.app/ai-search"
echo "• 企业目录：https://geo-customer-system.vercel.app/show"
echo "• 百科生成：https://geo-customer-system.vercel.app/baike"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "🎯 现在开始第1步："
echo ""
echo "   在浏览器打开：https://github.com/new"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
