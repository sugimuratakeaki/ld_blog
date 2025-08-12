# データモデル仕様書

## 基本エンティティ

### Blog（ブログ）
```typescript
interface Blog {
  id: string;
  title: string;
  description: string;
  subdomain: string; // e.g., "user123" for user123.livedoor.biz
  author: Author;
  headerImage?: string;
  customization: BlogCustomization;
  stats: BlogStats;
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

interface BlogCustomization {
  theme: string;
  primaryColor: string;
  backgroundColor: string;
  headerFont: string;
  bodyFont: string;
  customCSS?: string;
}

interface BlogStats {
  totalPosts: number;
  totalViews: number;
  totalComments: number;
  lastPostDate?: string;
}
```

### Author（著者）
```typescript
interface Author {
  id: string;
  username: string;
  displayName: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks: SocialLink[];
  joinDate: string;
  isVerified: boolean;
}

interface SocialLink {
  platform: 'twitter' | 'facebook' | 'instagram' | 'youtube' | 'other';
  url: string;
  displayName?: string;
}
```

### Article（記事）
```typescript
interface Article {
  id: string;
  title: string;
  content: string; // HTML形式
  excerpt: string; // 抜粋（プレーンテキスト）
  slug: string; // URL用のスラッグ
  status: 'draft' | 'published' | 'private' | 'scheduled';
  publishedAt?: string;
  scheduledAt?: string;
  category: Category;
  tags: Tag[];
  featuredImage?: string;
  imageGallery: string[];
  author: Author;
  viewCount: number;
  commentCount: number;
  likeCount: number;
  seoMeta: SEOMeta;
  createdAt: string;
  updatedAt: string;
}

interface SEOMeta {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}
```

### Category（カテゴリ）
```typescript
interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  icon?: string;
  parentId?: string; // 階層構造対応
  order: number;
  articleCount: number;
  isVisible: boolean;
  createdAt: string;
}
```

### Tag（タグ）
```typescript
interface Tag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  articleCount: number;
  isPopular: boolean;
  createdAt: string;
}
```

### Comment（コメント）
```typescript
interface Comment {
  id: string;
  articleId: string;
  content: string;
  author: CommentAuthor;
  parentId?: string; // 返信コメントの場合
  status: 'approved' | 'pending' | 'spam' | 'deleted';
  isAuthorReply: boolean; // ブログ著者による返信
  likeCount: number;
  reportCount: number;
  createdAt: string;
  updatedAt: string;
  ipAddress?: string; // モデレーション用
  userAgent?: string; // モデレーション用
}

interface CommentAuthor {
  id?: string; // ログインユーザーの場合
  name: string;
  email: string;
  website?: string;
  avatar?: string;
  isRegistered: boolean;
}
```

## ページ専用データ構造

### BlogTopPageData（ブログトップページ）
```typescript
interface BlogTopPageData {
  blog: Blog;
  featuredPost?: Article;
  recentPosts: Article[];
  popularPosts: Article[];
  categories: Category[];
  popularTags: Tag[];
  monthlyArchives: MonthlyArchive[];
  pagination: PaginationInfo;
}

interface MonthlyArchive {
  year: number;
  month: number;
  count: number;
  displayName: string; // "2024年8月"
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  hasNext: boolean;
  hasPrev: boolean;
  itemsPerPage: number;
}
```

### ArticleDetailPageData（記事詳細ページ）
```typescript
interface ArticleDetailPageData {
  article: Article;
  relatedArticles: Article[];
  comments: CommentWithReplies[];
  navigation: ArticleNavigation;
  shareUrls: ShareUrls;
}

interface CommentWithReplies extends Comment {
  replies: Comment[];
  totalReplies: number;
}

interface ArticleNavigation {
  previous?: {
    id: string;
    title: string;
    slug: string;
  };
  next?: {
    id: string;
    title: string;
    slug: string;
  };
}

interface ShareUrls {
  twitter: string;
  facebook: string;
  line: string;
  hatena: string;
  copy: string;
}
```

### TagListPageData（タグ別一覧ページ）
```typescript
interface TagListPageData {
  tag: Tag;
  articles: Article[];
  relatedTags: Tag[];
  pagination: PaginationInfo;
  sortOptions: SortOption[];
  currentSort: string;
}

interface SortOption {
  value: string;
  label: string;
  isDefault: boolean;
}
```

