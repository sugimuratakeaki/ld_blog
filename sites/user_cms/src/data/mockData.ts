import type {
  DashboardStats,
  Article,
  Activity,
  Image,
  Folder,
  Category,
  ArticleStatus,
  ArticleStatusClass,
} from '@/types';

// Utility function to format date
const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
};

// Utility function to get date N days ago
const getDaysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

/**
 * Get dashboard statistics
 */
export const getDashboardStats = (): DashboardStats => {
  return {
    totalArticles: 156,
    published: 142,
    scheduled: 8,
    drafts: 6,
  };
};

/**
 * Get recent articles for dashboard
 */
export const getRecentArticles = (): Article[] => {
  return [
    {
      id: 1,
      title: '新機能リリースのお知らせ：ダッシュボードが刷新されました',
      status: 'published',
      statusLabel: '公開中',
      statusClass: 'success',
      date: '2025年8月6日',
      thumbnail: 'https://via.placeholder.com/300x200',
      excerpt: 'ダッシュボードのUIを全面的に刷新し、より使いやすくなりました。',
    },
    {
      id: 2,
      title: 'SEO対策の基本：メタタグの最適化について',
      status: 'draft',
      statusLabel: '下書き',
      statusClass: 'warning',
      date: '2025年8月5日',
      thumbnail: 'https://via.placeholder.com/300x200',
      excerpt: 'SEOにおけるメタタグの重要性と最適化の方法について解説します。',
    },
    {
      id: 3,
      title: 'Webデザインのトレンド2025：注目すべき5つのポイント',
      status: 'scheduled',
      statusLabel: '予約投稿',
      statusClass: 'info',
      date: '2025年8月10日',
      thumbnail: 'https://via.placeholder.com/300x200',
      excerpt: '2025年に注目すべきWebデザインのトレンドを5つのポイントで紹介。',
    },
  ];
};

/**
 * Get recent activities for dashboard
 */
export const getRecentActivities = (): Activity[] => {
  return [
    {
      icon: '✅',
      iconClass: 'success',
      title: '記事「新機能リリースのお知らせ」を公開しました',
      time: '2時間前',
    },
    {
      icon: '✏️',
      iconClass: 'primary',
      title: '記事「SEO対策の基本」を編集しました',
      time: '5時間前',
    },
    {
      icon: '🖼️',
      iconClass: 'warning',
      title: '5枚の画像をアップロードしました',
      time: '昨日',
    },
    {
      icon: '📅',
      iconClass: 'info',
      title: '記事「Webデザインのトレンド2025」を予約投稿に設定しました',
      time: '2日前',
    },
  ];
};

/**
 * Get all articles for article list page
 */
export const getAllArticles = (): Article[] => {
  const articles: Article[] = [];
  const statuses: Array<[ArticleStatus, string, ArticleStatusClass]> = [
    ['published', '公開中', 'success'],
    ['draft', '下書き', 'warning'],
    ['scheduled', '予約投稿', 'info'],
  ];

  for (let i = 1; i <= 20; i++) {
    const status = statuses[i % 3];
    articles.push({
      id: i,
      title: `サンプル記事タイトル ${i}：これは長めのタイトルの例です`,
      status: status[0],
      statusLabel: status[1],
      statusClass: status[2],
      category: i % 2 === 0 ? 'テクノロジー' : 'デザイン',
      date: formatDate(getDaysAgo(i)),
      views: 1000 + i * 50,
      comments: i * 3,
      thumbnail: 'https://via.placeholder.com/300x200',
    });
  }

  return articles;
};

/**
 * Get images for image manager
 */
export const getImages = (): Image[] => {
  const images: Image[] = [];
  for (let i = 1; i <= 12; i++) {
    images.push({
      id: i,
      name: `sample-image-${i}.jpg`,
      url: `https://via.placeholder.com/300x200?text=Image+${i}`,
      size: `${100 + i * 10} KB`,
      dimensions: i % 2 === 0 ? '1920x1080' : '1280x720',
      uploadedDate: formatDate(getDaysAgo(i)),
      folder: i % 3 === 0 ? 'デフォルト' : '記事画像',
    });
  }
  return images;
};

/**
 * Get folders for image manager
 */
export const getFolders = (): Folder[] => {
  return [
    { id: 1, name: 'デフォルト', count: 45 },
    { id: 2, name: '記事画像', count: 128 },
    { id: 3, name: 'プロフィール', count: 12 },
    { id: 4, name: 'バナー', count: 8 },
    { id: 5, name: 'アイコン', count: 23 },
  ];
};

/**
 * Get categories for article edit
 */
export const getCategories = (): Category[] => {
  return [
    { id: 1, name: 'テクノロジー', count: 45 },
    { id: 2, name: 'デザイン', count: 38 },
    { id: 3, name: 'マーケティング', count: 22 },
    { id: 4, name: 'ビジネス', count: 31 },
    { id: 5, name: 'ライフスタイル', count: 19 },
  ];
};

/**
 * Get popular tags
 */
export const getTags = (): string[] => {
  return [
    'HTML',
    'CSS',
    'JavaScript',
    'React',
    'Vue.js',
    'UI/UX',
    'レスポンシブ',
    'SEO',
    'アクセシビリティ',
    'パフォーマンス',
    'フロントエンド',
    'バックエンド',
  ];
};