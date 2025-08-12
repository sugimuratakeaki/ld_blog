# ライブドアブログシステム開発ドキュメント

## 📋 概要

このドキュメントは、ライブドアブログシステムの5つの主要ページ開発のための包括的な仕様書・設計書です。

### 実装対象ページ
1. **個別ユーザーブログトップページ** - ブログの玄関口
2. **記事詳細ページ** - 個別記事の閲覧
3. **タグ別一覧ページ** - タグでフィルタされた記事一覧  
4. **月別アーカイブページ** - 月ごとの記事一覧
5. **コメントページ** - 記事へのコメント投稿・閲覧

## 📁 ドキュメント構成

```
docs/
├── README.md                           # このファイル
├── specifications/                     # 仕様書
│   ├── blog-pages-overview.md         # 全体仕様書
│   ├── data-models.md                  # データモデル仕様
│   └── layout-configuration.md        # ★新規：LayoutConfig仕様
├── architecture/                       # アーキテクチャ設計
│   ├── component-structure.md         # コンポーネント構造設計（★更新済み）
│   └── layout-system.md               # ★新規：レイアウトシステム設計
├── workflow/                          # 開発ワークフロー
│   └── implementation-plan.md         # 実装計画書
└── guides/                            # ★新規：開発者ガイド
    ├── migration-guide.md             # 移行ガイド
    ├── component-usage.md             # コンポーネント使用法
    └── best-practices.md              # ベストプラクティス
```

## 🏗️ 技術スタック

### 基盤技術
- **React 18.2.0** + TypeScript
- **Tailwind CSS** + Hiragino Sans フォント
- **Atomic Design** パターン
- **ポート8070** での開発サーバー

### 改善された構造（2024年12月更新）
```
src/components/
├── atoms/       # Button, Text, Logo, Image
├── molecules/   # HeaderApp, HeaderBlog, FooterLinks（最適化済み）
├── organisms/   # Header, Footer, AppPromotion★（独立版）
├── templates/   # MainLayout★（LayoutConfig対応）
└── pages/       # MaintenancePage, NotFoundPage, DemoPage
```

### 主要改善点
- **LayoutConfigシステム**: 動的レイアウト制御
- **AppPromotion独立化**: organismとして再設計
- **パフォーマンス最適化**: React.memo, CLS対策
- **完全な互換性**: 既存コード変更不要

## 🎯 実装計画

### Phase 1: 基盤整備（Week 1）
- [ ] データモデル・型定義作成
- [ ] モックデータシステム構築
- [ ] 基本Atomsコンポーネント拡張

### Phase 2: ページテンプレート（Week 2-3）
- [ ] ブログトップページ実装
- [ ] 記事詳細ページ実装

### Phase 3: 一覧ページ（Week 4）
- [ ] タグ別一覧ページ実装
- [ ] 月別アーカイブページ実装

### Phase 4: 機能拡張（Week 5）
- [ ] コメントページ実装
- [ ] パフォーマンス最適化・最終調整

## 📖 主要ドキュメント

### 🔧 仕様書 (specifications/)
1. **[全体仕様書](specifications/blog-pages-overview.md)** - 各ページの詳細要件・UI/UXガイドライン
2. **[データモデル仕様](specifications/data-models.md)** - TypeScript型定義・APIインターフェース
3. **[LayoutConfig仕様](specifications/layout-configuration.md)** ★新規 - 動的レイアウト制御システム

### 🏗️ アーキテクチャ設計 (architecture/)
1. **[コンポーネント構造設計](architecture/component-structure.md)** ★更新 - 改善されたAtomic Design
2. **[レイアウトシステム設計](architecture/layout-system.md)** ★新規 - LayoutConfigシステム詳細

### 📚 開発者ガイド (guides/)
1. **[移行ガイド](guides/migration-guide.md)** ★新規 - 段階的移行手順
2. **[コンポーネント使用ガイド](guides/component-usage.md)** ★新規 - 実践的な使用方法
3. **[ベストプラクティス](guides/best-practices.md)** - 推奨実装パターン

