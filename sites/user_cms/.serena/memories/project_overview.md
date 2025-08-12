# React Mock CMS - Project Overview

## プロジェクト概要
Flask/Jinja2ベースのブログCMSをReactベースのモックアプリケーションにリファクタリングするプロジェクト。

## 目的
- モダンなフロントエンド技術スタックへの移行
- コンポーネントベースアーキテクチャの採用
- 開発効率とメンテナンス性の向上

## 技術スタック
- **Framework**: React 18.x
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: SCSS (既存スタイルを再利用)
- **Routing**: React Router
- **State Management**: Context API
- **Icons**: Custom SVG components

## プロジェクト構造
```
react_mock/
├── docs/              # 設計ドキュメント
├── src/
│   ├── assets/       # アイコン、イラスト
│   │   └── icons/
│   ├── components/   # Reactコンポーネント
│   │   ├── atoms/    # 最小単位
│   │   ├── molecules/ # 複合コンポーネント
│   │   ├── organisms/ # 複雑な機能単位
│   │   └── templates/ # ページレイアウト
│   ├── pages/        # ページコンポーネント
│   ├── data/         # モックデータ
│   ├── styles/       # SCSS（既存から移行）
│   │   ├── design-tokens/ # デザイントークン
│   │   ├── atomic/   # アトミックデザインスタイル
│   │   ├── components/ # コンポーネントスタイル
│   │   ├── layout/   # レイアウトスタイル
│   │   └── pages/    # ページ固有スタイル
│   ├── context/      # Context API
│   ├── hooks/        # カスタムフック
│   └── utils/        # ユーティリティ関数
├── public/
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 主要機能（4ページ）
1. **ダッシュボード** - 統計情報、最近の記事、アクティビティ
2. **記事一覧** - テーブル表示、フィルタリング、ページネーション
3. **記事編集** - エディタ、カテゴリ・タグ設定、公開設定
4. **画像管理** - グリッド表示、アップロード（モック）

## 設計原則
- **アトミックデザイン** - コンポーネントを階層的に管理
- **デザイントークン** - 一貫性のあるデザインシステム
- **BEM命名規則** - CSSクラスの体系的な命名
- **TypeScript** - 型安全性の確保
- **アクセシビリティ** - WCAG準拠を目指す