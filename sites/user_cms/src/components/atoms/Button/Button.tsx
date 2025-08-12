import React from 'react';
import { clsx } from 'clsx';
import type { BaseComponentProps } from '@/types';

export interface ButtonProps extends BaseComponentProps, Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'className' | 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'white' | 'icon';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  type = 'button',
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={clsx(
        'btn',
        `btn-${variant}`,
        `btn-${size}`,
        {
          'btn-loading': loading,
          'btn-disabled': disabled,
          'btn-block': fullWidth,
        },
        className
      )}
      {...props}
    >
      {loading ? (
        <span className="btn-loading-content">
          <span className="loading-spinner" />
          処理中...
        </span>
      ) : (
        children
      )}
    </button>
  );
};