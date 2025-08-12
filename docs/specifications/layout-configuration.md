# LayoutConfig 仕様書

## 概要

`LayoutConfig` は、動的レイアウト制御システムの中核となる設定インターフェースです。このドキュメントでは、各設定項目の詳細仕様、使用例、およびベストプラクティスについて説明します。

## 型定義

### LayoutConfig インターフェース

```typescript
interface LayoutConfig {
  centerContent?: boolean;
  maxWidth?: string;
  showHeader?: boolean;
  showFooter?: boolean;
  showAppPromotion?: boolean;
  mobileHeaders?: MobileHeaderConfig;
  contentPadding?: ContentPaddingConfig;
  backgroundColor?: string;
}

interface MobileHeaderConfig {
  showApp?: boolean;
  showBlog?: boolean;
}

interface ContentPaddingConfig {
  mobile?: string;
  desktop?: string;
}
```

## 設定項目詳細

### centerContent
- **型**: `boolean`
- **デフォルト**: `true`
- **説明**: コンテンツの中央寄せを制御
- **適用**: モバイル画面での表示最適化

```typescript
// コンテンツをセンタリング（推奨）
{ centerContent: true }

// 全幅表示
{ centerContent: false }
```

### maxWidth
- **型**: `string`
- **デフォルト**: `'375px'`
- **説明**: コンテンツの最大幅を制御
- **適用**: `centerContent: true` の場合のみ有効

```typescript
// 標準モバイル幅
{ maxWidth: '375px' }

// iPhone Pro Max対応
{ maxWidth: '414px' }

// デスクトップで制限なし
{ maxWidth: 'none' }

// カスタム幅
{ maxWidth: '768px' }
```

### showHeader
- **型**: `boolean`
- **デフォルト**: `true`
- **説明**: ヘッダーの表示制御
- **適用**: デスクトップ版Header organism

```typescript
// ヘッダーを表示（通常）
{ showHeader: true }

// ヘッダーを非表示（ランディングページなど）
{ showHeader: false }
```

### showFooter
- **型**: `boolean`
- **デフォルト**: `true`
- **説明**: フッターの表示制御
- **適用**: Footer organism

```typescript
// フッターを表示（通常）
{ showFooter: true }

// フッターを非表示（特別なページ）
{ showFooter: false }
```

### showAppPromotion
- **型**: `boolean`
- **デフォルト**: `true`
- **説明**: Footer内AppPromotionの表示制御
- **注意**: 独立したAppPromotionとは別制御

```typescript
// Footer内にAppPromotionを表示
{ showAppPromotion: true }

// Footer内のAppPromotionを非表示（独立版使用時）
{ showAppPromotion: false }
```

### mobileHeaders
- **型**: `MobileHeaderConfig`
- **説明**: モバイル版ヘッダーの詳細制御

#### mobileHeaders.showApp
- **型**: `boolean`
- **デフォルト**: `true`
- **説明**: HeaderApp moleculeの表示制御

#### mobileHeaders.showBlog
- **型**: `boolean`
- **デフォルト**: `true`
- **説明**: HeaderBlog moleculeの表示制御

```typescript
// 両方のヘッダーを表示（標準）
mobileHeaders: {
  showApp: true,
  showBlog: true,
}

// アプリヘッダーのみ表示
mobileHeaders: {
  showApp: true,
  showBlog: false,
}

// ヘッダー完全非表示
mobileHeaders: {
  showApp: false,
  showBlog: false,
}
```

### contentPadding
- **型**: `ContentPaddingConfig`
- **説明**: コンテンツエリアのパディング制御

#### contentPadding.mobile
- **型**: `string`
- **デフォルト**: `'px-4 py-0'`
- **説明**: モバイル画面でのパディング

#### contentPadding.desktop
- **型**: `string`
- **デフォルト**: `'px-0 py-8'`
- **説明**: デスクトップ画面でのパディング

```typescript
// 標準パディング
contentPadding: {
  mobile: 'px-4 py-0',
  desktop: 'px-0 py-8',
}

// 密なレイアウト
contentPadding: {
  mobile: 'px-2 py-0',
  desktop: 'px-4 py-4',
}

// 余裕のあるレイアウト
contentPadding: {
  mobile: 'px-6 py-4',
  desktop: 'px-12 py-12',
}

// パディングなし（コンテンツ側で制御）
contentPadding: {
  mobile: 'px-0 py-0',
  desktop: 'px-0 py-0',
}
```

