# React Mock CMS - ドキュメント

## 概要
このディレクトリには、Flask/Jinja2ベースのブログCMSをReactベースのモックアプリケーションにリファクタリングするための設計ドキュメントが含まれています。

## ドキュメント構成

### 📋 [01_requirements.md](./01_requirements.md)
**要件定義書**
- プロジェクトの背景と目的
- 機能要件と非機能要件
- 制約事項とリスク管理
- 成果物の定義

### 🧩 [02_component_specifications.md](./02_component_specifications.md)
**コンポーネント仕様書**
- コンポーネント体系とレイヤー構造
- 各コンポーネントの詳細仕様
- Props定義とSCSSマッピング
- 状態管理方針

### 🔄 [03_refactoring_plan.md](./03_refactoring_plan.md)
**リファクタリング計画書**
- フェーズごとの実装計画
- Python→TypeScript変換マッピング
- 実装スケジュール
- 品質基準と完了基準

### 🛠️ [04_implementation_guide.md](./04_implementation_guide.md)
**実装ガイド**
- 開発環境セットアップ
- コーディング規約
- 実装パターンとベストプラクティス
- トラブルシューティング

### 📐 [05_component_development_guide.md](./05_component_development_guide.md)
**コンポーネント開発ガイドライン**
- アトミックデザイン原則
- TypeScript規約
- アクセシビリティ対応
- パフォーマンス最適化

### 🎨 [06_style_guide.md](./06_style_guide.md)
**スタイルガイド**
- デザイントークンシステム
- カラー・タイポグラフィ・スペーシング
- レスポンシブデザイン
- アニメーション

## プロジェクト情報

### 元システム
- **場所**: `/Sites/user_cms_python/`
- **技術**: Flask, Jinja2, Python
- **スタイル**: SCSS

### 新システム
- **場所**: `/Sites/react_mock/`
- **技術**: React, TypeScript, Vite
- **スタイル**: 既存SCSSを再利用

## クイックリファレンス

### 主要コンポーネント
| カテゴリ | コンポーネント | 用途 |
|---------|--------------|------|
| Layout | Header, Sidebar, PageContainer | ページレイアウト |
| UI | Button, Card, Table, Form | 汎用UIパーツ |
| Features | StatCard, ArticleCard, Editor | 機能固有パーツ |
| Pages | Dashboard, ArticleList, ArticleEdit, ImageManager | ページ |

### ページルーティング
| パス | ページ | 説明 |
|-----|-------|------|
| `/` | Dashboard | ダッシュボード |
| `/articles` | ArticleList | 記事一覧 |
| `/articles/new` | ArticleEdit | 新規記事作成 |
| `/articles/edit/:id` | ArticleEdit | 記事編集 |
| `/images` | ImageManager | 画像管理 |

### ディレクトリ構造
```
react_mock/
├── docs/              # このドキュメント
├── src/
│   ├── components/    # Reactコンポーネント
│   ├── pages/        # ページコンポーネント
│   ├── data/         # モックデータ
│   ├── styles/       # SCSS（既存ファイルコピー）
│   ├── context/      # Context API
│   └── utils/        # ユーティリティ関数
└── public/           # 静的ファイル
```

## 開発の開始

1. ドキュメントを読む順序:
   - 要件定義書 → コンポーネント仕様書 → リファクタリング計画書 → 実装ガイド

2. 実装の優先順位:
   - Phase 1: 環境構築
   - Phase 2: 基盤実装
   - Phase 3: レイアウトコンポーネント
   - Phase 4: UIコンポーネント
   - Phase 5: ページ実装
   - Phase 6: 統合と最適化

## 注意事項

- 既存のSCSSファイルは改変せずにそのまま使用する
- 新規機能の追加は行わない（純粋なリファクタリング）
- モックデータのみ使用（バックエンドAPI接続なし）
- ダミー画像はSVGで生成する

## サポート

質問や不明点がある場合は、各ドキュメントの該当セクションを参照してください。