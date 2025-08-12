# スタイルガイド

## デザインシステム概要

本プロジェクトでは、一貫性のあるUIを実現するため、デザイントークンベースのスタイルシステムを採用しています。

## デザイントークン

### カラーシステム

#### プリミティブカラー

| トークン名 | 値 | 用途 |
|-----------|-----|------|
| `$color-brand-primary` | #0096EF | ブランドカラー |
| `$color-brand-primary-dark` | #0077BF | ホバー時 |
| `$color-brand-primary-darker` | #005A8F | アクティブ時 |
| `$color-brand-primary-light` | #DFEEF7 | 背景色 |

#### セマンティックカラー

| 状態 | 背景色 | テキスト色 | ボーダー色 |
|------|--------|-----------|-----------|
| Success | `$color-semantic-success-light` | `$color-semantic-success` | `$color-semantic-success` |
| Warning | `$color-semantic-warning-light` | `$color-semantic-warning` | `$color-semantic-warning` |
| Error | `$color-semantic-error-light` | `$color-semantic-error` | `$color-semantic-error` |
| Info | `$color-semantic-info-light` | `$color-semantic-info` | `$color-semantic-info` |

#### ニュートラルカラー

```scss
// グレースケール
$color-neutral-0:    #FFFFFF  // 白
$color-neutral-50:   #F6F8FA  // 最も薄いグレー
$color-neutral-100:  #F1F5F9
$color-neutral-200:  #E5E7EB
$color-neutral-300:  #D1D5DB
$color-neutral-400:  #C0C0C0
$color-neutral-500:  #A0A0A0
$color-neutral-600:  #6B7280
$color-neutral-700:  #334155
$color-neutral-800:  #1E3050
$color-neutral-900:  #0F172A  // 最も濃いグレー
```

### タイポグラフィ

#### フォントサイズ

| トークン | サイズ | 用途 |
|---------|--------|------|
| `$font-size-2xs` | 10px | キャプション最小 |
| `$font-size-xs` | 12px | キャプション |
| `$font-size-sm` | 14px | 補助テキスト |
| `$font-size-base` | 16px | 本文（基準） |
| `$font-size-lg` | 18px | 強調テキスト |
| `$font-size-xl` | 20px | 小見出し |
| `$font-size-2xl` | 24px | 見出し3 |
| `$font-size-3xl` | 30px | 見出し2 |
| `$font-size-4xl` | 36px | 見出し1 |

#### フォントウェイト

```scss
$font-weight-regular:  400  // 通常
$font-weight-medium:   500  // やや太い
$font-weight-semibold: 600  // 半太字
$font-weight-bold:     700  // 太字
```

#### 行間

```scss
$line-height-tight:    1.25  // 詰まった行間
$line-height-normal:   1.5   // 通常
$line-height-relaxed:  1.625 // ゆったり
$line-height-loose:    1.75  // より広い
```

### スペーシング

#### 8pxグリッドシステム

| トークン | サイズ | ピクセル |
|---------|--------|----------|
| `$spacing-0` | 0 | 0px |
| `$spacing-0-5` | 0.5単位 | 4px |
| `$spacing-1` | 1単位 | 8px |
| `$spacing-1-5` | 1.5単位 | 12px |
| `$spacing-2` | 2単位 | 16px |
| `$spacing-3` | 3単位 | 24px |
| `$spacing-4` | 4単位 | 32px |
| `$spacing-5` | 5単位 | 40px |
| `$spacing-6` | 6単位 | 48px |
| `$spacing-8` | 8単位 | 64px |
| `$spacing-10` | 10単位 | 80px |

### エフェクト

#### 角丸

```scss
$radius-sm:   2px   // 小さい角丸
$radius-base: 4px   // 基本
$radius-md:   6px   // 中間
$radius-lg:   8px   // 大きい
$radius-xl:   12px  // より大きい
$radius-full: 9999px // 完全な円
```

#### 影

```scss
$shadow-xs:   軽い影
$shadow-sm:   小さい影
$shadow-base: 基本の影
$shadow-md:   中間の影
$shadow-lg:   大きい影
$shadow-xl:   より大きい影
```

## コンポーネントスタイル

### ボタン

```scss
// 基本構造
.btn {
  padding: $spacing-1-5 $spacing-3;
  font-size: $font-size-base;
  border-radius: $radius-button;
}

// バリアント
.btn--primary { }   // プライマリーボタン
.btn--secondary { } // セカンダリーボタン
.btn--danger { }    // 危険なアクション
.btn--ghost { }     // ゴーストボタン

// サイズ
.btn--small { }     // 小サイズ
.btn--medium { }    // 中サイズ（デフォルト）
.btn--large { }     // 大サイズ
```

### フォーム要素

```scss
// 入力フィールド
.input {
  padding: $padding-input-y $padding-input-x;
  border: $border-default;
  border-radius: $radius-input;
  
  &:focus {
    border-color: $color-border-focus;
    box-shadow: 0 0 0 3px rgba($color-brand-primary, 0.1);
  }
}

// エラー状態
.input--error {
  border-color: $color-border-error;
}
```

### カード

```scss
.card {
  padding: $padding-card;
  background: $color-bg-primary;
  border: $border-default;
  border-radius: $radius-card;
  box-shadow: $shadow-card;
}
```

## レイアウトパターン

### コンテナ

```scss
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 $container-padding-mobile;
  
  @include tablet {
    padding: 0 $container-padding-tablet;
  }
  
  @include pc {
    padding: 0 $container-padding-desktop;
  }
}
```

