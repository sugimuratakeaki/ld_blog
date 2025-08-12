import React from 'react';
import { MainLayout } from '../../templates';
import { Text } from '../../atoms';

interface NotFoundPageProps {
  isMobile?: boolean;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ isMobile = false }) => {
  const content = (
    <>
      {/* Main Content */}
      <div className={`bg-[#ffffff] box-border content-stretch flex flex-col gap-8 items-start justify-start px-4 py-12 relative shrink-0 ${isMobile ? 'w-[375px]' : 'w-[1280px]'}`}>
        <div
          aria-hidden="true"
          className="absolute border-[0px_0px_1px] border-solid border-zinc-200 bottom-[-0.5px] left-0 pointer-events-none right-0 top-0"
        />
        <div className="box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 w-full">
          <Text 
            variant="heading-lg" 
            color="primary" 
            align="center" 
            className="w-full"
          >
            お探しのページが見つかりませんでした
          </Text>
          
          <Text variant="body" color="primary" className="h-12 w-full">
            このブログは存在しないか、すでに削除されています。
          </Text>
        </div>
      </div>
      
      {/* Back to Top Button */}
      <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start pb-4 pt-2 px-0 relative shrink-0">
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