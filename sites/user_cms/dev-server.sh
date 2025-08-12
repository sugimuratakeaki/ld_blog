#!/bin/bash

# React Mock CMS Development Server Script
# ポート3000を強制的に解放してから開発サーバーを起動

echo "🚀 React Mock CMS Development Server Launcher"
echo "============================================"

# ポート3000を使用しているプロセスを探して終了
PORT=3000
echo "🔍 Checking for processes using port $PORT..."

# macOS/Linux向けのポート使用プロセス検出
if [[ "$OSTYPE" == "darwin"* ]]; then
    # macOS
    PID=$(lsof -ti:$PORT)
else
    # Linux
    PID=$(lsof -ti:$PORT 2>/dev/null || netstat -tlnp 2>/dev/null | grep :$PORT | awk '{print $7}' | cut -d'/' -f1)
fi

if [ ! -z "$PID" ]; then
    echo "⚠️  Found process $PID using port $PORT"
    echo "🔪 Killing process $PID..."
    kill -9 $PID 2>/dev/null
    
    # 少し待機してポートが解放されるのを待つ
    sleep 2
    
    echo "✅ Port $PORT has been freed"
else
    echo "✅ Port $PORT is already free"
fi

# node_modulesの存在確認
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# 開発サーバー起動
echo ""
echo "🎯 Starting development server on port $PORT..."
echo "============================================"
echo ""

# 環境変数でポートを明示的に指定
PORT=$PORT npm run dev