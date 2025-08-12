import React from 'react';
import { Logo, Button, Text } from '../../atoms';
import { FooterLinks, AppPromotion as AppPromotionMolecule } from '../../molecules';
import { FooterOrganismProps } from '../../../types';

interface FooterProps extends FooterOrganismProps {
  // Keep backward compatibility
  isMobile?: boolean;
}

export const Footer: React.FC<FooterProps> = ({ 
  isMobile = false, 
  showAppPromotion = true,
  className = ''
}) => {
  if (isMobile) {
    return (
      <div className={`box-border content-stretch flex flex-col items-start justify-start pb-0 pt-4 px-0 relative size-full ${className}`}>
        {/* App Promotion Section - conditionally rendered */}
        {showAppPromotion && <AppPromotionMolecule isMobile={true} />}
        
        {/* Footer Links Section */}
        <div className="bg-blue-500 box-border content-stretch flex flex-col gap-2.5 items-center justify-start p-0 relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-col gap-12 items-start justify-center px-4 py-8 relative shrink-0 w-full">
            <div className="box-border content-stretch flex flex-col gap-4 items-start justify-center p-0 relative shrink-0">
              <Logo variant="white" size="large" className="h-[37px] w-56" />
              <div className="box-border content-stretch flex flex-row gap-4 items-start justify-start p-0 relative shrink-0">
                <Button variant="outline" size="medium">
                  管理ページ
                </Button>
              </div>
            </div>
            
            <FooterLinks isMobile={true} />
            
            <Text variant="small" color="white" align="center" className="min-w-full">
              © livedoor
            </Text>
          </div>
        </div>
        
        {/* App Store Disclaimer - only when App Promotion is shown */}
        {showAppPromotion && (
          <div className="box-border content-stretch flex flex-col gap-3 items-center justify-center p-0 relative shrink-0 w-full">
            <Text variant="xs" color="primary" className="text-left w-full px-8">
              ・Apple、Apple ロゴ、iPad、iPhone、iPod touch は米国および他の国々で登録された Apple Inc. の商標です。
              ・App Store は Apple Inc. のサービスマークです。
              ・Google Play は Google Inc. の商標または登録商標です。
            </Text>
          </div>
        )}
      </div>
    );
  }

  // Desktop Footer
  return (
    <div className={className}>
      {/* App Promotion Section - conditionally rendered */}
      {showAppPromotion && (
        <div className="bg-[#ffffff] box-border content-stretch flex flex-row gap-10 items-start justify-center pb-0 pt-[60px] px-0 relative shrink-0 w-full">
          <AppPromotionMolecule isMobile={false} />
        </div>
      )}
      
      {/* Footer Links Section */}
      <div className="bg-blue-500 box-border content-stretch flex flex-col gap-2 items-center justify-start overflow-clip px-0 py-16 relative shrink-0 w-full">
        <div className="box-border content-stretch flex flex-row items-start justify-between p-0 relative shrink-0 w-[1280px]">
          <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0">
            <Logo variant="white" size="large" />
            <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
              <Button variant="outline" size="large">
                管理ページ
              </Button>
            </div>
          </div>
          
          <FooterLinks isMobile={false} />
        </div>
      </div>
    </div>
  );
};