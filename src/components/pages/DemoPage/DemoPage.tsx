import React from 'react';
import { MainLayout } from '../../templates';
import { AppPromotion } from '../../organisms';
import { Text } from '../../atoms';
import { LayoutConfig } from '../../../types';

interface DemoPageProps {
  isMobile?: boolean;
}

export const DemoPage: React.FC<DemoPageProps> = ({ isMobile = false }) => {
  // Example of custom layout configuration
  const customConfig: Partial<LayoutConfig> = {
    centerContent: true,
    maxWidth: '375px',
    footer: {
      showAppPromotion: false, // Hide AppPromotion from Footer to show standalone version
    },
    header: {
      showAppPromotion: true, // Show mobile headers
    },
    main: {
      padding: isMobile ? 'none' : 'default',
    },
  };

  const content = (
    <>
      {/* Demo Content */}
      <div className={`bg-[#ffffff] box-border content-stretch flex flex-col gap-8 items-center justify-start px-0 py-16 relative shrink-0 ${isMobile ? 'w-full' : 'w-[1280px]'}`}>
        <div
          aria-hidden="true"
          className="absolute border-[0px_0px_1px] border-solid border-zinc-200 bottom-[-0.5px] left-0 pointer-events-none right-0 top-0"
        />
        <div className={`box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 ${isMobile ? 'w-full px-4' : 'w-[576px]'}`}>
          <Text 
            variant={isMobile ? "heading-lg" : "heading-xl"} 
            color="primary" 
            align="center" 
            className="w-full"
          >
            新しいレイアウトシステムデモ
          </Text>
          
          <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
            <Text variant="body" color="primary">
              このページでは新しいレイアウト制御システムを実証しています：
            </Text>
            
            <ul className="w-full space-y-2">
              <li>
                <Text variant="body" color="primary">
                  • モバイル版でのセンタリング対応（max-w-[375px] + mx-auto）
                </Text>
              </li>
              <li>
                <Text variant="body" color="primary">
                  • 動的なレイアウト設定システム
                </Text>
              </li>
              <li>
                <Text variant="body" color="primary">
                  • Organismsの独立性（Footer内のAppPromotionを非表示）
                </Text>
              </li>
              <li>
                <Text variant="body" color="primary">
                  • バックワード互換性の維持
                </Text>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Standalone App Promotion */}
      <AppPromotion 
        isMobile={isMobile} 
      />
      
      {/* Back to Top Button */}
      <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start pb-4 pt-2 px-0 relative shrink-0 w-full">
        <div className={`bg-[#ffffff] box-border content-stretch flex flex-col gap-4 items-center justify-start p-[16px] relative shrink-0 ${isMobile ? 'w-full' : 'w-full'}`}>
          <Text variant="small-bold" color="blue" align="center" className="w-full">
            トップに戻る
          </Text>
        </div>
      </div>
    </>
  );

  return (
    <MainLayout isMobile={isMobile} config={customConfig}>
      {content}
    </MainLayout>
  );
};