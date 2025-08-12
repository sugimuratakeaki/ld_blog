import React from 'react';
import { TextProps } from '../../../types';

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  color = 'primary',
  children,
  className = '',
  align = 'left'
}) => {
  const variantClasses = {
    'heading-xl': 'font-["Hiragino_Sans:W6",_sans-serif] text-[30px] leading-[36px] font-semibold',
    'heading-lg': 'font-["Hiragino_Sans:W6",_sans-serif] text-[20px] leading-[28px] font-semibold',
    'heading-md': 'font-["Hiragino_Sans:W6",_sans-serif] text-[18px] leading-[28px] font-semibold',
    'body': 'font-["Hiragino_Sans:W3",_sans-serif] text-[16px] leading-[24px] font-light',
    'body-bold': 'font-["Hiragino_Sans:W6",_sans-serif] text-[16px] leading-[24px] font-semibold',
    'small': 'font-["Hiragino_Sans:W3",_sans-serif] text-[14px] leading-[20px] font-light',
    'small-bold': 'font-["Hiragino_Sans:W6",_sans-serif] text-[14px] leading-[20px] font-semibold',
    'xs': 'font-["Hiragino_Sans:W3",_sans-serif] text-[12px] leading-[16px] font-light',
    'xs-bold': 'font-["Hiragino_Sans:W6",_sans-serif] text-[12px] leading-[16px] font-semibold'
  };

  const colorClasses = {
    primary: 'text-zinc-800',
    secondary: 'text-zinc-400',
    white: 'text-white',
    blue: 'text-blue-600'
  };

  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  const classes = `${variantClasses[variant]} ${colorClasses[color]} ${alignClasses[align]} ${className}`;

  return (
    <div className={classes}>
      {typeof children === 'string' ? (
        children.split('\n').map((line, index) => (
          <p key={index} className={index === 0 ? "block" : "block mb-0"}>
            {line}
          </p>
        ))
      ) : (
        children
      )}
    </div>
  );
};