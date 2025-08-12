import React, { memo } from 'react';
import { Header, Footer } from '../../organisms';
import { HeaderApp, HeaderBlog } from '../../molecules';
import { LayoutConfig } from '../../../config/layout';
import { useLayoutOptimization } from '../../../hooks/useLayoutOptimization';

interface MainLayoutProps {
  children: React.ReactNode;
  isMobile?: boolean;
  showMobileHeaders?: boolean;
  // New props for enhanced layout control
  config?: Partial<LayoutConfig>;
  className?: string;
}

const MainLayoutComponent: React.FC<MainLayoutProps> = ({ 
  children, 
  isMobile = false,
  showMobileHeaders = true,
  config,
  className = ''
}) => {
  // Use optimized hook for layout calculations
  const { layoutConfig } = useLayoutOptimization({
    isMobile,
    showMobileHeaders,
    config,
  });
  
  if (isMobile) {
    return (
      <div className={`min-h-screen flex flex-col ${className}`}>
        <div className="w-full max-w-[375px] mx-auto flex flex-col min-h-screen">
          {/* Mobile Headers */}
          {showMobileHeaders && (
            <>
              <div className="bg-[#ffffff] box-border flex flex-row gap-2 items-center justify-start px-4 py-2 w-full">
                <HeaderApp />
              </div>
              <div className="bg-neutral-50 box-border flex flex-row items-center justify-between px-4 py-3 w-full">
                <HeaderBlog />
              </div>
            </>
          )}
          
          {/* Main Content - flex-grow to push footer down */}
          <div className={`flex-grow w-full ${layoutConfig.main?.padding === 'none' ? '' : 'p-4'}`}>
            {children}
          </div>
          
          {/* Footer - Always at bottom with AppPromotion always shown */}
          <div className="w-full mt-auto">
            <Footer isMobile={true} showAppPromotion={true} />
          </div>
        </div>
      </div>
    );
  }

  // Desktop Layout
  return (
    <div className={`min-h-screen flex flex-col ${className}`}>
      <div className="w-full flex flex-col min-h-screen items-center">
        {/* Header */}
        <Header isMobile={false} />
        
        {/* Main Content - flex-grow to push footer down */}
        <div className="flex-grow w-full flex flex-col items-center px-0 py-8">
          {children}
        </div>
        
        {/* Footer - Always at bottom with AppPromotion always shown */}
        <div className="w-full mt-auto">
          <Footer isMobile={false} showAppPromotion={true} />
        </div>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const MainLayout = memo(MainLayoutComponent);