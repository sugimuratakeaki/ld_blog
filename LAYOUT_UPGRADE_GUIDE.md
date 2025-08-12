# レイアウトシステム アップグレードガイド

## 概要

このガイドでは、UI/UXデザイナーからの改善提案に基づいて実装された新しいレイアウトシステムの使用方法と移行手順について説明します。

## 主な改善点

### 1. SPでのセンタリング対応
- `items-center` + `max-w-[375px] mx-auto` によるコンテンツの中央寄せ
- レスポンシブデザインの改善

### 2. Organisms構造変更
- Header, AppPromotion, Footer を独立したorganisms として分離
- 単一責任原則に従った設計

### 3. 動的レイアウト制御システム
- `LayoutConfig` 型による設定駆動のレイアウト制御
- 既存コードとの完全な互換性維持

## 新機能

### LayoutConfig 型

```typescript
interface LayoutConfig {
  centerContent?: boolean;        // コンテンツのセンタリング
  maxWidth?: string;             // 最大幅の制御
  showHeader?: boolean;          // ヘッダーの表示制御
  showFooter?: boolean;          // フッターの表示制御
  showAppPromotion?: boolean;    // アプリプロモーションの表示制御
  mobileHeaders?: {              // モバイルヘッダーの制御
    showApp?: boolean;
    showBlog?: boolean;
  };
  contentPadding?: {             // コンテンツパディングの制御
    mobile?: string;
    desktop?: string;
  };
  backgroundColor?: string;       // 背景色の制御
}
```

### 改善されたMainLayout

```typescript
interface MainLayoutProps {
  children: React.ReactNode;
  isMobile?: boolean;
  showMobileHeaders?: boolean;  // 既存互換性
  config?: Partial<LayoutConfig>; // 新機能
  className?: string;
}
```

### 独立したAppPromotionOrganism

```typescript
interface AppPromotionOrganismProps {
  isMobile?: boolean;
  variant?: 'standalone' | 'embedded';
  className?: string;
}
```

## 移行手順

### ステップ1: 段階的な導入（推奨）

既存のコードは**変更不要**です。バックワード互換性が完全に保たれています。

```typescript
// 既存コード（そのまま動作）
<MainLayout isMobile={true} showMobileHeaders={true}>
  {content}
</MainLayout>
```

### ステップ2: 新機能の活用

必要に応じて新しい設定システムを活用できます。

```typescript
// 新機能を活用
const customConfig: Partial<LayoutConfig> = {
  centerContent: true,
  maxWidth: '375px',
  showAppPromotion: false,
};

<MainLayout isMobile={true} config={customConfig}>
  {content}
</MainLayout>
```

### ステップ3: 独立したAppPromotionの使用

```typescript
// Footer内のAppPromotionを非表示にして独立版を使用
const config = { showAppPromotion: false };

<MainLayout isMobile={true} config={config}>
  {content}
  <AppPromotionOrganism isMobile={true} variant="standalone" />
</MainLayout>
```

## パフォーマンス最適化

### 実装済み最適化

1. **React.memo**による再レンダリング防止
2. **useMemo**によるレイアウト計算の最適化
3. **useCallback**によるコールバック関数の最適化
4. **CLS対策**のためのCSS最適化

### CLS（Cumulative Layout Shift）対策

```css
/* 自動的に適用される最適化 */
.app-promotion-mobile {
  width: 375px;
  min-height: 400px;
}

.layout-transition {
  transition: max-width 0.3s ease-in-out;
}
```

## 使用例

### 基本的な使用法（既存と同じ）

```typescript
export const MyPage: React.FC<{ isMobile: boolean }> = ({ isMobile }) => (
  <MainLayout isMobile={isMobile}>
    <div>コンテンツ</div>
  </MainLayout>
);
```

### カスタマイズされたレイアウト

```typescript
export const CustomPage: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  const layoutConfig = {
    centerContent: true,
    maxWidth: '375px',
    showHeader: true,
    showFooter: true,
    showAppPromotion: false,
    mobileHeaders: {
      showApp: true,
      showBlog: false,
    },
  };

  return (
    <MainLayout isMobile={isMobile} config={layoutConfig}>
      <div>カスタムコンテンツ</div>
      <AppPromotionOrganism isMobile={isMobile} variant="standalone" />
    </MainLayout>
  );
};
```

### デモページの確認

新機能を確認するには：

1. ブラウザで `http://localhost:8070` にアクセス
2. 右上のセレクトボックスで "Layout Demo" を選択
3. "Mobile" と "Desktop" を切り替えて動作確認

## トラブルシューティング

### よくある問題

**Q: 既存のページが正常に表示されない**
A: バックワード互換性が保たれているため、既存コードは変更不要です。エラーが発生する場合は、importパスを確認してください。

**Q: AppPromotionが重複して表示される**
A: Footer内のAppPromotionを非表示にするには `config={{ showAppPromotion: false }}` を設定してください。

**Q: センタリングが効かない**
A: `config={{ centerContent: true, maxWidth: '375px' }}` が正しく設定されているか確認してください。

## 技術仕様

### ブラウザサポート
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

### パフォーマンス目標
- First Contentful Paint: < 1.5s
- Cumulative Layout Shift: < 0.1
- 再レンダリング回数: 50%削減

## 今後の拡張予定

1. **テーマシステム**の統合
2. **アニメーション**の強化
3. **アクセシビリティ**の向上
4. **PWA対応**の拡張

---

このアップグレードにより、より柔軟で保守性の高いレイアウトシステムが実現されました。既存のコードを変更することなく、段階的に新機能を活用することができます。