### グリッド

```scss
.grid {
  display: grid;
  gap: $grid-gap-mobile;
  
  &--cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }
  
  &--cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @include tablet {
    gap: $grid-gap-tablet;
  }
  
  @include pc {
    gap: $grid-gap-desktop;
  }
}
```

### フレックスボックス

```scss
// ユーティリティ
.flex { display: flex; }
.flex-col { flex-direction: column; }
.flex-wrap { flex-wrap: wrap; }

// 配置
.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.items-end { align-items: flex-end; }

.justify-start { justify-content: flex-start; }
.justify-center { justify-content: center; }
.justify-end { justify-content: flex-end; }
.justify-between { justify-content: space-between; }
```

## レスポンシブデザイン

### ブレークポイント

| ブレークポイント | 値 | デバイス |
|-----------------|-----|----------|
| `$breakpoint-sp` | 767px | スマートフォン |
| `$breakpoint-tablet` | 768px | タブレット |
| `$breakpoint-pc` | 1024px | PC |
| `$breakpoint-wide` | 1440px | ワイドスクリーン |

### メディアクエリ Mixin

```scss
// スマートフォン
@include sp {
  // 767px以下
}

// タブレット
@include tablet {
  // 768px〜1023px
}

// PC
@include pc {
  // 1024px以上
}

// カスタム
@include max-width(900px) {
  // 900px以下
}

@include between(768px, 1200px) {
  // 768px〜1200px
}
```

## ユーティリティクラス

### マージン・パディング

```scss
// マージン
.m-0  { margin: 0; }
.m-1  { margin: $spacing-1; }
.m-2  { margin: $spacing-2; }
.mt-2 { margin-top: $spacing-2; }
.mb-3 { margin-bottom: $spacing-3; }
.mx-4 { margin-left: $spacing-4; margin-right: $spacing-4; }
.my-2 { margin-top: $spacing-2; margin-bottom: $spacing-2; }

// パディング
.p-0  { padding: 0; }
.p-2  { padding: $spacing-2; }
.px-3 { padding-left: $spacing-3; padding-right: $spacing-3; }
.py-2 { padding-top: $spacing-2; padding-bottom: $spacing-2; }
```

### テキスト

```scss
// サイズ
.text-xs { font-size: $font-size-xs; }
.text-sm { font-size: $font-size-sm; }
.text-base { font-size: $font-size-base; }
.text-lg { font-size: $font-size-lg; }

// ウェイト
.font-normal { font-weight: $font-weight-regular; }
.font-medium { font-weight: $font-weight-medium; }
.font-bold { font-weight: $font-weight-bold; }

// 配置
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; }

// 色
.text-primary { color: $color-text-primary; }
.text-secondary { color: $color-text-secondary; }
.text-muted { color: $color-text-tertiary; }
```

### 表示

```scss
.hidden { display: none; }
.block { display: block; }
.inline-block { display: inline-block; }
.flex { display: flex; }
.inline-flex { display: inline-flex; }
.grid { display: grid; }

// レスポンシブ表示
.sp-only {
  @include pc { display: none; }
}

.pc-only {
  @include sp { display: none; }
}
```

## アニメーション

### トランジション

```scss
// 期間
$duration-fast: 150ms
$duration-base: 250ms
$duration-slow: 350ms

// イージング
$ease-in-out: cubic-bezier(0.4, 0, 0.2, 1)

// プリセット
.transition-all { transition: $transition-all; }
.transition-colors { transition: $transition-colors; }
.transition-opacity { transition: $transition-opacity; }
.transition-transform { transition: $transition-transform; }
```

### キーフレーム

```scss
// フェードイン
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

// スライドイン
@keyframes slideInUp {
  from {
    transform: translateY(100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

// 回転
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

## ベストプラクティス

### Do's ✅

1. **デザイントークンを使用**
   ```scss
   color: $color-text-primary;
   padding: $spacing-2;
   ```

2. **BEM命名規則に従う**
   ```scss
   .card__header--highlighted { }
   ```

3. **レスポンシブファースト**
   ```scss
   // モバイルスタイルをベースに
   .element { width: 100%; }
   
   @include pc {
     .element { width: 50%; }
   }
   ```

4. **再利用可能なMixinを活用**
   ```scss
   @include flex-center;
   @include truncate;
   ```

### Don'ts ❌

1. **ハードコーディングを避ける**
   ```scss
   // Bad
   padding: 16px;
   color: #333;
   
   // Good
   padding: $spacing-2;
   color: $color-text-primary;
   ```

2. **深いネストを避ける（3階層まで）**
   ```scss
   // Bad
   .card {
     .header {
       .title {
         .icon { } // 4階層
       }
     }
   }
   ```

3. **!importantの濫用を避ける**
   ```scss
   // 本当に必要な場合のみ使用
   ```

## デバッグツール

### デザイントークン確認

```scss
// デバッグモードを有効にする
$debug-tokens: true;

// ブラウザのDevToolsで確認
.debug-tokens {
  --debug-primary: #{$color-brand-primary};
  --debug-spacing: #{$spacing-unit};
}
```

### グリッドオーバーレイ

```scss
.debug-grid {
  background-image: repeating-linear-gradient(
    0deg,
    rgba(255, 0, 0, 0.1),
    rgba(255, 0, 0, 0.1) 8px,
    transparent 8px,
    transparent 16px
  );
}
```