### backgroundColor
- **型**: `string`
- **デフォルト**: `'#f3f3f3'`
- **説明**: 背景色の制御
- **形式**: CSSカラー値（HEX、RGB、カラー名など）

```typescript
// デフォルトグレー
{ backgroundColor: '#f3f3f3' }

// 白背景
{ backgroundColor: '#ffffff' }

// ダークテーマ
{ backgroundColor: '#1f1f1f' }

// 透明背景
{ backgroundColor: 'transparent' }
```

## プリセット設定

### DEFAULT_LAYOUT_CONFIG
標準的なモバイルファーストレイアウト

```typescript
export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  centerContent: true,
  maxWidth: '375px',
  showHeader: true,
  showFooter: true,
  showAppPromotion: true,
  mobileHeaders: {
    showApp: true,
    showBlog: true,
  },
  contentPadding: {
    mobile: 'px-4 py-0',
    desktop: 'px-0 py-8',
  },
  backgroundColor: '#f3f3f3',
};
```

### DESKTOP_LAYOUT_CONFIG
デスクトップ最適化レイアウト

```typescript
export const DESKTOP_LAYOUT_CONFIG: LayoutConfig = {
  centerContent: false,
  maxWidth: 'none',
  showHeader: true,
  showFooter: true,
  showAppPromotion: true,
  mobileHeaders: {
    showApp: false,
    showBlog: false,
  },
  contentPadding: {
    mobile: 'px-4 py-0',
    desktop: 'px-0 py-8',
  },
  backgroundColor: '#f3f3f3',
};
```

## 実用例

### ブログトップページ

```typescript
const blogTopConfig: Partial<LayoutConfig> = {
  centerContent: true,
  maxWidth: '375px',
  showAppPromotion: false, // 記事一覧後に独立表示
  contentPadding: {
    mobile: 'px-4 py-4',
    desktop: 'px-8 py-8',
  },
};

export const BlogTopPage = ({ isMobile }: { isMobile: boolean }) => (
  <MainLayout isMobile={isMobile} config={blogTopConfig}>
    <BlogHeader />
    <ArticleList />
    <Pagination />
    <AppPromotion isMobile={isMobile} variant="standalone" />
  </MainLayout>
);
```

### 記事詳細ページ

```typescript
const articleDetailConfig: Partial<LayoutConfig> = {
  centerContent: true,
  showAppPromotion: false,
  contentPadding: {
    mobile: 'px-0 py-0', // 記事内で個別制御
    desktop: 'px-8 py-8',
  },
};

export const ArticleDetailPage = ({ isMobile }: { isMobile: boolean }) => (
  <MainLayout isMobile={isMobile} config={articleDetailConfig}>
    <ArticleHeader />
    <ArticleContent />
    <CommentSection />
    <RelatedArticles />
  </MainLayout>
);
```

### ランディングページ

```typescript
const landingPageConfig: Partial<LayoutConfig> = {
  centerContent: true,
  maxWidth: '414px', // より大きな画面対応
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
};

export const LandingPage = ({ isMobile }: { isMobile: boolean }) => (
  <MainLayout isMobile={isMobile} config={landingPageConfig}>
    <HeroSection />
    <FeatureSection />
    <CTASection />
  </MainLayout>
);
```

### エラーページ

```typescript
const errorPageConfig: Partial<LayoutConfig> = {
  centerContent: true,
  showAppPromotion: false,
  contentPadding: {
    mobile: 'px-4 py-8',
    desktop: 'px-8 py-16',
  },
};

export const NotFoundPage = ({ isMobile }: { isMobile: boolean }) => (
  <MainLayout isMobile={isMobile} config={errorPageConfig}>
    <ErrorMessage />
    <ReturnButton />
  </MainLayout>
);
```

## 動的設定の実装

### 条件付き設定

