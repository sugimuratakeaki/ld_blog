# 実装ガイド

## 開発環境セットアップ

### 必要なツール
- Node.js 18.x以上
- npm 9.x以上
- VSCode（推奨）
- Git

### VSCode拡張機能（推奨）
- ESLint
- Prettier
- TypeScript React code snippets
- SCSS IntelliSense

## コーディング規約

### TypeScript
```typescript
// 1. インターフェース定義
interface ComponentProps {
  // PropsはPascalCase + Props suffix
  required: string;
  optional?: number;
  callback?: () => void;
}

// 2. コンポーネント定義
export const ComponentName: React.FC<ComponentProps> = ({
  required,
  optional = 0,
  callback
}) => {
  // ロジック
  return <div>...</div>;
};

// 3. 型定義
type Status = 'published' | 'draft' | 'scheduled';

// 4. Enum使用（必要な場合のみ）
enum HttpStatus {
  OK = 200,
  NotFound = 404,
}
```

### ファイル命名規則
- コンポーネント: `PascalCase.tsx`
- ユーティリティ: `camelCase.ts`
- 型定義: `types.ts` または `ComponentName.types.ts`
- スタイル: `_component-name.scss`

### ディレクトリ構造
```
component/
├── ComponentName.tsx       # メインコンポーネント
├── ComponentName.types.ts  # 型定義（必要な場合）
├── index.ts               # エクスポート
└── SubComponent.tsx       # サブコンポーネント（必要な場合）
```

## 実装パターン

### 1. レイアウトコンポーネント
```typescript
// components/layout/PageContainer.tsx
import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  description
}) => {
  return (
    <div className="page-container">
      {title && (
        <div className="page-header">
          <h1 className="page-title">{title}</h1>
          {description && (
            <p className="page-description">{description}</p>
          )}
        </div>
      )}
      <div className="page-content">
        {children}
      </div>
    </div>
  );
};
```

### 2. UIコンポーネント
```typescript
// components/ui/Button.tsx
import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  onClick,
  children
}) => {
  const className = `btn btn--${variant} btn--${size}`;
  
  return (
    <button
      className={className}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### 3. ページコンポーネント
```typescript
// pages/Dashboard.tsx
import React, { useState, useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { StatCard } from '../components/features/StatCard';
import { getDashboardStats } from '../data/mockData';

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    // モックデータの取得
    const data = getDashboardStats();
    setStats(data);
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <PageContainer
      title="ダッシュボード"
      description="ブログ管理システムの概要"
    >
      <div className="dashboard-stats">
        <StatCard
          icon="📝"
          label="総記事数"
          value={stats.totalArticles}
          variant="primary"
        />
        {/* 他のStatCard */}
      </div>
    </PageContainer>
  );
};
```

## SCSSの使用方法

### 1. メインスタイルのインポート
```typescript
// main.tsx
import './styles/main.scss';
```

### 2. BEMクラスの適用
```typescript
// BEM: Block__Element--Modifier
<div className="card">
  <div className="card__header">
    <h3 className="card__title card__title--large">Title</h3>
  </div>
  <div className="card__body">
    Content
  </div>
</div>
```

### 3. ユーティリティクラスの使用
```typescript
// 既存のユーティリティクラスを活用
<div className="mb-4 text-center">
  <p className="text-muted">説明文</p>
</div>
```

## モックデータの実装

### 1. データ型定義
```typescript
// data/types.ts
export interface Article {
  id: number;
  title: string;
  content: string;
  status: 'published' | 'draft' | 'scheduled';
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  thumbnail: string;
}
```

### 2. モックデータ生成
```typescript
// data/mockData.ts
import { Article } from './types';

export const generateMockArticles = (count: number): Article[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `サンプル記事 ${i + 1}`,
    content: 'Lorem ipsum...',
    status: ['published', 'draft', 'scheduled'][i % 3] as Article['status'],
    category: 'テクノロジー',
    tags: ['React', 'TypeScript'],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    thumbnail: generatePlaceholderSVG(300, 200, `Image ${i + 1}`)
  }));
};
```

### 3. SVGプレースホルダー
```typescript
// utils/placeholder.ts
export const generatePlaceholderSVG = (
  width: number,
  height: number,
  text?: string
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999">
        ${text || `${width}x${height}`}
      </text>
    </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
};
```

## ルーティング実装

### 1. Router設定
```typescript
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { ArticleList } from './pages/ArticleList';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/new" element={<ArticleEdit />} />
          <Route path="/articles/edit/:id" element={<ArticleEdit />} />
          <Route path="/images" element={<ImageManager />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
```

### 2. ナビゲーション
```typescript
// components/layout/Sidebar.tsx
import { NavLink } from 'react-router-dom';

const menuItems = [
  { path: '/', label: 'ダッシュボード', icon: '📊' },
  { path: '/articles', label: '記事管理', icon: '📝' },
  { path: '/images', label: '画像管理', icon: '🖼️' },
];

export const Sidebar: React.FC = () => {
  return (
    <nav className="sidebar">
      <ul className="sidebar__menu">
        {menuItems.map(item => (
          <li key={item.path}>
            <NavLink 
              to={item.path}
              className={({ isActive }) => 
                `sidebar__link ${isActive ? 'sidebar__link--active' : ''}`
              }
            >
              <span className="sidebar__icon">{item.icon}</span>
              <span className="sidebar__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};
```

## 状態管理

### Context API使用
```typescript
// context/AppContext.tsx
import React, { createContext, useContext, useState } from 'react';

interface AppContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ 
  children 
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <AppContext.Provider value={{ sidebarOpen, toggleSidebar }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};
```

## デバッグとテスト

### 開発サーバー起動
```bash
npm run dev
```

### ビルド
```bash
npm run build
npm run preview  # ビルド結果の確認
```

### チェックリスト
- [ ] 全ページへのナビゲーションが動作
- [ ] レスポンシブデザインの確認（F12開発者ツール）
- [ ] コンソールエラーがないこと
- [ ] SCSSが正しく適用されていること
- [ ] モックデータが表示されること

## トラブルシューティング

### よくある問題と解決方法

1. **SCSSが適用されない**
   - main.scssがmain.tsxでインポートされているか確認
   - クラス名のタイポをチェック

2. **ルーティングが動作しない**
   - BrowserRouterでAppをラップしているか確認
   - パスの先頭に`/`があるか確認

3. **TypeScriptエラー**
   - 型定義が正しいか確認
   - tsconfig.jsonの設定を確認

4. **レイアウトが崩れる**
   - 既存のSCSSクラスを正しく使用しているか確認
   - HTML構造が元のテンプレートと一致しているか確認