import React from 'react';
import { Text } from '../../atoms';

interface FooterLinksProps {
  isMobile?: boolean;
}

const FOOTER_LINKS = {
  column1: [
    'ライブドアブログとは',
    'ガイドライン',
    'ヘルプ'
  ],
  column2: [
    '利用規約',
    'プライバシーポリシー'
  ],
  column3: [
    '運営会社',
    '採用情報'
  ]
};

export const FooterLinks: React.FC<FooterLinksProps> = ({ isMobile = false }) => {
  if (isMobile) {
    // Mobile: Single column layout
    const allLinks = [...FOOTER_LINKS.column1, ...FOOTER_LINKS.column2, ...FOOTER_LINKS.column3];
    
    return (
      <div className="box-border content-stretch flex flex-col font-['Hiragino_Sans:W3',_sans-serif] gap-3 items-start justify-center leading-[0] not-italic p-0 relative shrink-0 text-[#ffffff] text-[14px] text-left text-nowrap w-full">
        {allLinks.map((link, index) => (
          <div key={index} className="relative shrink-0">
            <Text variant="small" color="white">
              {link}
            </Text>
          </div>
        ))}
      </div>
    );
  }

  // Desktop: Three column layout
  return (
    <div className="basis-0 box-border content-stretch flex flex-row gap-8 grow items-start justify-start max-w-[768px] min-h-px min-w-px p-0 relative shrink-0">
      {/* Column 1 */}
      <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
        {FOOTER_LINKS.column1.map((link, index) => (
          <div key={index} className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center p-0 relative shrink-0">
            <Text variant="small" color="white">
              {link}
            </Text>
          </div>
        ))}
      </div>
      
      {/* Column 2 */}
      <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
        {FOOTER_LINKS.column2.map((link, index) => (
          <div key={index} className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center p-0 relative shrink-0">
            <Text variant="small" color="white">
              {link}
            </Text>
          </div>
        ))}
      </div>
      
      {/* Column 3 */}
      <div className="basis-0 box-border content-stretch flex flex-col gap-3 grow items-start justify-center min-h-px min-w-px p-0 relative shrink-0">
        {FOOTER_LINKS.column3.map((link, index) => (
          <div key={index} className="box-border content-stretch flex flex-row gap-2.5 items-start justify-center p-0 relative shrink-0">
            <Text variant="small" color="white">
              {link}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};