import React from 'react';
import { clsx } from 'clsx';
import type { BaseComponentProps } from '@/types';

export interface CardProps extends BaseComponentProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  variant = 'default',
  padding = 'md',
  ...props
}) => {
  return (
    <div
      className={clsx(
        'card',
        `card--${variant}`,
        `card--padding-${padding}`,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps extends BaseComponentProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  title,
  subtitle,
  actions,
  ...props
}) => {
  return (
    <div className={clsx('card__header', className)} {...props}>
      <div className="card__header-content">
        {title && <h3 className="card__title">{title}</h3>}
        {subtitle && <p className="card__subtitle">{subtitle}</p>}
        {children}
      </div>
      {actions && <div className="card__actions">{actions}</div>}
    </div>
  );
};

export interface CardBodyProps extends BaseComponentProps {}

export const CardBody: React.FC<CardBodyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx('card__body', className)} {...props}>
      {children}
    </div>
  );
};

export interface CardFooterProps extends BaseComponentProps {}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx('card__footer', className)} {...props}>
      {children}
    </div>
  );
};