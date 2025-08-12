# Front Matome - React Components

ライブドアブログ まとめページのReactコンポーネント集です。Figmaデザインに基づいてAtomic Design原則に従って作成されています。

## 🏗️ アーキテクチャ

### Atomic Design Structure

```
src/components/
├── atoms/           # 最小単位のコンポーネント
│   ├── Button/      # ボタンコンポーネント
│   ├── Text/        # テキストコンポーネント
│   ├── Logo/        # ロゴコンポーネント
│   └── Image/       # 画像コンポーネント
├── molecules/       # 複数のatomsを組み合わせ
│   ├── HeaderApp/   # アプリヘッダー
│   ├── HeaderBlog/  # ブログヘッダー
│   ├── HeaderDesktop/ # デスクトップヘッダー
│   ├── AppPromotion/  # アプリプロモーション
│   └── FooterLinks/   # フッターリンク
├── organisms/       # 複雑なUIセクション
│   ├── Header/      # ヘッダー全体
│   └── Footer/      # フッター全体
├── templates/       # ページレイアウト
│   └── MainLayout/  # メインレイアウト
└── pages/          # 実際のページ
    ├── MaintenancePage/ # メンテナンスページ
    └── NotFoundPage/    # 404ページ
```

## 🎨 デザインシステム

### 色彩
- Primary: `#27272A` (text-zinc-800)
- Secondary: `#A1A1AA` (text-zinc-400)
- Blue: `#3B82F6` (blue-500), `#2563EB` (blue-600)
- Background: `#F3F3F3`, `#FFFFFF`, `#FAFAFA`

### フォント
- **Hiragino Sans** (メインフォント)
- W3 (300) - 通常テキスト
- W6 (600) - 太字テキスト

### テキストサイズ
- `text-xs`: 12px/16px
- `text-sm`: 14px/20px  
- `text-base`: 16px/24px
- `text-lg`: 18px/28px
- `text-xl`: 20px/28px
- `text-3xl`: 30px/36px

## 🚀 使用方法

### インストール

```bash
cd sites/front_matome
npm install
```

### 開発サーバー起動

```bash
# モックデータを使用
npm run dev:mock

# または通常の開発モード
npm start
```

### ビルド

```bash
npm run build
```

## 📱 レスポンシブ対応

すべてのコンポーネントはPC・モバイル両対応です：

```tsx
// デスクトップ版
<MaintenancePage isMobile={false} />

// モバイル版
<MaintenancePage isMobile={true} />
```

## 🎯 実装済みページ

### 1. メンテナンスページ
- **PC**: 1280px幅のセンタリングレイアウト
- **SP**: 375px幅のモバイルレイアウト
- Figma: `2747-16557` (PC), `2738-5546` (SP)

### 2. 404ページ  
- **PC/SP**: レスポンシブ対応
- シンプルなエラーメッセージ表示

## 🖼️ アセット管理

Figmaから取得した画像は `localhost:3845` で配信されます：

```tsx
const APP_ICON = "http://localhost:3845/assets/ab6010e71c8910e6df77545db3008b1f090023f0.png";
```

## 🔧 設定

### 環境変数

```bash
# .env.development
REACT_APP_USE_MOCK=true
REACT_APP_API_URL=http://localhost:8000/api

# .env.production  
REACT_APP_USE_MOCK=false
REACT_APP_API_URL=https://api.example.com
```

## 📦 Python移植対応

将来のPython（FastAPI/Django）移植を考慮した設計：

1. **API層の抽象化**: `services/` フォルダでAPI呼び出しを分離
2. **型定義の共通化**: `types/` フォルダでデータモデルを定義
3. **モックデータ**: MSW等でのモックサーバー対応
4. **環境変数**: 開発/本番環境の切り替え

## 🎮 デモ機能

アプリには右上にコントロールパネルがあり、以下を切り替えできます：

- **Page**: Maintenance / Not Found
- **Device**: Desktop / Mobile

## 📚 使用技術

- **React 18** + TypeScript
- **Tailwind CSS** (CDN版)
- **Atomic Design** パターン
- **Figma Design System** 準拠

## 🤝 開発ガイドライン

1. **新コンポーネント作成時**:
   - Atomic Design原則に従う
   - TypeScript型定義を必ず作成
   - PC/モバイル両対応を考慮

2. **スタイリング**:
   - Tailwind CSSクラスを使用
   - Figmaデザインの正確な値を使用
   - カスタムCSSは最小限に

3. **命名規則**:
   - コンポーネント: PascalCase
   - ファイル: PascalCase
   - Props: camelCase

This project provides a solid foundation for building the livedoor blog summary pages with modern React practices and atomic design principles.