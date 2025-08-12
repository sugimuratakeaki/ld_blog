# コンポーネント開発ガイドライン

## 設計原則

### 1. アトミックデザイン

コンポーネントを以下の5つの階層で設計・管理します：

```
┌─────────────────────────────────┐
│         Pages                    │  ← 具体的なページ
├─────────────────────────────────┤
│         Templates                │  ← ページレイアウト
├─────────────────────────────────┤
│         Organisms                │  ← 複雑な機能単位
├─────────────────────────────────┤
│         Molecules                │  ← 単純な複合部品
├─────────────────────────────────┤
│         Atoms                    │  ← 最小単位の部品
└─────────────────────────────────┘
```

#### Atoms (原子)
- 最小単位のUIコンポーネント
- 例: Button, Input, Badge, Icon
- それ以上分解できない基本要素

#### Molecules (分子)
- Atomsを組み合わせた単純な複合コンポーネント
- 例: FormField (Label + Input + Error), SearchBox (Icon + Input)
- 単一の目的を持つ

#### Organisms (有機体)
- MoleculesやAtomsを組み合わせた複雑なコンポーネント
- 例: Header, Sidebar, ArticleCard
- 独立した機能単位

#### Templates (テンプレート)
- ページのレイアウト構造
- 例: DashboardLayout, ArticleLayout
- コンテンツの配置を定義

#### Pages (ページ)
- 実際のコンテンツを含む完成されたページ
- 例: Dashboard, ArticleList, ArticleEdit

## コンポーネント実装規則

### ディレクトリ構造

```
src/components/
├── atoms/
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.types.ts
│   │   ├── Button.test.tsx
│   │   └── index.ts
│   └── ...
├── molecules/
│   ├── FormField/
│   │   ├── FormField.tsx
│   │   ├── FormField.types.ts
│   │   └── index.ts
│   └── ...
├── organisms/
│   ├── Header/
│   │   ├── Header.tsx
│   │   ├── Header.types.ts
│   │   └── index.ts
│   └── ...
└── templates/
    └── ...
```

### 命名規則

#### ファイル名
- コンポーネント: `PascalCase.tsx`
- 型定義: `ComponentName.types.ts`
- テスト: `ComponentName.test.tsx`
- スタイル: コンポーネント内でクラス名を使用

#### コンポーネント名
```typescript
// ✅ Good
export const ButtonComponent: React.FC<ButtonProps> = () => {}
export const FormField: React.FC<FormFieldProps> = () => {}

// ❌ Bad
export const button = () => {}
export const form_field = () => {}
```

#### Props命名
```typescript
// ✅ Good
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
}

// ❌ Bad
interface ButtonProps {
  type?: string; // 曖昧
  click?: Function; // 型が不適切
  isDisabled?: boolean; // 不要なprefix
}
```

## TypeScript規約

### 型定義

```typescript
// Button.types.ts
export interface ButtonProps {
  /** ボタンのバリアント */
  variant?: 'primary' | 'secondary' | 'danger';
  /** ボタンのサイズ */
  size?: 'small' | 'medium' | 'large';
  /** 無効状態 */
  disabled?: boolean;
  /** クリックハンドラー */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** 子要素 */
  children: React.ReactNode;
  /** 追加のクラス名 */
  className?: string;
}
```

### コンポーネント実装

```typescript
// Button.tsx
import React from 'react';
import { ButtonProps } from './Button.types';
import { cn } from '@/utils/classNames';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children,
  className,
}) => {
  const buttonClass = cn(
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    {
      'btn--disabled': disabled,
    },
    className
  );

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

## スタイリング規約

### SCSSクラス命名 (BEM)

```scss
// Block
.card { }

// Block__Element
.card__header { }
.card__body { }
.card__footer { }

// Block--Modifier
.card--clickable { }
.card--compact { }

// Block__Element--Modifier
.card__header--no-border { }
```

### デザイントークンの使用

```scss
// ✅ Good - トークンを使用
.button {
  padding: $spacing-2 $spacing-3;
  font-size: $font-size-base;
  color: $color-text-primary;
  border-radius: $radius-button;
}

// ❌ Bad - ハードコーディング
.button {
  padding: 8px 12px;
  font-size: 16px;
  color: #333;
  border-radius: 4px;
}
```

## コンポーネントパターン

### 1. Compound Components

```typescript
// 複合コンポーネントパターン
const Card = ({ children }) => <div className="card">{children}</div>;
Card.Header = ({ children }) => <div className="card__header">{children}</div>;
Card.Body = ({ children }) => <div className="card__body">{children}</div>;
Card.Footer = ({ children }) => <div className="card__footer">{children}</div>;

// 使用例
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### 2. Render Props

```typescript
interface SearchBoxProps {
  onSearch: (query: string) => void;
  renderSuggestion?: (item: any) => React.ReactNode;
}

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  renderSuggestion = (item) => <div>{item.name}</div>
}) => {
  // 実装
};
```

### 3. Controlled/Uncontrolled

```typescript
// Controlled Component
const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

// Uncontrolled Component with ref
const InputUncontrolled = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return <input ref={ref} {...props} />;
  }
);
```

## アクセシビリティ

### ARIA属性

```typescript
// ✅ Good
<button
  aria-label="削除"
  aria-pressed={isPressed}
  aria-disabled={disabled}
>
  <DeleteIcon />
</button>

// ✅ Good - セマンティックHTML
<nav aria-label="メインナビゲーション">
  <ul role="list">
    <li><a href="/">ホーム</a></li>
  </ul>
</nav>
```

### キーボードナビゲーション

```typescript
const handleKeyDown = (e: React.KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
    case ' ':
      handleClick();
      break;
    case 'Escape':
      handleClose();
      break;
  }
};
```

## パフォーマンス最適化

### メモ化

```typescript
// React.memo
export const ExpensiveComponent = React.memo(({ data }) => {
  // レンダリングコストが高いコンポーネント
});

// useMemo
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

// useCallback
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

### 遅延読み込み

```typescript
// Lazy loading
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// 使用
<Suspense fallback={<Loading />}>
  <HeavyComponent />
</Suspense>
```

## テスト方針

### ユニットテスト

```typescript
// Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Click</Button>);
    
    fireEvent.click(screen.getByText('Click'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});
```

## チェックリスト

### 新規コンポーネント作成時

- [ ] 適切な階層（Atom/Molecule/Organism）に配置
- [ ] TypeScriptの型定義を作成
- [ ] Propsにコメントを記載
- [ ] デフォルト値を設定
- [ ] BEMに従ったクラス名を使用
- [ ] デザイントークンを使用
- [ ] アクセシビリティ属性を追加
- [ ] キーボード操作に対応
- [ ] エラー状態を考慮
- [ ] ローディング状態を考慮
- [ ] レスポンシブ対応
- [ ] エクスポートをindex.tsに追加

### レビュー時の確認事項

- [ ] 単一責任の原則に従っているか
- [ ] 再利用可能な設計になっているか
- [ ] 不要な依存関係がないか
- [ ] パフォーマンスの問題がないか
- [ ] アクセシビリティが考慮されているか
- [ ] 命名規則に従っているか
- [ ] 型定義が適切か
- [ ] エラーハンドリングが適切か