```typescript
const useDynamicLayoutConfig = (
  isMobile: boolean,
  userPreferences: UserPreferences
): Partial<LayoutConfig> => {
  return useMemo(() => {
    const baseConfig: Partial<LayoutConfig> = {
      centerContent: isMobile,
      maxWidth: isMobile ? '375px' : 'none',
    };

    // ユーザー設定による拡張
    if (userPreferences.darkMode) {
      baseConfig.backgroundColor = '#1f1f1f';
    }

    if (userPreferences.reducedMotion) {
      // アニメーション関連の設定を調整
    }

    return baseConfig;
  }, [isMobile, userPreferences]);
};
```

### A/Bテスト対応

```typescript
const useABTestLayoutConfig = (
  isMobile: boolean,
  experimentVariant: 'A' | 'B'
): Partial<LayoutConfig> => {
  return useMemo(() => {
    const baseConfig = isMobile ? DEFAULT_LAYOUT_CONFIG : DESKTOP_LAYOUT_CONFIG;
    
    if (experimentVariant === 'B') {
      return {
        ...baseConfig,
        centerContent: true,
        maxWidth: '414px', // 実験版はより大きな幅
      };
    }
    
    return baseConfig;
  }, [isMobile, experimentVariant]);
};
```

## パフォーマンス考慮事項

### メモ化の実装

```typescript
// ✅ 正しい実装
const memoizedConfig = useMemo(() => ({
  centerContent: isMobile,
  maxWidth: isMobile ? '375px' : 'none',
  showAppPromotion: false,
}), [isMobile]);

// ❌ 間違った実装（毎回新しいオブジェクト）
const config = {
  centerContent: isMobile,
  maxWidth: isMobile ? '375px' : 'none',
  showAppPromotion: false,
};
```

### 設定の分割

```typescript
// 頻繁に変更される設定と安定した設定を分離
const stableConfig = useMemo(() => ({
  showHeader: true,
  showFooter: true,
  backgroundColor: '#f3f3f3',
}), []);

const responsiveConfig = useMemo(() => ({
  centerContent: isMobile,
  maxWidth: isMobile ? '375px' : 'none',
}), [isMobile]);

const finalConfig = useMemo(() => ({
  ...stableConfig,
  ...responsiveConfig,
}), [stableConfig, responsiveConfig]);
```

## バリデーション

### 型安全性の確保

```typescript
export const validateLayoutConfig = (config: Partial<LayoutConfig>): LayoutConfig => {
  const validatedConfig = { ...DEFAULT_LAYOUT_CONFIG };
  
  // centerContent のバリデーション
  if (typeof config.centerContent === 'boolean') {
    validatedConfig.centerContent = config.centerContent;
  }
  
  // maxWidth のバリデーション
  if (config.maxWidth && (config.maxWidth === 'none' || /^\d+px$/.test(config.maxWidth))) {
    validatedConfig.maxWidth = config.maxWidth;
  }
  
  return validatedConfig;
};
```

### 実行時チェック

```typescript
export const mergeLayoutConfig = (
  base: LayoutConfig,
  override?: Partial<LayoutConfig>
): LayoutConfig => {
  if (!override) return base;
  
  // 深いマージでネストされた設定も正しく処理
  return {
    ...base,
    ...override,
    mobileHeaders: {
      ...base.mobileHeaders,
      ...override.mobileHeaders,
    },
    contentPadding: {
      ...base.contentPadding,
      ...override.contentPadding,
    },
  };
};
```

## トラブルシューティング

### よくある問題

**Q1: centerContentが効かない**
```typescript
// ❌ 問題のある設定
{ centerContent: true, maxWidth: undefined }

// ✅ 正しい設定
{ centerContent: true, maxWidth: '375px' }
```

**Q2: モバイルヘッダーが表示されない**
```typescript
// 原因確認
console.log('isMobile:', isMobile);
console.log('mobileHeaders:', layoutConfig.mobileHeaders);

// ✅ 正しい設定
mobileHeaders: {
  showApp: true,
  showBlog: true,
}
```

**Q3: パディングが適用されない**
```typescript
// ❌ 無効な値
contentPadding: {
  mobile: 'padding-4', // Tailwindクラス名が間違い
}

// ✅ 正しい値
contentPadding: {
  mobile: 'px-4 py-0', // 正しいTailwindクラス
}
```

このLayoutConfig仕様書に従って設定を行うことで、柔軟で一貫性のあるレイアウト制御を実現できます。