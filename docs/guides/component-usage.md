# コンポーネント使用ガイド

## 概要

このガイドでは、改善されたレイアウトシステムとコンポーネントの実践的な使用方法について、具体的な実装例とベストプラクティスを示します。

## 改善されたコンポーネント一覧

### Templates

#### MainLayout（改善版）
最新の動的レイアウト制御システムを搭載

```typescript
interface MainLayoutProps {
  children: React.ReactNode;
  isMobile?: boolean;
  showMobileHeaders?: boolean;  // 互換性維持
  config?: Partial<LayoutConfig>; // 新機能
  className?: string;
}
```

### Organisms

#### AppPromotion（新設計）
独立したorganismとして再設計、standaloneとembeddedモードをサポート

```typescript
interface AppPromotionOrganismProps {
  isMobile?: boolean;
  variant?: 'standalone' | 'embedded';
  className?: string;
}
```

#### Header・Footer（最適化）
パフォーマンス最適化とレスポンシブ対応を強化

## 実装パターン

### 1. 基本的なページレイアウト

#### 標準的なブログページ

```typescript
import { MainLayout } from '@/components/templates';
import { AppPromotion } from '@/components/organisms';

export const BlogTopPage: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const layoutConfig = useMemo(() => ({
    centerContent: true,
    maxWidth: '375px',
    showAppPromotion: false, // Footer内を非表示
    contentPadding: {
      mobile: 'px-4 py-4',
      desktop: 'px-8 py-8',
    },
  }), []);

  return (
    <MainLayout isMobile={isMobile} config={layoutConfig}>
      {/* メインコンテンツ */}
      <div className="space-y-6">
        <BlogHeader />
        <ArticleList />
        <Pagination />
      </div>
      
      {/* 独立したアプリプロモーション */}
      <AppPromotion isMobile={isMobile} variant="standalone" />
    </MainLayout>
  );
};
```

#### 記事詳細ページ

```typescript
export const ArticleDetailPage: React.FC<ArticleDetailPageProps> = ({ 
  articleId, 
  isMobile 
}) => {
  const articleConfig = useMemo(() => ({
    centerContent: true,
    showAppPromotion: false,
    contentPadding: {
      mobile: 'px-0 py-0', // 記事内で詳細制御
      desktop: 'px-8 py-8',
    },
  }), []);

  return (
    <MainLayout isMobile={isMobile} config={articleConfig}>
      <article className="bg-white">
        {/* 記事ヘッダー */}
        <div className="px-4 py-6">
          <ArticleHeader article={article} />
        </div>
        
        {/* 記事本文 */}
        <div className="px-4">
          <ArticleContent content={article.content} />
        </div>
        
        {/* シェアボタン */}
        <div className="px-4 py-6">
          <ShareButtonGroup article={article} />
        </div>
      </article>
      
      {/* コメントセクション */}
      <div className="px-4 py-6">
        <CommentSection articleId={articleId} />
      </div>
      
      {/* 関連記事 */}
      <div className="px-4 py-6">
        <RelatedArticles articles={relatedArticles} />
      </div>
    </MainLayout>
  );
};
```

### 2. レスポンシブデザインパターン

#### 動的レイアウト設定

```typescript
export const ResponsivePage: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  // デバイスに応じた動的設定
  const responsiveConfig = useMemo(() => ({
    centerContent: isMobile,
    maxWidth: isMobile ? '375px' : 'none',
    contentPadding: {
      mobile: 'px-4 py-4',
      desktop: 'px-12 py-8',
    },
    mobileHeaders: {
      showApp: isMobile,
      showBlog: isMobile,
    },
  }), [isMobile]);

  return (
    <MainLayout isMobile={isMobile} config={responsiveConfig}>
      {/* レスポンシブコンテンツ */}
      <div className={`
        grid gap-6
        ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}
      `}>
        <MainContent />
        {!isMobile && <Sidebar />}
      </div>
    </MainLayout>
  );
};
```

#### ブレークポイント対応

```typescript
export const useResponsiveLayout = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const getLayoutConfig = useCallback((pageType: 'blog' | 'article' | 'list') => {
    const baseConfig = {
      centerContent: isMobile,
      maxWidth: isMobile ? '375px' : 'none',
    };

    switch (pageType) {
      case 'blog':
        return {
          ...baseConfig,
          showAppPromotion: false,
          contentPadding: {
            mobile: 'px-4 py-4',
            desktop: 'px-8 py-8',
          },
        };
      case 'article':
        return {
          ...baseConfig,
          showAppPromotion: false,
          contentPadding: {
            mobile: 'px-0 py-0',
            desktop: 'px-8 py-8',
          },
        };
      case 'list':
        return {
          ...baseConfig,
          contentPadding: {
            mobile: 'px-4 py-6',
            desktop: 'px-8 py-12',
          },
        };
      default:
        return baseConfig;
    }
  }, [isMobile]);

  return { isMobile, getLayoutConfig };
};
```

