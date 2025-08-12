#!/bin/bash

# シンプル版: ポート3000のプロセスを強制終了して開発サーバー起動

echo "🔪 Killing process on port 3000..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true

echo "⏳ Waiting for port to be freed..."
sleep 2

echo "🚀 Starting development server..."
cd /Users/sugimura/Local\ Sites/ldblog/Sites/react_mock
npm run dev