# ベストプラクティスガイド

## 概要

このガイドでは、改善されたレイアウトシステムとコンポーネントアーキテクチャを活用した開発における、推奨パターンとベストプラクティスを説明します。

## レイアウトシステムのベストプラクティス

### 1. 設定の再利用と標準化

#### ✅ 推奨: プリセット設定の活用

```typescript
// config/layout-presets.ts
export const LAYOUT_PRESETS = {
  BLOG_STANDARD: {
    centerContent: true,
    maxWidth: '375px',
    showAppPromotion: false,
    contentPadding: {
      mobile: 'px-4 py-4',
      desktop: 'px-8 py-8',
    },
  },
  ARTICLE_DETAIL: {
    centerContent: true,
    maxWidth: '375px',
    showAppPromotion: false,
    contentPadding: {
      mobile: 'px-0 py-0',
      desktop: 'px-8 py-8',
    },
  },
  LANDING_PAGE: {
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
```

#### ❌ 非推奨: 毎回個別設定

```typescript
// 各ページで個別に設定（重複・保守性の問題）
const config = {
  centerContent: true,
  maxWidth: '375px',
  showAppPromotion: false,
  // ... 毎回同じ設定を記述
};
```

### 2. パフォーマンス最適化

#### ✅ 推奨: メモ化の適切な活用

```typescript
export const OptimizedPage: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  // 静的な設定はコンポーネント外で定義
  const staticConfig = useMemo(() => LAYOUT_PRESETS.BLOG_STANDARD, []);
  
  // 動的な設定のみメモ化
  const responsiveConfig = useMemo(() => ({
    centerContent: isMobile,
    maxWidth: isMobile ? '375px' : 'none',
  }), [isMobile]);
  
  // 最終設定をマージ
  const finalConfig = useMemo(() => ({
    ...staticConfig,
    ...responsiveConfig,
  }), [staticConfig, responsiveConfig]);

  return (
    <MainLayout isMobile={isMobile} config={finalConfig}>
      <MemoizedContent />
    </MainLayout>
  );
};
```

#### ❌ 非推奨: 不適切なメモ化

```typescript
// 毎回新しいオブジェクトを作成（メモ化の意味がない）
const config = {
  centerContent: isMobile,
  maxWidth: isMobile ? '375px' : 'none',
};

// 依存配列が不適切
const memoizedConfig = useMemo(() => ({
  centerContent: isMobile,
}), []); // isMobileが変更されても再計算されない
```

### 3. 型安全性の確保

#### ✅ 推奨: 型安全な設定管理

```typescript
// カスタムフックで型安全性を確保
export const useLayoutConfig = (
  preset: keyof typeof LAYOUT_PRESETS,
  isMobile: boolean,
  overrides?: Partial<LayoutConfig>
): Partial<LayoutConfig> => {
  return useMemo(() => {
    const baseConfig = LAYOUT_PRESETS[preset];
    const responsiveAdjustments = {
      centerContent: isMobile,
      maxWidth: isMobile ? baseConfig.maxWidth : 'none',
    };
    
    return mergeLayoutConfig(baseConfig, {
      ...responsiveAdjustments,
      ...overrides,
    });
  }, [preset, isMobile, overrides]);
};

// 使用例
export const BlogPage = ({ isMobile }: { isMobile: boolean }) => {
  const config = useLayoutConfig('BLOG_STANDARD', isMobile);
  
  return (
    <MainLayout isMobile={isMobile} config={config}>
      <BlogContent />
    </MainLayout>
  );
};
```

## コンポーネント設計のベストプラクティス

### 1. AppPromotionの適切な使用

#### ✅ 推奨: 目的に応じた使い分け

```typescript
// 標準的なページ（Footer内に表示）
export const StandardPage = ({ isMobile }: { isMobile: boolean }) => (
  <MainLayout isMobile={isMobile}>
    {/* showAppPromotion: true がデフォルト */}
    <MainContent />
  </MainLayout>
);

// カスタムレイアウト（独立表示）
export const CustomPage = ({ isMobile }: { isMobile: boolean }) => (
  <MainLayout 
    isMobile={isMobile} 
    config={{ showAppPromotion: false }}
  >
    <MainContent />
    <div className="my-8">
      <AppPromotion isMobile={isMobile} variant="standalone" />
    </div>
    <AdditionalContent />
  </MainLayout>
);
```

#### ❌ 非推奨: 重複表示や制御ミス