### 📋 ワークフロー (workflow/)
1. **[実装計画書](workflow/implementation-plan.md)** - 5週間の詳細スケジュール・Git ワークフロー

## 🚀 クイックスタート

### 1. 開発環境起動
```bash
cd /Users/sugimura/Local\ Sites/ld_blog/sites/front_matome
./start-mock-server.sh
```
アクセス: http://localhost:8070

### 2. 新しいレイアウトシステムの確認
```bash
# Layout Demoページで新機能を確認
# ブラウザで http://localhost:8070 にアクセス
# 右上のセレクトボックスで "Layout Demo" を選択
```

### 3. ドキュメント確認
```bash
# ★新機能のドキュメントを確認
open docs/guides/migration-guide.md        # 移行ガイド
open docs/guides/component-usage.md        # 使用方法
open docs/architecture/layout-system.md    # システム設計

# 従来のドキュメント
open docs/specifications/blog-pages-overview.md  # 全体仕様
open docs/workflow/implementation-plan.md        # 実装計画
```

### 4. 実装開始
```bash
# 既存コードは変更不要（完全な互換性）
# 新機能を段階的に活用する場合
git checkout -b feature/layout-system-migration

# 従来通りPhase 1から開始する場合
git checkout -b feature/phase1-data-models
```

## 📏 コーディング規約

### TypeScript
```typescript
// インターフェース定義
interface ArticleCardProps {
  article: Article;
  size?: 'small' | 'medium' | 'large';
  onClick?: (article: Article) => void;
}

// コンポーネント実装
export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  size = 'medium',
  onClick
}) => {
  // 実装
};
```

### ファイル構造
```
src/components/atoms/ArticleCard/
├── ArticleCard.tsx          # メインコンポーネント
├── index.ts                 # エクスポート
└── __tests__/              # テストファイル
    └── ArticleCard.test.tsx
```

### CSS (Tailwind)
```typescript
// レスポンシブクラス
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// カスタムクラス（必要最小限）
className="font-hiragino-semibold text-figma-lg"
```

## 🎨 デザインシステム

### カラーパレット
```css
/* Primary */
--color-primary: #27272A;      /* text-zinc-800 */
--color-secondary: #A1A1AA;    /* text-zinc-400 */

/* Blue Accent */
--color-blue-500: #3B82F6;
--color-blue-600: #2563EB;

/* Background */
--color-bg-primary: #FFFFFF;
--color-bg-secondary: #F3F3F3;
```

### Typography
```css
/* Hiragino Sans */
font-family: 'Hiragino Sans', sans-serif;

/* Sizes */
text-xs: 12px/16px   /* タグ、キャプション */
text-sm: 14px/20px   /* サブテキスト */
text-base: 16px/24px /* 本文 */
text-lg: 18px/28px   /* 小見出し */
text-xl: 20px/28px   /* 見出し */
text-3xl: 30px/36px  /* 大見出し */
```

## 🔍 テスト戦略

### Unit Testing
```typescript
// atoms, molecules レベル
import { render, screen } from '@testing-library/react';
import { ArticleCard } from './ArticleCard';

test('記事タイトルが表示される', () => {
  render(<ArticleCard article={mockArticle} />);
  expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
});
```

### Integration Testing
```typescript
// organisms, pages レベル
test('ブログトップページが正常に表示される', async () => {
  render(<BlogTopPage blogId="test" />);
  await waitFor(() => {
    expect(screen.getByText('最新記事')).toBeInTheDocument();
  });
});
```

## 📞 サポート・質問

### 開発環境の問題
```bash
# サーバー停止
./stop-mock-server.sh

# 依存関係再インストール
rm -rf node_modules package-lock.json
npm install
```

### Git ワークフロー
```bash
# ブランチ作成
git checkout -b feature/phase1-data-models

# 実装後
git add .
git commit -m "feat(types): add blog data models"
git push -u origin feature/phase1-data-models
```

このドキュメントを参考に、効率的にブログシステムの開発を進めてください。各フェーズの詳細な実装手順は個別のドキュメントを参照してください。