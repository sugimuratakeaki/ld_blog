# コードスタイル規約

## TypeScript/React

### ファイル命名規則
```
コンポーネント: PascalCase.tsx    例: Button.tsx, ArticleCard.tsx
型定義:        ComponentName.types.ts
フック:        useCamelCase.ts    例: useAuth.ts, useModal.ts
ユーティリティ: camelCase.ts      例: formatDate.ts, classNames.ts
定数:          UPPER_SNAKE_CASE.ts 例: API_ENDPOINTS.ts
```

### コンポーネント構造
```typescript
// 1. インポート（順序を守る）
import React from 'react';                    // React
import { useNavigate } from 'react-router-dom'; // 外部ライブラリ
import { Button } from '@/components/atoms';   // 内部コンポーネント
import { formatDate } from '@/utils';          // ユーティリティ
import type { ComponentProps } from './Component.types'; // 型定義
import './Component.scss';                     // スタイル

// 2. 型定義
interface LocalState {
  isOpen: boolean;
}

// 3. コンポーネント定義
export const Component: React.FC<ComponentProps> = ({
  prop1,
  prop2 = 'default',
  children,
}) => {
  // 3.1 Hooks
  const [state, setState] = useState<LocalState>({ isOpen: false });
  const navigate = useNavigate();
  
  // 3.2 副作用
  useEffect(() => {
    // 処理
  }, [依存配列]);
  
  // 3.3 ハンドラー
  const handleClick = useCallback(() => {
    // 処理
  }, [依存配列]);
  
  // 3.4 レンダリング
  return (
    <div className="component">
      {children}
    </div>
  );
};

// 4. エクスポート
export default Component;
```

### Props命名規則
```typescript
interface ButtonProps {
  // イベントハンドラー: on + 動詞
  onClick?: () => void;
  onChange?: (value: string) => void;
  
  // 状態: is/has + 形容詞/名詞
  isDisabled?: boolean;
  isLoading?: boolean;
  hasError?: boolean;
  
  // 設定値: 名詞
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  
  // レンダリング関数: render + 名詞
  renderIcon?: () => React.ReactNode;
  
  // 子要素
  children: React.ReactNode;
}
```

## SCSS

### BEM命名規則
```scss
// Block
.article-card { }

// Block__Element
.article-card__header { }
.article-card__body { }
.article-card__footer { }

// Block--Modifier
.article-card--featured { }
.article-card--compact { }

// Block__Element--Modifier
.article-card__header--sticky { }
```

### ネスト規則
```scss
// 最大3階層まで
.component {
  // プロパティ
  padding: $spacing-2;
  
  // 擬似クラス・擬似要素
  &:hover { }
  &::before { }
  
  // 状態修飾子
  &--active { }
  
  // 子要素（BEM）
  &__child {
    // 子要素のプロパティ
    
    // 孫要素は避ける
  }
}
```

### インポート順序
```scss
// 1. 変数・関数・ミックスイン
@import 'variables';
@import 'mixins';

// 2. ベーススタイル
@import 'reset';
@import 'base';

// 3. コンポーネント
@import 'components/button';

// 4. ユーティリティ
@import 'utilities';
```

## Git

### ブランチ命名
```
feature/add-article-editor     # 機能追加
fix/navigation-menu-bug        # バグ修正
refactor/optimize-performance  # リファクタリング
docs/update-readme             # ドキュメント
chore/update-dependencies      # 雑務
```

### コミットメッセージ
```
feat: 記事編集機能を追加
fix: ナビゲーションメニューのバグを修正
refactor: パフォーマンスを最適化
docs: READMEを更新
style: コードフォーマットを修正
test: ユニットテストを追加
chore: 依存関係を更新
```

## 一般原則

### 1. 早期リターン
```typescript
// ❌ 深いネスト
function process(data) {
  if (data) {
    if (data.isValid) {
      // 処理
    }
  }
}

// ✅ 早期リターン
function process(data) {
  if (!data) return;
  if (!data.isValid) return;
  // 処理
}
```

### 2. 単一責任の原則
- 1つのコンポーネント/関数は1つの責任のみ
- 複雑な場合は分割する

### 3. DRY (Don't Repeat Yourself)
- 重複コードは共通化
- ユーティリティ関数やカスタムフックを活用

### 4. 型安全性
- anyは使わない
- unknown を使い、型ガードで絞り込む
- as は最小限に