```typescript
// Footer内とstandalone版の両方が表示される
<MainLayout isMobile={isMobile}> {/* showAppPromotion: true のまま */}
  <MainContent />
  <AppPromotion isMobile={isMobile} variant="standalone" /> {/* 重複 */}
</MainLayout>
```

### 2. レスポンシブ対応

#### ✅ 推奨: 一貫したブレークポイント

```typescript
// constants/breakpoints.ts
export const BREAKPOINTS = {
  mobile: 767,
  tablet: 1023,
} as const;

// hooks/useBreakpoint.ts
export const useBreakpoint = () => {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkBreakpoint = () => {
      setIsMobile(window.innerWidth <= BREAKPOINTS.mobile);
    };
    
    checkBreakpoint();
    window.addEventListener('resize', checkBreakpoint);
    return () => window.removeEventListener('resize', checkBreakpoint);
  }, []);
  
  return { isMobile };
};
```

#### ❌ 非推奨: 一貫性のないブレークポイント

```typescript
// 各コンポーネントで異なる値を使用
const isMobile = window.innerWidth <= 768;  // あるページ
const isMobile = window.innerWidth < 800;   // 別のページ
```

### 3. エラーハンドリング

#### ✅ 推奨: 堅牢なエラーハンドリング

```typescript
// components/ErrorBoundary.tsx
export class LayoutErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Layout Error:', error, errorInfo);
    // エラー監視サービスに送信
    analytics.track('layout_error', {
      error: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
    });
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <DefaultErrorFallback />;
    }

    return this.props.children;
  }
}

// 使用例
export const SafePage = ({ isMobile }: { isMobile: boolean }) => (
  <LayoutErrorBoundary>
    <MainLayout isMobile={isMobile}>
      <PageContent />
    </MainLayout>
  </LayoutErrorBoundary>
);
```

## 開発ワークフローのベストプラクティス

### 1. 段階的な機能導入

#### ✅ 推奨: 段階的アプローチ

```typescript
// Phase 1: 基本設定のみ追加
const basicConfig = { centerContent: true };

// Phase 2: パディング制御を追加
const enhancedConfig = {
  ...basicConfig,
  contentPadding: { mobile: 'px-4 py-4' }
};

// Phase 3: 完全なカスタマイゼーション
const fullConfig = {
  ...enhancedConfig,
  showAppPromotion: false,
  maxWidth: '375px',
};
```

#### ❌ 非推奨: 一気に全機能を導入

```typescript
// 最初から複雑な設定を行う（リスク高）
const complexConfig = {
  centerContent: true,
  maxWidth: '375px',
  showHeader: false,
  showFooter: false,
  mobileHeaders: { showApp: false, showBlog: false },
  contentPadding: { mobile: 'px-6 py-8', desktop: 'px-12 py-16' },
  backgroundColor: '#custom-color',
};
```

### 2. テスト戦略

#### ✅ 推奨: 包括的なテスト

```typescript
// components/__tests__/MainLayout.test.tsx
describe('MainLayout', () => {
  describe('レイアウト設定', () => {
    test('デフォルト設定で正常に描画される', () => {
      render(
        <MainLayout isMobile={true}>
          <div>Test Content</div>
        </MainLayout>
      );
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    test('カスタム設定が正しく適用される', () => {
      const config = { centerContent: true, maxWidth: '375px' };
      
      render(
        <MainLayout isMobile={true} config={config}>
          <div>Test Content</div>
        </MainLayout>
      );
      
      // レイアウトの検証
      const container = screen.getByText('Test Content').closest('[style*="max-width"]');
      expect(container).toHaveStyle('max-width: 375px');
    });
  });

  describe('レスポンシブ対応', () => {
    test('モバイルとデスクトップで異なるレイアウトが適用される', () => {
      const { rerender } = render(
        <MainLayout isMobile={true}>
          <div>Content</div>
        </MainLayout>
      );

      // モバイル表示の確認
      expect(screen.getByTestId('mobile-layout')).toBeInTheDocument();

      // デスクトップ表示に変更
      rerender(
        <MainLayout isMobile={false}>
          <div>Content</div>
        </MainLayout>
      );

      expect(screen.getByTestId('desktop-layout')).toBeInTheDocument();
    });
  });
});
```

### 3. パフォーマンス監視

#### ✅ 推奨: 継続的な監視

