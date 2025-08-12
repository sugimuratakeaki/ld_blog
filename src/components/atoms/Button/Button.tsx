import React from 'react';
import { ButtonProps } from '../../../types';

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  children,
  onClick,
  className = '',
  disabled = false
}) => {
  const baseClasses = 'box-border content-stretch flex flex-row items-center justify-center relative rounded-full shrink-0 font-["Hiragino_Sans:W6",_sans-serif] leading-[0] not-italic text-left text-nowrap';
  
  const variantClasses = {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-white text-zinc-800 border border-black border-solid',
    outline: 'bg-transparent text-white border border-white border-solid'
  };

  const sizeClasses = {
    small: 'px-6 py-1 text-[12px] leading-[16px]',
    medium: 'px-6 py-1 text-[14px] leading-[20px]',
    large: 'px-8 py-2 text-[14px] leading-[20px]'
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};