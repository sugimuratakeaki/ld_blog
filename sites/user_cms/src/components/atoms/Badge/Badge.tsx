import React from 'react';
import { clsx } from 'clsx';
import type { BaseComponentProps } from '@/types';

export interface BadgeProps extends BaseComponentProps {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}) => {
  return (
    <span
      className={clsx(
        'badge',
        `badge--${variant}`,
        `badge--${size}`,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};