# コンポーネント仕様書

## コンポーネント体系

### レイヤー構造
```
┌─────────────────────────────────┐
│         Pages (ページ)           │
├─────────────────────────────────┤
│      Features (機能固有)         │
├─────────────────────────────────┤
│         UI (汎用UI)              │
├─────────────────────────────────┤
│       Layout (レイアウト)        │
└─────────────────────────────────┘
```

## Layout Components

### Header
**ファイル**: `components/layout/Header.tsx`
**SCSS**: `layout/_header.scss`
**Props**:
```typescript
interface HeaderProps {
  user?: {
    name: string;
    avatar?: string;
  };
  onMenuToggle?: () => void;
}
```
**機能**:
- ロゴ表示
- 検索バー（モック）
- 通知アイコン
- ユーザーメニュー
- モバイルメニュートグル

### Sidebar
**ファイル**: `components/layout/Sidebar.tsx`
**SCSS**: `layout/_sidebar.scss`
**Props**:
```typescript
interface SidebarProps {
  isOpen: boolean;
  currentPath: string;
}
```
**機能**:
- ナビゲーションメニュー
- アクティブ状態表示
- 折りたたみ対応

### PageContainer
**ファイル**: `components/layout/PageContainer.tsx`
**SCSS**: `layout/_container.scss`
**Props**:
```typescript
interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}
```

## UI Components

### Button
**ファイル**: `components/ui/Button.tsx`
**SCSS**: `components/_button.scss`
**Props**:
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

### Card
**ファイル**: `components/ui/Card.tsx`
**SCSS**: `components/_card.scss`
**Props**:
```typescript
interface CardProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

### Table
**ファイル**: `components/ui/Table.tsx`
**SCSS**: `components/_table.scss`
**Props**:
```typescript
interface TableProps {
  columns: Array<{
    key: string;
    header: string;
    width?: string;
  }>;
  data: Array<Record<string, any>>;
  onRowClick?: (row: any) => void;
}
```

### Form Components
**ファイル**: `components/ui/Form/index.tsx`
**SCSS**: `components/_form.scss`

#### Input
```typescript
interface InputProps {
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}
```

#### Select
```typescript
interface SelectProps {
  options: Array<{ value: string; label: string }>;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

#### TextArea
```typescript
interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  placeholder?: string;
}
```

### Modal
**ファイル**: `components/ui/Modal.tsx`
**SCSS**: `components/_modal.scss`
**Props**:
```typescript
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}
```

### Alert
**ファイル**: `components/ui/Alert.tsx`
**SCSS**: `components/_alert.scss`
**Props**:
```typescript
interface AlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}
```

### Pagination
**ファイル**: `components/ui/Pagination.tsx`
**SCSS**: `components/_pagination.scss`
**Props**:
```typescript
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
```

### Badge
**ファイル**: `components/ui/Badge.tsx`
**SCSS**: `components/_badge.scss`
**Props**:
```typescript
interface BadgeProps {
  variant: 'success' | 'warning' | 'info' | 'danger';
  children: React.ReactNode;
}
```

### Tag
**ファイル**: `components/ui/Tag.tsx`
**SCSS**: `components/_tag.scss`
**Props**:
```typescript
interface TagProps {
  label: string;
  onRemove?: () => void;
  color?: string;
}
```

### Dropdown
**ファイル**: `components/ui/Dropdown.tsx`
**SCSS**: `components/_dropdown.scss`
**Props**:
```typescript
interface DropdownProps {
  trigger: React.ReactNode;
  items: Array<{
    label: string;
    onClick: () => void;
    icon?: React.ReactNode;
  }>;
}
```

## Feature Components

### StatCard
**ファイル**: `components/features/StatCard.tsx`
**用途**: ダッシュボードの統計表示
**Props**:
```typescript
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  variant?: 'primary' | 'success' | 'warning' | 'info';
}
```

### ArticleCard
**ファイル**: `components/features/ArticleCard.tsx`
**用途**: 記事カード表示
**Props**:
```typescript
interface ArticleCardProps {
  id: number;
  title: string;
  excerpt: string;
  thumbnail: string;
  status: 'published' | 'draft' | 'scheduled';
  date: string;
  onClick?: () => void;
}
```

### ActivityItem
**ファイル**: `components/features/ActivityItem.tsx`
**用途**: アクティビティログ表示
**Props**:
```typescript
interface ActivityItemProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  iconClass?: string;
}
```

### ImageCard
**ファイル**: `components/features/ImageCard.tsx`
**用途**: 画像管理画面の画像カード
**Props**:
```typescript
interface ImageCardProps {
  id: string;
  src: string;
  alt: string;
  size: string;
  date: string;
  onSelect?: () => void;
  onDelete?: () => void;
}
```

### Editor
**ファイル**: `components/features/Editor.tsx`
**用途**: 記事編集エディタ（モック）
**Props**:
```typescript
interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}
```

## ページコンポーネント

### Dashboard
**ファイル**: `pages/Dashboard.tsx`
**ルート**: `/`
**使用コンポーネント**:
- PageContainer
- StatCard
- ArticleCard
- ActivityItem

### ArticleList
**ファイル**: `pages/ArticleList.tsx`
**ルート**: `/articles`
**使用コンポーネント**:
- PageContainer
- Table
- Badge
- Pagination
- Button
- Dropdown

### ArticleEdit
**ファイル**: `pages/ArticleEdit.tsx`
**ルート**: `/articles/edit/:id` または `/articles/new`
**使用コンポーネント**:
- PageContainer
- Form components
- Editor
- Tag
- Button
- Card

### ImageManager
**ファイル**: `pages/ImageManager.tsx`
**ルート**: `/images`
**使用コンポーネント**:
- PageContainer
- ImageCard
- Button
- Modal

## 状態管理

### グローバル状態
Context APIを使用して最小限の状態管理:
```typescript
interface AppContext {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  currentUser: {
    name: string;
    avatar?: string;
  };
}
```

### ローカル状態
各ページコンポーネントで管理:
- フォーム入力値
- モーダル開閉状態
- 選択状態
- ページネーション状態

## スタイリング方針

1. **SCSS利用**
   - 既存SCSSファイルのクラス名をそのまま使用
   - BEM命名規則を継承

2. **クラス適用例**
   ```tsx
   <div className="card">
     <div className="card__header">
       <h3 className="card__title">{title}</h3>
     </div>
     <div className="card__body">{children}</div>
   </div>
   ```

3. **レスポンシブ対応**
   - 既存のブレークポイントを使用
   - モバイルファーストアプローチ

## テスト方針

- 単体テストは実装しない（モックのため）
- 手動での動作確認を実施
- ブラウザ互換性テストのみ実施