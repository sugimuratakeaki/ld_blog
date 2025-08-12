import { useMemo } from 'react';
import { 
  LayoutConfig, 
  getDefaultLayoutConfig, 
  mergeLayoutConfig, 
  generateLayoutClasses 
} from '../config/layout';

interface UseLayoutOptimizationProps {
  isMobile: boolean;
  showMobileHeaders?: boolean;
  config?: Partial<LayoutConfig>;
}

interface UseLayoutOptimizationReturn {
  layoutConfig: LayoutConfig;
  getContainerClasses: () => string;
  containerStyle: React.CSSProperties;
}

/**
 * レイアウト最適化フック
 * UI/UXデザイナーの分析結果を基に実装
 * - SPでのセンタリング対応
 * - パフォーマンス最適化
 * - 設定駆動レイアウト
 */
export const useLayoutOptimization = ({
  isMobile,
  showMobileHeaders = true,
  config
}: UseLayoutOptimizationProps): UseLayoutOptimizationReturn => {
  
  // 🎯 重要：デフォルト設定を取得し、カスタム設定をマージ
  const layoutConfig = useMemo(() => {
    const defaultConfig = getDefaultLayoutConfig(isMobile);
    const mergedConfig = mergeLayoutConfig(defaultConfig, config);
    
    // モバイルヘッダー表示設定を反映
    if (isMobile) {
      mergedConfig.header = {
        ...mergedConfig.header,
        showAppPromotion: showMobileHeaders,
      };
    }
    
    return mergedConfig;
  }, [isMobile, showMobileHeaders, config]);

  // CSS クラス生成（メモ化でパフォーマンス最適化）
  const layoutClasses = useMemo(() => {
    return generateLayoutClasses(layoutConfig, isMobile);
  }, [layoutConfig, isMobile]);

  // コンテナクラス取得関数
  const getContainerClasses = useMemo(() => {
    return () => {
      // 🎯 UI/UXの改善提案：SPでのセンタリング対応
      if (isMobile && layoutConfig.centerContent) {
        return `${layoutClasses.container} items-center justify-start`; // 中央寄せ
      }
      return layoutClasses.container;
    };
  }, [layoutClasses.container, isMobile, layoutConfig.centerContent]);

  // スタイルオブジェクト（インライン最適化）
  const containerStyle = useMemo(() => {
    const style: React.CSSProperties = {};
    
    // 背景色設定
    if (layoutConfig.main?.backgroundColor) {
      style.backgroundColor = layoutConfig.main.backgroundColor;
    }
    
    // 最小高さ設定
    if (layoutConfig.main?.minHeight) {
      style.minHeight = layoutConfig.main.minHeight;
    }
    
    // 🎯 SPで375px最大幅設定（センタリング効果）
    if (isMobile && layoutConfig.maxWidth) {
      style.maxWidth = layoutConfig.maxWidth;
      style.margin = '0 auto'; // 中央寄せ
    }
    
    return style;
  }, [
    layoutConfig.main?.backgroundColor,
    layoutConfig.main?.minHeight,
    layoutConfig.maxWidth,
    isMobile
  ]);

  return {
    layoutConfig,
    getContainerClasses,
    containerStyle
  };
};