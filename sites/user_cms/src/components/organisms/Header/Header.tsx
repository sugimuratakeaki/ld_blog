import React from 'react';
import { clsx } from 'clsx';
import type { BaseComponentProps } from '@/types';

export interface HeaderProps extends BaseComponentProps {
  title?: string;
  user?: {
    name: string;
    avatar?: string;
  };
  onMenuClick?: () => void;
  onUserClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  className,
  title = 'ライブドアブログCMS',
  user,
  onMenuClick,
  onUserClick,
  ...props
}) => {
  return (
    <header className={clsx('header', className)} {...props}>
      <div className="header-content">
        <div className="header-left">
          <button
            type="button"
            className="header-menu-toggle"
            onClick={onMenuClick}
            aria-label="メニューを開く"
          >
            <div className="hamburger">
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
              <span className="hamburger-line"></span>
            </div>
          </button>
          <a href="/" className="header-logo">
            <span>{title}</span>
          </a>
        </div>

        <div className="header-right">
          {user && (
            <div className="header-user" onClick={onUserClick}>
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="header-user-avatar"
                />
              ) : (
                <div className="header-user-avatar">
                  {user.name.charAt(0)}
                </div>
              )}
              <span className="header-user-name">{user.name}</span>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};