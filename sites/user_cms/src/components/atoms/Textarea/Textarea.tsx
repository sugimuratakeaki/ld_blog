import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  id,
  required,
  ...rest
}) => {
  const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={`form-group ${fullWidth ? 'form-group-full' : ''}`}>
      {label && (
        <label htmlFor={textareaId} className="form-label">
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}
      <textarea
        id={textareaId}
        className={`form-textarea ${error ? 'form-textarea-error' : ''} ${className}`}
        {...rest}
      />
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};