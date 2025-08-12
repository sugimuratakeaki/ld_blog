import React from 'react';
import { clsx } from 'clsx';
import type { BaseComponentProps } from '@/types';

export interface BlogHeaderProps extends BaseComponentProps {
  blogTitle?: string;
  blogUrl?: string;
  blogIcon?: string;
  stats?: {
    posts: number;
    comments: number;
    views: number;
  };
  onBlogClick?: () => void;
}

export const BlogHeader: React.FC<BlogHeaderProps> = ({
  className,
  blogTitle = 'マイブログ',
  blogUrl = 'https://blog.example.com',
  blogIcon = '📝',
  stats = {
    posts: 0,
    comments: 0,
    views: 0,
  },
  onBlogClick,
  ...props
}) => {
  const THOUSAND = 1000;
  
  const formatNumber = React.useCallback((num: number): string => {
    if (num >= THOUSAND) {
      return `${(num / THOUSAND).toFixed(1)}k`;
    }
    return num.toString();
  }, []);

  return (
    <div
      className={clsx('blog-header', className)}
      {...props}
    >
      <div className="blog-header-container">
        <div className="blog-header-main">
          <div className="blog-header-info">
            <div className="blog-header-icon">
              {blogIcon}
            </div>
            <div className="blog-header-details">
              <h1 className="blog-header-title">{blogTitle}</h1>
              <a
                href={blogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="blog-header-url"
              >
                {blogUrl.replace(/^https?:\/\//, '')}
              </a>
            </div>
          </div>
          
          <button
            type="button"
            className="blog-header-visit-btn"
            onClick={onBlogClick}
            aria-label={`${blogTitle}のブログを新しいタブで開く`}
          >
            ブログを見る
          </button>
        </div>
        
        <div className="blog-header-stats">
          <div className="blog-stat">
            <span className="blog-stat-value">{formatNumber(stats.posts)}</span>
            <span className="blog-stat-label">記事</span>
          </div>
          <div className="blog-stat">
            <span className="blog-stat-value">{formatNumber(stats.comments)}</span>
            <span className="blog-stat-label">コメント</span>
          </div>
          <div className="blog-stat">
            <span className="blog-stat-value">{formatNumber(stats.views)}</span>
            <span className="blog-stat-label">閲覧数</span>
          </div>
        </div>
      </div>
    </div>
  );
};