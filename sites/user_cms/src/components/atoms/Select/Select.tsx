import React from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectOption[];
  label?: string;
  error?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const Select: React.FC<SelectProps> = ({
  options,
  label,
  error,
  size = 'md',
  fullWidth = false,
  className = '',
  id,
  required,
  ...rest
}) => {
  const selectId = id || `select-${Math.random().toString(36).substr(2, 9)}`;
  
  const sizeClasses = {
    sm: 'form-select-sm',
    md: '',
    lg: 'form-select-lg',
  };

  return (
    <div className={`form-group ${fullWidth ? 'form-group-full' : ''}`}>
      {label && (
        <label htmlFor={selectId} className="form-label">
          {label}
          {required && <span className="form-required">*</span>}
        </label>
      )}
      <select
        id={selectId}
        className={`form-select ${sizeClasses[size]} ${error ? 'form-select-error' : ''} ${className}`}
        {...rest}
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="form-error">{error}</span>}
    </div>
  );
};