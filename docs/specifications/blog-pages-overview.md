# ブログページ仕様書

## プロジェクト概要

### 実装対象ページ
1. **個別ユーザーブログトップページ** - ブログの玄関口
2. **記事詳細ページ** - 個別記事の閲覧
3. **タグ別一覧ページ** - タグでフィルタされた記事一覧
4. **月別アーカイブページ** - 月ごとの記事一覧
5. **コメントページ** - 記事へのコメント投稿・閲覧

### 技術要件

#### フロントエンド
- **React 18.2.0** + TypeScript
- **Tailwind CSS** + Hiragino Sans フォント
- **Atomic Design** パターン
- **レスポンシブ対応**: PC (≥1024px) / SP (≤767px)

#### 開発環境
- **開発サーバー**: Port 8070
- **Figmaアセット**: localhost:3845
- **モックデータ**: JSON ベース

### デザインシステム

#### カラーパレット
```css
/* Primary Colors */
--color-primary: #27272A;      /* text-zinc-800 */
--color-secondary: #A1A1AA;    /* text-zinc-400 */
--color-blue-primary: #3B82F6; /* blue-500 */
--color-blue-accent: #2563EB;  /* blue-600 */

/* Background Colors */
--color-bg-primary: #FFFFFF;   /* white */
--color-bg-secondary: #F3F3F3; /* light gray */
--color-bg-tertiary: #FAFAFA;  /* gray-50 */
```

#### フォント
```css
/* Hiragino Sans Font Family */
font-family: 'Hiragino Sans', sans-serif;

/* Font Weights */
font-weight: 300; /* W3 - 通常テキスト */
font-weight: 600; /* W6 - 太字テキスト */

/* Font Sizes */
text-xs: 12px/16px
text-sm: 14px/20px
text-base: 16px/24px
text-lg: 18px/28px
text-xl: 20px/28px
text-3xl: 30px/36px
```

#### レスポンシブブレークポイント
```css
/* Desktop First Approach */
@media (max-width: 1023px) { /* Tablet */ }
@media (max-width: 767px)  { /* Mobile */ }
```

## ページ別詳細仕様

### 1. 個別ユーザーブログトップページ

#### 機能要件
- ブログタイトル・説明の表示
- 最新記事一覧（10件程度）
- サイドバー（プロフィール、カテゴリ、アーカイブ）
- ページネーション

#### レイアウト構成
```
[PC Layout]
┌─────────────────────┬─────────────┐
│ Header              │             │
├─────────────────────┴─────────────┤
│ Blog Title & Description          │
├─────────────────────┬─────────────┤
│ Main Content        │ Sidebar     │
│ - Recent Posts      │ - Profile   │
│ - Pagination        │ - Categories│
│                     │ - Archives  │
└─────────────────────┴─────────────┘

[SP Layout]
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ Blog Title & Description            │
├─────────────────────────────────────┤
│ Main Content                        │
│ - Recent Posts                      │
│ - Pagination                        │
├─────────────────────────────────────┤
│ Sidebar (Collapsible)               │
└─────────────────────────────────────┘
```

#### 必要データ構造
```typescript
interface BlogTopPageData {
  blog: Blog;
  recentPosts: Article[];
  categories: Category[];
  monthlyArchives: MonthlyArchive[];
  totalPages: number;
  currentPage: number;
}
```

### 2. 記事詳細ページ

#### 機能要件
- 記事本文の表示
- 記事メタ情報（投稿日、カテゴリ、タグ）
- 関連記事の表示
- コメント欄
- SNSシェアボタン

#### レイアウト構成
```
[PC Layout]
┌─────────────────────┬─────────────┐
│ Header              │             │
├─────────────────────┴─────────────┤
│ Article Header                    │
│ - Title, Date, Category, Tags     │
├─────────────────────┬─────────────┤
│ Article Content     │ Sidebar     │
│ - Body              │ - Related   │
│ - Share Buttons     │ - Profile   │
│ - Comments          │ - Ad Space  │
└─────────────────────┴─────────────┘

[SP Layout]
┌─────────────────────────────────────┐
│ Header                              │
├─────────────────────────────────────┤
│ Article Header                      │
├─────────────────────────────────────┤
│ Article Content                     │
├─────────────────────────────────────┤
│ Share Buttons                       │
├─────────────────────────────────────┤
│ Comments                            │
├─────────────────────────────────────┤
│ Related Articles                    │
└─────────────────────────────────────┘
```

### 3. タグ別一覧ページ

#### 機能要件
- 特定タグの記事一覧表示
- タグ情報の表示
- フィルタリング・ソート機能
- ページネーション

### 4. 月別アーカイブページ

#### 機能要件
- 指定月の記事一覧表示
- 月別ナビゲーション
- 記事数の表示
- 年月別のパンくずリスト

### 5. コメントページ

#### 機能要件
- コメント一覧の表示
- 新規コメント投稿フォーム
- 返信機能
- モデレーション機能（管理者向け）

## 実装方針

### Phase 1: 基盤整備（Week 1）
1. データモデル定義
2. モックデータ作成
3. 基本コンポーネント拡張

### Phase 2: ページテンプレート（Week 2-3）
1. ブログトップページ
2. 記事詳細ページ

### Phase 3: 一覧ページ（Week 4）
1. タグ別一覧ページ
2. 月別アーカイブページ

### Phase 4: 機能拡張（Week 5）
1. コメントページ
2. 最終調整・最適化

### コンポーネント設計方針

#### Atomic Design 適用
```
atoms/
├── ArticleCard/
├── TagChip/
├── DateDisplay/
├── ShareButton/
└── CommentItem/

molecules/
├── ArticleHeader/
├── ArticlePreview/
├── Sidebar/
├── CommentForm/
└── Pagination/

organisms/
├── ArticleList/
├── BlogHeader/
├── CommentSection/
└── RelatedArticles/

templates/
├── BlogLayout/
├── ArticleLayout/
└── ListLayout/

pages/
├── BlogTopPage/
├── ArticleDetailPage/
├── TagListPage/
├── ArchivePage/
└── CommentPage/
```

## 開発ガイドライン

### 命名規則
- **コンポーネント**: PascalCase (e.g., `ArticleCard`)
- **ファイル**: PascalCase (e.g., `ArticleCard.tsx`)
- **Props**: camelCase (e.g., `articleData`)
- **CSS Classes**: kebab-case with Tailwind

### ファイル構造
```
src/components/atoms/ArticleCard/
├── ArticleCard.tsx
├── ArticleCard.stories.tsx (optional)
├── index.ts
└── __tests__/
    └── ArticleCard.test.tsx
```

### TypeScript 型定義
```typescript
// src/types/blog.ts
export interface Blog {
  id: string;
  title: string;
  description: string;
  author: Author;
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  publishedAt: string;
  category: Category;
  tags: Tag[];
  commentCount: number;
}
```

これらの仕様に基づいて段階的に実装を進めていきます。