```typescript
// utils/performance.ts
export const measureLayoutPerformance = (pageName: string) => {
  const startTime = performance.now();
  
  return {
    end: () => {
      const endTime = performance.now();
      const duration = endTime - startTime;
      
      // パフォーマンス指標の記録
      analytics.track('layout_performance', {
        pageName,
        renderTime: duration,
        timestamp: Date.now(),
      });
      
      // 閾値を超えた場合のアラート
      if (duration > 100) { // 100ms以上
        console.warn(`Slow layout render detected: ${pageName} (${duration}ms)`);
      }
    }
  };
};

// 使用例
export const MonitoredPage = ({ isMobile }: { isMobile: boolean }) => {
  useEffect(() => {
    const monitor = measureLayoutPerformance('BlogTopPage');
    
    return () => {
      monitor.end();
    };
  }, []);

  return (
    <MainLayout isMobile={isMobile}>
      <PageContent />
    </MainLayout>
  );
};
```

## A/Bテストのベストプラクティス

### 1. 実験設計

#### ✅ 推奨: 構造化された実験管理

```typescript
// types/experiments.ts
export interface ExperimentConfig {
  id: string;
  variant: 'A' | 'B';
  layoutOverrides: Partial<LayoutConfig>;
  trackingMetrics: string[];
}

// hooks/useExperiment.ts
export const useExperiment = (experimentId: string) => {
  const [experiment, setExperiment] = useState<ExperimentConfig | null>(null);
  
  useEffect(() => {
    // 実験設定の取得
    const loadExperiment = async () => {
      const config = await experimentService.getConfig(experimentId);
      setExperiment(config);
      
      // 実験参加の記録
      analytics.track('experiment_enrollment', {
        experimentId,
        variant: config.variant,
      });
    };
    
    loadExperiment();
  }, [experimentId]);
  
  return experiment;
};

// 使用例
export const ExperimentalPage = ({ isMobile }: { isMobile: boolean }) => {
  const experiment = useExperiment('layout-width-test');
  
  const config = useMemo(() => {
    if (!experiment) return LAYOUT_PRESETS.BLOG_STANDARD;
    
    return {
      ...LAYOUT_PRESETS.BLOG_STANDARD,
      ...experiment.layoutOverrides,
    };
  }, [experiment]);

  return (
    <MainLayout isMobile={isMobile} config={config}>
      <BlogContent />
    </MainLayout>
  );
};
```

## アクセシビリティのベストプラクティス

### 1. セマンティックHTML

#### ✅ 推奨: 適切なHTML構造

```typescript
export const AccessiblePage = ({ isMobile }: { isMobile: boolean }) => (
  <MainLayout isMobile={isMobile}>
    <main role="main" aria-label="メインコンテンツ">
      <header>
        <h1>ページタイトル</h1>
      </header>
      
      <section aria-labelledby="articles-heading">
        <h2 id="articles-heading">記事一覧</h2>
        <ArticleList />
      </section>
      
      <aside aria-label="関連情報">
        <RelatedContent />
      </aside>
    </main>
  </MainLayout>
);
```

### 2. キーボードナビゲーション

#### ✅ 推奨: フォーカス管理

```typescript
export const KeyboardFriendlyPage = ({ isMobile }: { isMobile: boolean }) => {
  const skipLinkRef = useRef<HTMLAnchorElement>(null);
  
  useEffect(() => {
    // ページロード時にスキップリンクにフォーカス
    const handleFocus = (e: KeyboardEvent) => {
      if (e.key === 'Tab' && !e.shiftKey) {
        skipLinkRef.current?.focus();
      }
    };
    
    document.addEventListener('keydown', handleFocus, { once: true });
    return () => document.removeEventListener('keydown', handleFocus);
  }, []);

  return (
    <MainLayout isMobile={isMobile}>
      <a 
        ref={skipLinkRef}
        href="#main-content" 
        className="sr-only focus:not-sr-only"
      >
        メインコンテンツにスキップ
      </a>
      
      <div id="main-content" tabIndex={-1}>
        <PageContent />
      </div>
    </MainLayout>
  );
};
```

## セキュリティのベストプラクティス

### 1. XSS対策

#### ✅ 推奨: 入力値のサニタイズ

```typescript
// utils/sanitize.ts
import DOMPurify from 'dompurify';

export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'a'],
    ALLOWED_ATTR: ['href', 'target'],
  });
};

// 使用例
export const SafeContentPage = ({ content }: { content: string }) => (
  <MainLayout isMobile={true}>
    <div 
      dangerouslySetInnerHTML={{ 
        __html: sanitizeHTML(content) 
      }} 
    />
  </MainLayout>
);
```

このベストプラクティスガイドに従うことで、保守性が高く、パフォーマンスに優れ、アクセシブルなアプリケーションを構築できます。