### 3. AppPromotionの活用パターン

#### Footer内埋め込み（デフォルト）

```typescript
export const StandardPage: React.FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <MainLayout isMobile={isMobile}>
    {/* showAppPromotion: true がデフォルト */}
    <MainContent />
  </MainLayout>
);
```

#### 独立配置

```typescript
export const CustomPromotionPage: React.FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <MainLayout 
    isMobile={isMobile} 
    config={{ showAppPromotion: false }}
  >
    <MainContent />
    
    {/* 任意の位置に配置 */}
    <div className="my-8">
      <AppPromotion isMobile={isMobile} variant="standalone" />
    </div>
    
    <AdditionalContent />
  </MainLayout>
);
```

#### 条件付き表示

```typescript
export const ConditionalPromotionPage: React.FC<ConditionalPromotionProps> = ({ 
  isMobile, 
  showPromotion,
  userType
}) => {
  const config = useMemo(() => ({
    showAppPromotion: !showPromotion, // Footer内を制御
  }), [showPromotion]);

  return (
    <MainLayout isMobile={isMobile} config={config}>
      <MainContent />
      
      {/* 条件に応じて独立版を表示 */}
      {showPromotion && userType === 'guest' && (
        <AppPromotion isMobile={isMobile} variant="standalone" />
      )}
    </MainLayout>
  );
};
```

### 4. パフォーマンス最適化パターン

#### メモ化の活用

```typescript
export const OptimizedPage: React.FC<{ isMobile: boolean; theme: string }> = ({ 
  isMobile, 
  theme 
}) => {
  // 安定した設定はメモ化
  const stableConfig = useMemo(() => ({
    showHeader: true,
    showFooter: true,
    backgroundColor: theme === 'dark' ? '#1f1f1f' : '#f3f3f3',
  }), [theme]);

  // 動的な設定は別途メモ化
  const responsiveConfig = useMemo(() => ({
    centerContent: isMobile,
    maxWidth: isMobile ? '375px' : 'none',
  }), [isMobile]);

  // 最終的な設定をマージ
  const finalConfig = useMemo(() => ({
    ...stableConfig,
    ...responsiveConfig,
  }), [stableConfig, responsiveConfig]);

  return (
    <MainLayout isMobile={isMobile} config={finalConfig}>
      <MemoizedContent />
    </MainLayout>
  );
};

// コンテンツコンポーネントもメモ化
const MemoizedContent = memo(() => (
  <div>
    <ExpensiveComponent />
  </div>
));
```

#### Lazy Loading の実装

```typescript
// ページコンポーネントの遅延読み込み
const BlogTopPage = lazy(() => 
  import('./BlogTopPage').then(module => ({
    default: module.BlogTopPage
  }))
);

const ArticleDetailPage = lazy(() => 
  import('./ArticleDetailPage').then(module => ({
    default: module.ArticleDetailPage
  }))
);

// 使用例
export const PageRouter = () => (
  <Suspense fallback={<LoadingSpinner />}>
    <Routes>
      <Route path="/blog" element={<BlogTopPage />} />
      <Route path="/article/:id" element={<ArticleDetailPage />} />
    </Routes>
  </Suspense>
);
```

### 5. カスタムレイアウトパターン

#### ランディングページ

```typescript
export const LandingPage: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const landingConfig = useMemo(() => ({
    centerContent: true,
    maxWidth: '414px', // より大きな幅
    showHeader: false,
    showFooter: false,
    mobileHeaders: {
      showApp: false,
      showBlog: false,
    },
    contentPadding: {
      mobile: 'px-6 py-8',
      desktop: 'px-12 py-16',
    },
    backgroundColor: '#ffffff',
  }), []);

  return (
    <MainLayout isMobile={isMobile} config={landingConfig}>
      <div className="min-h-screen flex flex-col">
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
        <CTASection />
      </div>
    </MainLayout>
  );
};
```

#### フルスクリーンページ

```typescript
export const FullscreenPage: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const fullscreenConfig = useMemo(() => ({
    centerContent: false,
    maxWidth: 'none',
    showHeader: false,
    showFooter: false,
    mobileHeaders: {
      showApp: false,
      showBlog: false,
    },
    contentPadding: {
      mobile: 'px-0 py-0',
      desktop: 'px-0 py-0',
    },
    backgroundColor: 'transparent',
  }), []);

  return (
    <MainLayout isMobile={isMobile} config={fullscreenConfig}>
      <div className="fixed inset-0 bg-gradient-to-br from-blue-600 to-purple-700">
        <FullscreenContent />
      </div>
    </MainLayout>
  );
};
```

