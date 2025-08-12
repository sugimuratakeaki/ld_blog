import React from 'react';

export type AlertType = 'success' | 'info' | 'warning' | 'danger';

export interface AlertProps {
  type?: AlertType;
  title?: string;
  message: string;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  type = 'info',
  title,
  message,
  dismissible = false,
  onDismiss,
  className = '',
}) => {
  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'warning':
        return '⚠';
      case 'danger':
        return '✕';
      case 'info':
      default:
        return 'ℹ';
    }
  };

  return (
    <div className={`alert alert-${type} ${className}`} role="alert">
      <div className="alert-icon">
        <span>{getIcon()}</span>
      </div>
      <div className="alert-content">
        {title && <div className="alert-title">{title}</div>}
        <div className="alert-message">{message}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          className="alert-close"
          onClick={onDismiss}
          aria-label="閉じる"
        >
          ×
        </button>
      )}
    </div>
  );
};