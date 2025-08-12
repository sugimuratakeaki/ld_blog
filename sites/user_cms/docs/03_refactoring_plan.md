# リファクタリング計画書

## 概要
Flask/Jinja2ベースのCMSをReactベースのSPAモックにリファクタリングする詳細計画。

## Phase 1: 環境構築（Day 1）

### 1.1 プロジェクト初期化
```bash
cd /Sites/react_mock
npm create vite@latest . -- --template react-ts
npm install
```

### 1.2 依存関係のインストール
```bash
# ルーティング
npm install react-router-dom @types/react-router-dom

# SCSS
npm install -D sass

# 開発ツール
npm install -D @types/node
```

### 1.3 プロジェクト構造の作成
```
react_mock/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   ├── ui/
│   │   └── features/
│   ├── pages/
│   ├── data/
│   ├── styles/
│   ├── assets/
│   ├── hooks/
│   ├── context/
│   └── utils/
```

### 1.4 SCSS移植
- `/Sites/user_cms_python/static/scss/`を`src/styles/`にコピー
- main.scssをインポート設定

## Phase 2: 基盤実装（Day 2）

### 2.1 ルーティング設定
```typescript
// App.tsx
const routes = [
  { path: '/', element: <Dashboard /> },
  { path: '/articles', element: <ArticleList /> },
  { path: '/articles/new', element: <ArticleEdit /> },
  { path: '/articles/edit/:id', element: <ArticleEdit /> },
  { path: '/images', element: <ImageManager /> },
];
```

### 2.2 モックデータ移植
**元ファイル**: `data/mock_data.py`
**新ファイル**: `src/data/mockData.ts`

```typescript
// データ型定義
interface Article {
  id: number;
  title: string;
  status: 'published' | 'draft' | 'scheduled';
  category: string;
  date: string;
  views: number;
  comments: number;
  thumbnail: string;
}

interface DashboardStats {
  totalArticles: number;
  published: number;
  scheduled: number;
  drafts: number;
}
```

### 2.3 Context API設定
```typescript
// context/AppContext.tsx
interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  currentUser: User;
}
```

## Phase 3: レイアウトコンポーネント（Day 3）

### 3.1 実装順序
1. **PageContainer** - 基本レイアウト
2. **Header** - ヘッダー
3. **Sidebar** - サイドバー
4. **Footer** - フッター

### 3.2 テンプレート変換マッピング

| Jinja2テンプレート | Reactコンポーネント |
|-------------------|-------------------|
| `base.html` | `PageContainer.tsx` |
| `components/header.html` | `Header.tsx` |
| `components/sidebar.html` | `Sidebar.tsx` |
| `components/footer.html` | `Footer.tsx` |

## Phase 4: UIコンポーネント（Day 4-5）

### 4.1 優先度高
- Button
- Card
- Table
- Form (Input, Select, TextArea)
- Badge

### 4.2 優先度中
- Modal
- Alert
- Pagination
- Dropdown

### 4.3 優先度低
- Tag
- Tooltip
- Breadcrumb

### 4.4 実装方針
- PropsインターフェースをTypeScriptで厳密に定義
- 既存SCSSクラスを適用
- アクセシビリティ属性を追加

## Phase 5: ページ実装（Day 6-8）

### 5.1 Dashboard（Day 6）
**元ファイル**: `templates/pages/dashboard.html`
**実装内容**:
- 統計カード（4枚）
- 最近の記事（3件）
- アクティビティログ

### 5.2 ArticleList（Day 7）
**元ファイル**: `templates/pages/article_list.html`
**実装内容**:
- 記事テーブル
- フィルタリング（モック）
- ページネーション
- 一括操作

### 5.3 ArticleEdit（Day 7）
**元ファイル**: `templates/pages/article_edit.html`
**実装内容**:
- 記事フォーム
- エディタ（textarea）
- カテゴリ・タグ選択
- プレビュー（モック）

### 5.4 ImageManager（Day 8）
**元ファイル**: `templates/pages/image_manager.html`
**実装内容**:
- 画像グリッド
- アップロードエリア（モック）
- 画像詳細モーダル

## Phase 6: 統合と最適化（Day 9-10）

### 6.1 SVGダミー画像作成
```typescript
// utils/generatePlaceholder.ts
export const generatePlaceholderSVG = (
  width: number, 
  height: number, 
  text?: string
): string => {
  // SVG生成ロジック
};
```

### 6.2 パフォーマンス最適化
- React.lazy()によるコード分割
- useMemoによる再レンダリング最適化
- 画像の遅延読み込み

### 6.3 レスポンシブ対応確認
- モバイル表示
- タブレット表示
- デスクトップ表示

## 移植チェックリスト

### Python → TypeScript変換
- [ ] mock_data.py → mockData.ts
- [ ] routes/*.py → ページコンポーネント
- [ ] components/*.py → レイアウトコンポーネント

### HTML → JSX変換
- [ ] Jinja2テンプレート構文の除去
- [ ] classをclassNameに変更
- [ ] style属性のオブジェクト化
- [ ] self-closing tagsの修正

### SCSS移植
- [ ] ディレクトリ構造の維持
- [ ] import文の調整
- [ ] 変数・mixin・functionの動作確認

## リスク管理

### 技術的リスク
1. **SCSS互換性**
   - リスク: Viteでのコンパイルエラー
   - 対策: 段階的な移植とテスト

2. **状態管理の複雑化**
   - リスク: Context APIの肥大化
   - 対策: 必要最小限の状態管理

3. **レスポンシブデザインの崩れ**
   - リスク: React化によるレイアウト崩れ
   - 対策: 既存クラスの忠実な適用

## 品質基準

### コード品質
- TypeScript strictモード有効
- ESLint設定に準拠
- コンポーネントの単一責任原則

### UI/UX品質
- 既存デザインとの一致度95%以上
- ページ遷移のスムーズさ
- エラー状態の適切な表示

### パフォーマンス
- Lighthouse Score 90以上
- 初期ロード3秒以内
- ランタイムエラー0件

## 完了基準

1. 全4ページの実装完了
2. 全コンポーネントの動作確認
3. レスポンシブデザインの確認
4. ブラウザ互換性テスト完了
5. ドキュメント完備