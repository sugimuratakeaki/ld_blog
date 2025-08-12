import React from 'react';
import { clsx } from 'clsx';
import { NavLink } from 'react-router-dom';
import type { BaseComponentProps, NavItem } from '@/types';

export interface SidebarProps extends BaseComponentProps {
  items: NavItem[];
  collapsed?: boolean;
  onItemClick?: (item: NavItem) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  className,
  items,
  collapsed = false,
  onItemClick,
  ...props
}) => {
  return (
    <aside
      className={clsx(
        'sidebar',
        {
          'collapsed': collapsed,
        },
        className
      )}
      {...props}
    >
      <div className="sidebar-content">
        <nav className="sidebar-nav">
          <div className="sidebar-section">
            <ul>
          {items.map((item) => (
            <SidebarItem
              key={item.id}
              item={item}
              collapsed={collapsed}
              onItemClick={onItemClick}
            />
          ))}
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
};

interface SidebarItemProps {
  item: NavItem;
  collapsed: boolean;
  onItemClick?: (item: NavItem) => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  collapsed,
  onItemClick,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
    onItemClick?.(item);
  };

  return (
    <li>
      {hasChildren ? (
        <button
          type="button"
          className={clsx('sidebar-item', {
            'active': isOpen,
          })}
          onClick={handleClick}
        >
          <span>
            {item.icon && <span className="sidebar-item-icon">{item.icon}</span>}
            {!collapsed && (
              <>
                <span className="sidebar-item-text">{item.label}</span>
                {item.badge && (
                  <span className="sidebar-badge">{item.badge}</span>
                )}
                <span className="sidebar-expand-icon">
                  {isOpen ? '▼' : '▶'}
                </span>
              </>
            )}
          </span>
        </button>
      ) : (
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            clsx('sidebar-item', {
              'active': isActive,
            })
          }
          onClick={() => onItemClick?.(item)}
        >
          <span>
            {item.icon && <span className="sidebar-item-icon">{item.icon}</span>}
            {!collapsed && (
              <>
                <span className="sidebar-item-text">{item.label}</span>
                {item.badge && (
                  <span className="sidebar-badge">{item.badge}</span>
                )}
              </>
            )}
          </span>
        </NavLink>
      )}

      {hasChildren && isOpen && !collapsed && (
        <ul className="sidebar-submenu">
          {item.children!.map((child) => (
            <li key={child.id}>
              <NavLink
                to={child.path}
                className={({ isActive }) =>
                  clsx('sidebar-item', 'sidebar-item-indent', {
                    'active': isActive,
                  })
                }
                onClick={() => onItemClick?.(child)}
              >
                <span>
                  {child.icon && (
                    <span className="sidebar-item-icon">{child.icon}</span>
                  )}
                  <span className="sidebar-item-text">{child.label}</span>
                  {child.badge && (
                    <span className="sidebar-badge">{child.badge}</span>
                  )}
                </span>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
};