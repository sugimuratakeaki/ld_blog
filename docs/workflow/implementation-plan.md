# 実装計画書

## フェーズ別実装ロードマップ

### Phase 1: 基盤整備（Week 1）

#### 目標
- データモデルとインターフェースの確立
- 基本コンポーネントの拡張
- モックデータシステムの構築

#### 実装タスク

**Day 1-2: データ基盤構築**
```bash
# 1. 型定義の作成
src/types/
├── blog.ts        # Blog, Author関連の型
├── article.ts     # Article, Category, Tag関連の型
├── comment.ts     # Comment関連の型
├── api.ts         # APIレスポンス型
└── index.ts       # 型のエクスポート

# 2. モックデータの作成
src/mocks/data/
├── blogs.json     # ブログデータ
├── articles.json  # 記事データ
├── comments.json  # コメントデータ
├── authors.json   # 著者データ
├── categories.json # カテゴリデータ
└── tags.json      # タグデータ
```

**Day 3-4: Atomsコンポーネント拡張**
```typescript
// 優先実装コンポーネント
atoms/
├── ArticleCard/
├── TagChip/
├── DateDisplay/
├── Avatar/
└── Badge/
```

**Day 5: 統合とテスト**
- モックデータとコンポーネントの動作確認
- 既存構造との整合性チェック

### Phase 2: ページテンプレート実装（Week 2-3）

#### Week 2: ブログトップページ

**Day 1-2: Moleculesコンポーネント**
```typescript
molecules/
├── ArticlePreview/   # 記事プレビューカード
├── BlogSidebar/      # サイドバー
├── CategoryNav/      # カテゴリナビゲーション
└── Pagination/       # ページネーション
```

**Day 3-4: Organismsコンポーネント**
```typescript
organisms/
├── BlogHeader/       # ブログヘッダー
├── ArticleList/      # 記事一覧
├── PopularPosts/     # 人気記事
└── ArchiveWidget/    # アーカイブウィジェット
```

**Day 5: BlogTopPage完成**
```typescript
pages/BlogTopPage/
├── BlogTopPage.tsx
├── index.ts
└── __tests__/
    └── BlogTopPage.test.tsx
```

#### Week 3: 記事詳細ページ

**Day 1-2: 記事表示コンポーネント**
```typescript
molecules/
├── ArticleHeader/    # 記事ヘッダー
├── ShareButtonGroup/ # シェアボタン群
├── AuthorCard/       # 著者カード
└── RelatedArticleItem/ # 関連記事アイテム
```

**Day 3-4: コメント機能**
```typescript
atoms/CommentItem/
molecules/CommentForm/
organisms/CommentSection/
```

**Day 5: ArticleDetailPage完成**
```typescript
pages/ArticleDetailPage/
├── ArticleDetailPage.tsx
├── index.ts
└── __tests__/
    └── ArticleDetailPage.test.tsx
```

### Phase 3: 一覧ページ実装（Week 4）

#### Day 1-3: TagListPage
```typescript
# 実装順序
1. TagChip の拡張（フィルタ機能追加）
2. タグ専用ArticleList
3. TagListPage組み立て
4. レスポンシブ対応
```

#### Day 4-5: ArchivePage
```typescript
# 実装順序
1. ArchiveNavigation コンポーネント
2. 月別記事一覧表示
3. ArchivePage組み立て
4. カレンダーウィジェット（オプション）
```

### Phase 4: 機能拡張と最適化（Week 5）

#### Day 1-2: CommentPage
```typescript
# 実装順序
1. CommentSection の独立ページ化
2. コメント管理機能
3. フィルタリング・ソート機能
4. モデレーション機能（管理者向け）
```

#### Day 3-4: パフォーマンス最適化
```typescript
# 最適化タスク
1. Code Splitting 実装
2. 画像遅延読み込み
3. 無限スクロール（オプション）
4. キャッシュ戦略
```

#### Day 5: 最終調整・テスト
```typescript
# 最終タスク
1. E2Eテストの追加
2. アクセシビリティチェック
3. SEO対応確認
4. ドキュメント更新
```

## 技術実装ガイドライン

### コンポーネント実装順序

#### 1. 型定義から開始
```typescript
// 1. まず型を定義
interface ArticleCardProps {
  article: Article;
  size?: 'small' | 'medium' | 'large';
  onClick?: (article: Article) => void;
}

// 2. コンポーネント実装
export const ArticleCard: React.FC<ArticleCardProps> = ({
  article,
  size = 'medium',
  onClick
}) => {
  // 実装
};

// 3. エクスポート
export default ArticleCard;
```

