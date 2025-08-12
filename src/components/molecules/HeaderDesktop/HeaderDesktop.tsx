import React from 'react';
import { Logo, Button } from '../../atoms';

export const HeaderDesktop: React.FC = () => {
  return (
    <div className="basis-0 box-border content-stretch flex flex-row grow items-center justify-between max-w-[1280px] min-h-px min-w-px p-0 relative shrink-0">
      <Logo variant="default" size="medium" />
      <Button variant="secondary" size="small">
        管理ページ
      </Button>
    </div>
  );
};