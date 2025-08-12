# React Mock CMS

Flask/Jinja2ベースのブログCMSをReactで再実装したモックアプリケーション。

## 🚀 概要

このプロジェクトは、既存のPython Flaskアプリケーションを、モダンなReact + TypeScript技術スタックで完全に再実装したものです。アトミックデザインパターンに従い、再利用可能なコンポーネントとして構築されています。

## ✨ 特徴

- **完全な型安全性**: TypeScriptによる厳格な型定義
- **アトミックデザイン**: 再利用可能なコンポーネント階層
- **レスポンシブデザイン**: モバイル、タブレット、デスクトップ対応
- **デザインシステム**: 一貫性のあるデザイントークン
- **パフォーマンス最適化**: React.memo、useMemo、useCallbackの活用
- **アクセシビリティ**: WCAG準拠を目指した実装

## 📦 技術スタック

- **Framework**: React 18.x
- **Language**: TypeScript 5.x
- **Build Tool**: Vite 5.x
- **Styling**: SCSS + CSS Modules
- **Routing**: React Router v6
- **State Management**: Context API
- **Linting**: ESLint
- **Formatting**: Prettier

## 🗂️ プロジェクト構造

```
react_mock/
├── src/
│   ├── assets/         # 画像、アイコン
│   ├── components/     # UIコンポーネント
│   │   ├── atoms/      # 最小単位のコンポーネント
│   │   ├── molecules/  # 複合コンポーネント
│   │   ├── organisms/  # 複雑な機能単位
│   │   └── templates/  # ページレイアウト
│   ├── pages/          # ページコンポーネント
│   ├── data/           # モックデータ
│   ├── styles/         # グローバルスタイル
│   ├── types/          # TypeScript型定義
│   ├── utils/          # ユーティリティ関数
│   ├── App.tsx         # アプリケーションルート
│   └── main.tsx        # エントリーポイント
├── public/             # 静的ファイル
├── docs/               # ドキュメント
└── package.json        # プロジェクト設定
```

## 🔧 セットアップ

### 前提条件

- Node.js 18.x 以上
- npm 9.x 以上

### インストール

```bash
# リポジトリのクローン
git clone [repository-url]
cd Sites/react_mock

# 依存関係のインストール
npm install
```

## 🏃 開発

```bash
# 開発サーバーの起動
npm run dev

# TypeScript型チェック
npm run type-check

# リント
npm run lint

# フォーマット
npm run format
```

開発サーバーは http://localhost:3000 で起動します。

## 🏗️ ビルド

```bash
# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview
```

## 📱 ページ一覧

| ページ | パス | 説明 |
|--------|------|------|
| ダッシュボード | `/` | 統計情報とアクティビティ表示 |
| 記事一覧 | `/articles` | 記事の管理と検索 |
| 記事作成 | `/articles/new` | 新規記事の作成 |
| 記事編集 | `/articles/edit/:id` | 既存記事の編集 |
| 画像管理 | `/images` | 画像のアップロードと管理 |

## 🎨 デザインシステム

### デザイントークン

- **Colors**: ブランドカラー、セマンティックカラー、ニュートラルカラー
- **Typography**: フォントサイズ、ウェイト、行間
- **Spacing**: 8pxグリッドシステム
- **Effects**: 角丸、影、トランジション

### コンポーネント

#### Atoms
- Button, Badge, Input, Select, Textarea, Checkbox

#### Molecules
- Card, Table, Modal, Alert, Dropdown

#### Organisms
- Header, Sidebar

#### Templates
- Layout

## 🧪 テスト

```bash
# テストの実行
npm run test

# カバレッジ付きテスト
npm run test:coverage
```

## 📚 ドキュメント

詳細なドキュメントは`docs/`ディレクトリを参照してください：

- [要件定義書](docs/01_requirements.md)
- [コンポーネント仕様書](docs/02_component_specifications.md)
- [リファクタリング計画書](docs/03_refactoring_plan.md)
- [実装ガイド](docs/04_implementation_guide.md)
- [コンポーネント開発ガイドライン](docs/05_component_development_guide.md)
- [スタイルガイド](docs/06_style_guide.md)

## 🤝 コントリビューション

1. フォークする
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'feat: add amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- 元のFlask CMSプロジェクトの開発者
- Reactコミュニティ
- 使用しているオープンソースライブラリの作者

---

🚀 **プロジェクトステータス**: アクティブ開発中

📊 **コード品質**: B+ (継続的改善中)

🎯 **次のマイルストーン**: パフォーマンス最適化とテスト実装