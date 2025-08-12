# 開発コマンド一覧

## プロジェクトセットアップ
```bash
# 依存関係のインストール
npm install

# TypeScript + React + Vite の初期設定（必要な場合）
npm create vite@latest . -- --template react-ts
```

## 開発サーバー
```bash
# 開発サーバー起動（ホットリロード有効）
npm run dev

# 特定ポートで起動
npm run dev -- --port 3000

# ネットワーク上で公開
npm run dev -- --host
```

## ビルド
```bash
# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview

# ビルドサイズの分析
npm run build -- --analyze
```

## 型チェック
```bash
# TypeScript型チェック
npx tsc --noEmit

# 型チェック（watchモード）
npx tsc --noEmit --watch
```

## リント・フォーマット
```bash
# ESLintの実行
npm run lint

# ESLintの自動修正
npm run lint:fix

# Prettierでフォーマット
npm run format

# フォーマットチェック
npm run format:check
```

## テスト（設定後）
```bash
# テスト実行
npm run test

# テスト（watchモード）
npm run test:watch

# カバレッジ付きテスト
npm run test:coverage
```

## SCSS
```bash
# SCSSの監視・コンパイル
sass --watch src/styles:src/styles

# SCSSのビルド
sass src/styles/index.scss:src/styles/index.css
```

## Git操作
```bash
# 状態確認
git status

# 変更の追加
git add .

# コミット
git commit -m "feat: コンポーネント追加"

# プッシュ
git push origin main
```

## 便利なスクリプト（package.jsonに追加推奨）
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,scss,css}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,scss,css}\"",
    "type-check": "tsc --noEmit",
    "type-check:watch": "tsc --noEmit --watch"
  }
}
```

## トラブルシューティング
```bash
# node_modulesの再インストール
rm -rf node_modules package-lock.json
npm install

# キャッシュクリア
npm cache clean --force

# Viteキャッシュクリア
rm -rf node_modules/.vite

# TypeScriptキャッシュクリア
rm -rf tsconfig.tsbuildinfo
```