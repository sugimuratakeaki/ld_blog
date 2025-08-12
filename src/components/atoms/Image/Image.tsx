import React from 'react';
import { ImageProps } from '../../../types';

export const Image: React.FC<ImageProps> = ({
  src,
  alt = '',
  className = '',
  width,
  height
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={`block max-w-none ${className}`}
      width={width}
      height={height}
    />
  );
};