import React from 'react';
import { LogoProps } from '../../../types';

const LOGO_URLS = {
  default: "http://localhost:3845/assets/0d719a444d147dd8170e7530baa8345682adacce.svg",
  white: "http://localhost:3845/assets/6c5a9b5ed1151343e295e675ce05f53b84f6b78f.svg",
  mobile: "http://localhost:3845/assets/0433e7bfa10a8bf0b0cdd0230d3379182374126b.svg",
  mobile_white: "http://localhost:3845/assets/502ab9723153a74eb761ba92c5f750e4800bbb4c.svg"
};

export const Logo: React.FC<LogoProps> = ({
  variant = 'default',
  size = 'medium',
  className = ''
}) => {
  const sizeClasses = {
    small: 'h-[19px] w-28', // Mobile size
    medium: 'h-8 w-48', // Desktop size
    large: 'h-[53px] w-80' // Footer size
  };

  const logoSrc = variant === 'white' 
    ? (size === 'small' ? LOGO_URLS.mobile_white : LOGO_URLS.white)
    : (size === 'small' ? LOGO_URLS.mobile : LOGO_URLS.default);

  const classes = `relative shrink-0 ${sizeClasses[size]} ${className}`;

  return (
    <div className={classes}>
      <img
        alt="livedoor blog"
        className="block max-w-none size-full"
        src={logoSrc}
      />
    </div>
  );
};