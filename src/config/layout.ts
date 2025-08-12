/**
 * レイアウト設定システム
 * UI/UXデザイナーとフロントエンド開発者の分析を基に実装
 */

export interface LayoutConfig {
  // コンテンツ配置設定
  centerContent?: boolean;
  maxWidth?: string;
  
  // ヘッダー設定
  header?: {
    variant?: 'default' | 'minimal' | 'blog';
    sticky?: boolean;
    showAppPromotion?: boolean;
  };
  
  // メインコンテンツ設定
  main?: {
    padding?: 'none' | 'small' | 'default' | 'large';
    backgroundColor?: string;
    minHeight?: string;
  };
  
  // フッター設定
  footer?: {
    variant?: 'full' | 'minimal';
    showAppPromotion?: boolean;
  };
  
  // パフォーマンス設定
  optimization?: {
    enableMemo?: boolean;
    lazyLoad?: boolean;
    preloadImages?: boolean;
  };
}

/**
 * デスクトップ向けデフォルト設定
 */
export const defaultDesktopLayoutConfig: LayoutConfig = {
  centerContent: true,
  maxWidth: '1280px',
  header: {
    variant: 'default',
    sticky: false,
    showAppPromotion: false,
  },
  main: {
    padding: 'default',
    backgroundColor: '#f3f3f3',
    minHeight: '60vh',
  },
  footer: {
    variant: 'full',
    showAppPromotion: true,
  },
  optimization: {
    enableMemo: true,
    lazyLoad: true,
    preloadImages: false,
  },
};

/**
 * モバイル向けデフォルト設定（改善版）
 * UI/UXの分析結果：センタリング対応
 */
export const defaultMobileLayoutConfig: LayoutConfig = {
  centerContent: true, // 🎯 重要：左寄せから中央寄せに変更
  maxWidth: '375px',
  header: {
    variant: 'minimal',
    sticky: true,
    showAppPromotion: true,
  },
  main: {
    padding: 'small',
    backgroundColor: '#f3f3f3',
    minHeight: '70vh',
  },
  footer: {
    variant: 'full',
    showAppPromotion: false, // AppPromotionは独立organisms化
  },
  optimization: {
    enableMemo: true,
    lazyLoad: true,
    preloadImages: true, // モバイルでは画像プリロード有効
  },
};

/**
 * ブログページ専用設定のプリセット
 */
export const blogPageLayoutConfigs = {
  blogTop: {
    centerContent: true,
    maxWidth: '375px',
    main: { padding: 'none' },
    footer: { showAppPromotion: false },
  },
  articleDetail: {
    centerContent: true,
    maxWidth: '375px',
    main: { padding: 'small' },
    header: { showAppPromotion: false },
  },
  tagList: {
    centerContent: true,
    maxWidth: '375px',
    main: { padding: 'default' },
  },
  archive: {
    centerContent: true,
    maxWidth: '375px',
    main: { padding: 'default' },
  },
  comments: {
    centerContent: true,
    maxWidth: '375px',
    main: { padding: 'small' },
  },
} as const;

/**
 * 設定をマージするユーティリティ関数
 */
export const mergeLayoutConfig = (
  baseConfig: LayoutConfig,
  customConfig?: Partial<LayoutConfig>
): LayoutConfig => {
  if (!customConfig) return baseConfig;
  
  return {
    ...baseConfig,
    ...customConfig,
    header: {
      ...baseConfig.header,
      ...customConfig.header,
    },
    main: {
      ...baseConfig.main,
      ...customConfig.main,
    },
    footer: {
      ...baseConfig.footer,
      ...customConfig.footer,
    },
    optimization: {
      ...baseConfig.optimization,
      ...customConfig.optimization,
    },
  };
};

/**
 * デバイス別のデフォルト設定を取得
 */
export const getDefaultLayoutConfig = (isMobile: boolean): LayoutConfig => {
  return isMobile ? defaultMobileLayoutConfig : defaultDesktopLayoutConfig;
};

/**
 * CSS クラス生成ユーティリティ
 */
export const generateLayoutClasses = (config: LayoutConfig, isMobile: boolean) => {
  const baseClasses = 'box-border content-stretch flex flex-col relative w-full min-h-screen';
  
  // センタリング設定（UI/UXの改善提案を反映）
  const alignmentClasses = config.centerContent 
    ? 'items-center justify-start' 
    : 'items-start justify-start';
  
  // 最大幅設定 - 静的クラスを使用
  let maxWidthClass = '';
  if (config.maxWidth === '375px') {
    maxWidthClass = 'max-w-[375px]';
  } else if (config.maxWidth === '1280px') {
    maxWidthClass = 'max-w-[1280px]';
  }
  
  // 背景色設定 - 静的クラスを使用
  const bgClass = 'bg-gray-100'; // #f3f3f3 の代替
  
  return {
    container: `${baseClasses} ${alignmentClasses} ${bgClass}`,
    content: `w-full ${maxWidthClass} ${isMobile ? 'min-h-screen' : 'min-h-full'}`,
    main: generateMainClasses(config.main),
  };
};

/**
 * メインコンテンツ用CSSクラス生成
 */
const generateMainClasses = (mainConfig?: LayoutConfig['main']) => {
  const paddingMap = {
    none: 'p-0',
    small: 'p-2',
    default: 'p-4',
    large: 'p-8',
  };
  
  const padding = paddingMap[mainConfig?.padding || 'default'];
  // 静的な最小高さクラスを使用
  let minHeight = '';
  if (mainConfig?.minHeight === '60vh') {
    minHeight = 'min-h-[60vh]';
  } else if (mainConfig?.minHeight === '70vh') {
    minHeight = 'min-h-[70vh]';
  }
  
  return `flex-1 w-full ${padding} ${minHeight}`.trim();
};