### ArchivePageData（月別アーカイブページ）
```typescript
interface ArchivePageData {
  year: number;
  month: number;
  displayName: string;
  articles: Article[];
  categories: CategoryWithCount[];
  navigation: ArchiveNavigation;
  pagination: PaginationInfo;
}

interface CategoryWithCount extends Category {
  monthlyCount: number;
}

interface ArchiveNavigation {
  previous?: MonthlyArchive;
  next?: MonthlyArchive;
  yearList: YearArchive[];
}

interface YearArchive {
  year: number;
  months: MonthlyArchive[];
  totalCount: number;
}
```

### CommentPageData（コメントページ）
```typescript
interface CommentPageData {
  article: Pick<Article, 'id' | 'title' | 'slug'>;
  comments: CommentWithReplies[];
  commentStats: CommentStats;
  pagination: PaginationInfo;
  moderationInfo?: ModerationInfo;
}

interface CommentStats {
  total: number;
  approved: number;
  pending: number;
  spam: number;
  deleted: number;
}

interface ModerationInfo {
  isEnabled: boolean;
  autoApprove: boolean;
  requireApproval: string[]; // 承認が必要な条件
  blockedWords: string[];
  blockedIPs: string[];
}
```

## API レスポンス形式

### 成功レスポンス
```typescript
interface ApiResponse<T> {
  success: true;
  data: T;
  meta?: {
    pagination?: PaginationInfo;
    timestamp: string;
    version: string;
  };
}
```

### エラーレスポンス
```typescript
interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: any;
  };
  meta: {
    timestamp: string;
    requestId: string;
  };
}
```

## バリデーション仕様

### 記事作成・編集
```typescript
interface ArticleValidation {
  title: {
    required: true;
    minLength: 1;
    maxLength: 200;
  };
  content: {
    required: true;
    minLength: 10;
    maxLength: 100000;
  };
  excerpt: {
    required: false;
    maxLength: 500;
  };
  category: {
    required: true;
  };
  tags: {
    required: false;
    maxCount: 10;
  };
}
```

### コメント投稿
```typescript
interface CommentValidation {
  content: {
    required: true;
    minLength: 1;
    maxLength: 5000;
  };
  author: {
    name: {
      required: true;
      minLength: 1;
      maxLength: 50;
    };
    email: {
      required: true;
      format: 'email';
    };
    website: {
      required: false;
      format: 'url';
    };
  };
}
```

## モックデータサンプル

### blogs.json
```json
{
  "blogs": [
    {
      "id": "blog_001",
      "title": "テックブログ",
      "description": "プログラミングと技術について書いています",
      "subdomain": "techblog",
      "author": "author_001",
      "headerImage": "http://localhost:3845/assets/blog-header-001.jpg",
      "customization": {
        "theme": "default",
        "primaryColor": "#3B82F6",
        "backgroundColor": "#FFFFFF",
        "headerFont": "Hiragino Sans",
        "bodyFont": "Hiragino Sans"
      },
      "stats": {
        "totalPosts": 42,
        "totalViews": 15680,
        "totalComments": 127,
        "lastPostDate": "2024-08-10T10:30:00Z"
      },
      "createdAt": "2023-01-15T09:00:00Z",
      "updatedAt": "2024-08-10T10:30:00Z",
      "isActive": true
    }
  ]
}
```

### articles.json  
```json
{
  "articles": [
    {
      "id": "article_001",
      "title": "React Hooksの基本的な使い方",
      "content": "<p>React Hooksについて解説します...</p>",
      "excerpt": "React Hooksの基本的な使い方について初心者向けに解説します。",
      "slug": "react-hooks-basics",
      "status": "published",
      "publishedAt": "2024-08-10T10:30:00Z",
      "category": "category_001",
      "tags": ["tag_001", "tag_002"],
      "featuredImage": "http://localhost:3845/assets/article-001.jpg",
      "author": "author_001",
      "viewCount": 1250,
      "commentCount": 8,
      "likeCount": 32,
      "createdAt": "2024-08-10T10:00:00Z",
      "updatedAt": "2024-08-10T10:30:00Z"
    }
  ]
}
```

これらのデータモデルを基に、各ページコンポーネントの実装を進めていきます。