#### 2. モックデータとの連携
```typescript
// hooks/useArticles.ts
export const useArticles = (params?: ArticleSearchParams) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // モックデータの取得
    const fetchArticles = async () => {
      setLoading(true);
      const data = await mockApiClient.getArticles(params);
      setArticles(data.articles);
      setLoading(false);
    };
    
    fetchArticles();
  }, [params]);
  
  return { articles, loading };
};
```

#### 3. レスポンシブ対応の実装
```typescript
// hooks/useResponsive.ts
export const useResponsive = () => {
  const [breakpoint, setBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  
  useEffect(() => {
    const updateBreakpoint = () => {
      if (window.innerWidth <= 767) setBreakpoint('mobile');
      else if (window.innerWidth <= 1023) setBreakpoint('tablet');
      else setBreakpoint('desktop');
    };
    
    updateBreakpoint();
    window.addEventListener('resize', updateBreakpoint);
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);
  
  return breakpoint;
};
```

### テスト戦略

#### Unit Testing
```typescript
// ArticleCard.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ArticleCard } from './ArticleCard';
import { mockArticle } from '../../../mocks/data';

describe('ArticleCard', () => {
  test('記事タイトルが表示される', () => {
    render(<ArticleCard article={mockArticle} />);
    expect(screen.getByText(mockArticle.title)).toBeInTheDocument();
  });
  
  test('クリック時にonClickが呼ばれる', () => {
    const handleClick = jest.fn();
    render(<ArticleCard article={mockArticle} onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledWith(mockArticle);
  });
});
```

#### Integration Testing
```typescript
// BlogTopPage.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { BlogTopPage } from './BlogTopPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('BlogTopPage', () => {
  test('記事一覧が表示される', async () => {
    renderWithRouter(<BlogTopPage blogId="test-blog" />);
    
    await waitFor(() => {
      expect(screen.getByText('最新記事')).toBeInTheDocument();
    });
    
    expect(screen.getAllByTestId('article-card')).toHaveLength(10);
  });
});
```

### Git ワークフロー

#### ブランチ戦略
```bash
main
├── develop
│   ├── feature/phase1-data-models
│   ├── feature/phase1-atoms-components
│   ├── feature/phase2-blog-top-page
│   ├── feature/phase2-article-detail
│   ├── feature/phase3-tag-list
│   ├── feature/phase3-archive
│   ├── feature/phase4-comment-page
│   └── feature/phase4-optimization
```

#### コミットメッセージ規約
```bash
# 形式: type(scope): subject

# 例
feat(atoms): add ArticleCard component
fix(molecules): fix BlogSidebar responsive issue
docs(specs): update data models documentation
test(pages): add BlogTopPage integration tests
refactor(organisms): optimize ArticleList performance
```

#### プルリクエストテンプレート
```markdown
## 概要
- [x] ArticleCardコンポーネントの実装
- [x] レスポンシブ対応
- [x] ユニットテストの追加

## 変更内容
- `src/components/atoms/ArticleCard/` を追加
- PC/Mobile両対応のレイアウト実装
- TypeScript型定義の追加

## テスト
- [x] ユニットテスト通過
- [x] ビジュアルテスト確認
- [x] レスポンシブ動作確認

## スクリーンショット
[PC版とMobile版のスクリーンショット]

## レビューポイント
- ArticleCard のレイアウト調整
- TypeScript型定義の妥当性
```

### パフォーマンス考慮事項

#### バンドルサイズ最適化
```typescript
// 動的インポートによるコード分割
const BlogTopPage = lazy(() => 
  import('./pages/BlogTopPage').then(module => ({
    default: module.BlogTopPage
  }))
);

// ライブラリの選択的インポート
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
// 全体インポートは避ける: import * as dateFns from 'date-fns';
```

#### メモリ使用量最適化
```typescript
// 大きなリストの仮想化
import { FixedSizeList as List } from 'react-window';

const VirtualizedArticleList = ({ articles }: { articles: Article[] }) => {
  const renderItem = ({ index, style }: { index: number; style: CSSProperties }) => (
    <div style={style}>
      <ArticleCard article={articles[index]} />
    </div>
  );
  
  return (
    <List
      height={600}
      itemCount={articles.length}
      itemSize={200}
    >
      {renderItem}
    </List>
  );
};
```

この実装計画に従って、段階的かつ効率的にブログシステムを構築していきます。