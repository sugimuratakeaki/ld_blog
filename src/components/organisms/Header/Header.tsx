import React from 'react';
import { HeaderDesktop, HeaderApp, HeaderBlog } from '../../molecules';
import { HeaderOrganismProps } from '../../../types';

interface HeaderProps extends HeaderOrganismProps {
  // Keep backward compatibility
  isMobile?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ 
  isMobile = false,
  showDesktop = true,
  showMobileApp = false,
  showMobileBlog = false,
  className = ''
}) => {
  if (isMobile) {
    return (
      <div className={`flex flex-col w-full ${className}`}>
        {showMobileApp && (
          <div className="bg-[#ffffff] box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-2 relative shrink-0 w-full">
            <HeaderApp />
          </div>
        )}
        {showMobileBlog && (
          <div className="bg-neutral-50 box-border content-stretch flex flex-row items-center justify-between px-4 py-3 relative shrink-0 w-full">
            <HeaderBlog />
          </div>
        )}
      </div>
    );
  }

  if (!showDesktop) {
    return null;
  }

  return (
    <div className={`bg-[#ffffff] box-border content-stretch flex flex-row items-center justify-between px-8 py-4 relative shrink-0 w-full ${className}`}>
      <HeaderDesktop />
    </div>
  );
};