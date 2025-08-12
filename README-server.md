# モックサーバー起動ガイド

## 🚀 サーバー起動方法

### 1. シェルスクリプトを使用（推奨）

```bash
# サーバー開始
./start-mock-server.sh

# サーバー停止
./stop-mock-server.sh
```

### 2. npmスクリプトを使用

```bash
# サーバー開始
npm run server:start

# ポート8070でモック起動
npm run mock:8070

# サーバー停止  
npm run server:stop
```

### 3. 手動起動

```bash
# 依存関係インストール
npm install

# ポート8070で起動
PORT=8070 REACT_APP_USE_MOCK=true npm start
```

## 📋 起動スクリプトの機能

### start-mock-server.sh
- ✅ ポート8070の競合プロセス自動終了
- ✅ Node.js/npm環境チェック
- ✅ 依存関係自動インストール
- ✅ 環境変数自動設定
- ✅ 色付きログ出力

### stop-mock-server.sh  
- ✅ ポート8070のプロセス優雅な停止
- ✅ 強制終了のフォールバック
- ✅ 停止確認

## 🌐 アクセス情報

- **URL**: http://localhost:8070
- **ポート**: 8070（固定）
- **モード**: モックデータ使用
- **起動確認**: サーバー起動後、ブラウザで http://localhost:8070 にアクセス

## ✅ 起動成功の確認

サーバーが正常に起動すると以下が表示されます：
- **コンソール**: "webpack compiled with warnings" または "Compiled successfully!"
- **ブラウザ**: デモコントロール付きのまとめページ

## 🎮 デモ機能

ページ右上のコントロールパネルで以下を切り替え可能：

- **Page**: Maintenance（メンテナンス） / Not Found（404エラー）
- **Device**: Desktop（デスクトップ） / Mobile（モバイル）

## 🔧 トラブルシューティング

### ポート8070が使用中の場合
```bash
# 手動でプロセス確認
lsof -i :8070

# 手動でプロセス終了
kill -9 <PID>
```

### Node.js未インストールの場合
```bash
# Homebrewでインストール（macOS）
brew install node

# または公式サイトからダウンロード
# https://nodejs.org/
```

### 依存関係エラーの場合
```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

## 📁 関連ファイル

- `start-mock-server.sh` - サーバー起動スクリプト
- `stop-mock-server.sh` - サーバー停止スクリプト  
- `package.json` - npmスクリプト設定
- `.env.development` - 開発環境設定
- `src/App.tsx` - デモコントロール付きメインアプリ