import React from 'react';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  error,
  className = '',
  id,
  ...rest
}) => {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className="form-check">
      <input
        type="checkbox"
        id={checkboxId}
        className={`form-checkbox ${error ? 'form-checkbox-error' : ''} ${className}`}
        {...rest}
      />
      {label && (
        <label htmlFor={checkboxId} className="form-check-label">
          {label}
        </label>
      )}
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};