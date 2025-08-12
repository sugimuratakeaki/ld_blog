import React from 'react';
import { Header } from '@/components/organisms/Header';
import { Sidebar } from '@/components/organisms/Sidebar';
import { BlogHeader } from '@/components/organisms/BlogHeader';
import { Footer } from '@/components/organisms/Footer';
import type { BaseComponentProps, NavItem } from '@/types';

export interface LayoutProps extends BaseComponentProps {
  title?: string;
  user?: {
    name: string;
    avatar?: string;
  };
  sidebarCollapsed?: boolean;
  onSidebarToggle?: () => void;
  onUserClick?: () => void;
  blog?: {
    title: string;
    url: string;
    icon?: string;
    stats?: {
      posts: number;
      comments: number;
      views: number;
    };
  };
  showBlogHeader?: boolean;
  onBlogClick?: () => void;
}

const navigationItems: NavItem[] = [
  {
    id: 'dashboard',
    label: '管理トップ',
    path: '/',
    icon: '🏠',
  },
  {
    id: 'article-edit',
    label: '記事を書く',
    path: '/articles/new',
    icon: '✏️',
  },
  {
    id: 'article-list',
    label: '記事一覧',
    path: '/articles',
    icon: '📝',
    children: [
      {
        id: 'categories',
        label: 'カテゴリ管理',
        path: '/categories',
      },
      {
        id: 'tags',
        label: 'タグ管理',
        path: '/tags',
      },
    ],
  },
  {
    id: 'image-manager',
    label: '画像管理',
    path: '/images',
    icon: '🖼️',
    children: [
      {
        id: 'folders',
        label: 'フォルダ管理',
        path: '/images/folders',
      },
    ],
  },
  {
    id: 'comments',
    label: 'コメント',
    path: '/comments',
    icon: '💬',
  },
  {
    id: 'analytics',
    label: 'アクセス解析',
    path: '/analytics',
    icon: '📊',
  },
  {
    id: 'design',
    label: 'デザイン',
    path: '/design',
    icon: '🎨',
  },
  {
    id: 'settings',
    label: '設定・管理',
    path: '/settings',
    icon: '⚙️',
  },
  {
    id: 'notifications',
    label: '重要なお知らせ',
    path: '/notifications',
    icon: '📢',
  },
];

const DEFAULT_USER = { name: 'ユーザー' };
const DEFAULT_BLOG = {
  title: 'マイブログ',
  url: 'https://blog.livedoor.jp/example',
  icon: '📝',
  stats: {
    posts: 42,
    comments: 128,
    views: 5432,
  },
};

export const Layout: React.FC<LayoutProps> = ({
  children,
  className,
  title,
  user = DEFAULT_USER,
  sidebarCollapsed = false,
  onSidebarToggle,
  onUserClick,
  blog = DEFAULT_BLOG,
  showBlogHeader = true,
  onBlogClick,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(sidebarCollapsed);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
    onSidebarToggle?.();
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Header */}
      <Header
        title={title}
        user={user}
        onMenuClick={handleMobileMenuToggle}
        onUserClick={onUserClick}
      />

      {/* Blog Header Section */}
      {showBlogHeader && (
        <BlogHeader
          blogTitle={blog.title}
          blogUrl={blog.url}
          blogIcon={blog.icon}
          stats={blog.stats}
          onBlogClick={onBlogClick}
        />
      )}

      <div className="app-container">
        {/* Sidebar */}
        <Sidebar
          items={navigationItems}
          collapsed={isSidebarCollapsed}
          onItemClick={() => setIsMobileMenuOpen(false)}
        />

        {/* SP Menu Overlay */}
        {isMobileMenuOpen && (
          <div
            className="sp-menu-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main Content */}
        <main className="main-content">
          <div className="main-container">
            {children}
          </div>

          {/* Footer */}
          <Footer />
        </main>
      </div>

      {/* Desktop Sidebar Toggle */}
      <button
        type="button"
        className="sidebar-toggle"
        onClick={handleSidebarToggle}
        aria-label={isSidebarCollapsed ? 'サイドバーを展開' : 'サイドバーを閉じる'}
        style={{
          position: 'fixed',
          bottom: '2rem',
          left: isSidebarCollapsed ? '64px' : '260px', // px値で統一
          width: '3.2rem',
          height: '3.2rem',
          borderRadius: '50%',
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'left 0.3s ease',
          zIndex: 1001,
        }}
      >
        {isSidebarCollapsed ? '▶' : '◀'}
      </button>
    </>
  );
};