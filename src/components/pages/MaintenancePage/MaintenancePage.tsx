import React from 'react';
import { MainLayout } from '../../templates';
import { Text } from '../../atoms';

interface MaintenancePageProps {
  isMobile?: boolean;
}

export const MaintenancePage: React.FC<MaintenancePageProps> = ({ isMobile = false }) => {
  const content = (
    <>
      {/* Main Content */}
      <div className={`bg-[#ffffff] box-border content-stretch flex flex-col gap-8 items-center justify-start px-0 py-16 relative shrink-0 ${isMobile ? 'w-[375px]' : 'w-[1280px]'}`}>
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
            ただいまメンテナンス中です
          </Text>
          
          <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
            <Text variant="body" color="primary">
              いつもご利用いただきありがとうございます。
            </Text>
            
            <div className="w-full">
              <Text variant="body-bold" color="primary">
                メンテナンス期間
              </Text>
              <Text variant="body-bold" color="primary">
                2024/08/28（月）15:00〜16:30（予定）
              </Text>
            </div>
            
            <Text variant="body" color="primary">
              皆さまにはご不便をおかけし大変申し訳ございませんが、何卒ご理解・ご協力のほどよろしくお願いいたします。
            </Text>
          </div>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start pb-4 pt-2 px-0 relative shrink-0 w-full">
        <div className={`bg-[#ffffff] box-border content-stretch flex flex-col gap-4 items-center justify-start p-[16px] relative shrink-0 ${isMobile ? 'w-[375px]' : 'w-full'}`}>
          <Text variant="small-bold" color="blue" align="center" className="w-full">
            トップに戻る
          </Text>
        </div>
      </div>
    </>
  );

  return (
    <MainLayout isMobile={isMobile} showMobileHeaders={true}>
      {content}
    </MainLayout>
  );
};