### 6. 特殊用途のパターン

#### A/Bテスト対応

```typescript
export const ABTestPage: React.FC<ABTestPageProps> = ({ 
  isMobile, 
  variant,
  experimentId
}) => {
  const abTestConfig = useMemo(() => {
    const baseConfig = {
      centerContent: true,
      showAppPromotion: false,
    };

    // 実験バリアントに応じて設定を変更
    switch (variant) {
      case 'A':
        return {
          ...baseConfig,
          maxWidth: '375px',
          contentPadding: {
            mobile: 'px-4 py-4',
            desktop: 'px-8 py-8',
          },
        };
      case 'B':
        return {
          ...baseConfig,
          maxWidth: '414px', // より大きな幅
          contentPadding: {
            mobile: 'px-6 py-6',
            desktop: 'px-12 py-12',
          },
        };
      default:
        return baseConfig;
    }
  }, [variant]);

  // 実験データの記録
  useEffect(() => {
    analytics.track('ab_test_view', {
      experimentId,
      variant,
      isMobile,
    });
  }, [experimentId, variant, isMobile]);

  return (
    <MainLayout isMobile={isMobile} config={abTestConfig}>
      <ExperimentContent variant={variant} />
      <AppPromotion isMobile={isMobile} variant="standalone" />
    </MainLayout>
  );
};
```

#### 多言語対応

```typescript
export const MultiLanguagePage: React.FC<MultiLanguagePageProps> = ({ 
  isMobile, 
  locale 
}) => {
  const i18nConfig = useMemo(() => {
    const baseConfig = {
      centerContent: true,
      showAppPromotion: false,
    };

    // 言語に応じたレイアウト調整
    switch (locale) {
      case 'ja':
        return {
          ...baseConfig,
          maxWidth: '375px',
          contentPadding: {
            mobile: 'px-4 py-4',
            desktop: 'px-8 py-8',
          },
        };
      case 'en':
        return {
          ...baseConfig,
          maxWidth: '414px', // 英語は少し広め
          contentPadding: {
            mobile: 'px-6 py-4',
            desktop: 'px-10 py-8',
          },
        };
      default:
        return baseConfig;
    }
  }, [locale]);

  return (
    <MainLayout isMobile={isMobile} config={i18nConfig}>
      <I18nContent locale={locale} />
      <AppPromotion isMobile={isMobile} variant="standalone" />
    </MainLayout>
  );
};
```

## ベストプラクティス

### 1. 設定の再利用

```typescript
// 共通設定を定義
export const LAYOUT_PRESETS = {
  BLOG: {
    centerContent: true,
    maxWidth: '375px',
    showAppPromotion: false,
    contentPadding: {
      mobile: 'px-4 py-4',
      desktop: 'px-8 py-8',
    },
  },
  ARTICLE: {
    centerContent: true,
    maxWidth: '375px',
    showAppPromotion: false,
    contentPadding: {
      mobile: 'px-0 py-0',
      desktop: 'px-8 py-8',
    },
  },
  LANDING: {
    centerContent: true,
    maxWidth: '414px',
    showHeader: false,
    showFooter: false,
    mobileHeaders: {
      showApp: false,
      showBlog: false,
    },
  },
} as const;

// 使用例
export const BlogPage = ({ isMobile }) => (
  <MainLayout isMobile={isMobile} config={LAYOUT_PRESETS.BLOG}>
    <BlogContent />
  </MainLayout>
);
```

### 2. 型安全性の確保

```typescript
// カスタムフックで型安全な設定を提供
export const useLayoutConfig = (
  pageType: keyof typeof LAYOUT_PRESETS,
  isMobile: boolean,
  overrides?: Partial<LayoutConfig>
): Partial<LayoutConfig> => {
  return useMemo(() => {
    const preset = LAYOUT_PRESETS[pageType];
    const responsiveAdjustments = {
      centerContent: isMobile,
      maxWidth: isMobile ? preset.maxWidth : 'none',
    };
    
    return mergeLayoutConfig(preset, {
      ...responsiveAdjustments,
      ...overrides,
    });
  }, [pageType, isMobile, overrides]);
};
```

### 3. パフォーマンス監視

```typescript
export const useLayoutPerformance = (pageName: string) => {
  useEffect(() => {
    // レイアウト描画時間を計測
    const startTime = performance.now();
    
    const observer = new MutationObserver(() => {
      const endTime = performance.now();
      analytics.track('layout_render_time', {
        pageName,
        renderTime: endTime - startTime,
      });
      observer.disconnect();
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, [pageName]);
};
```

このガイドに従って実装することで、新しいレイアウトシステムの機能を最大限に活用し、保守性の高いコンポーネントを作成できます。