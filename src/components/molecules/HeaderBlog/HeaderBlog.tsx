import React from 'react';
import { Logo, Text } from '../../atoms';

export const HeaderBlog: React.FC = () => {
  return (
    <div className="bg-neutral-50 box-border content-stretch flex flex-row items-center justify-between px-4 py-3 relative size-full">
      <Logo variant="default" size="small" />
      <Text variant="xs" color="primary">
        管理ページ
      </Text>
    </div>
  );
};