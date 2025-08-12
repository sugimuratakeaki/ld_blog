import React from 'react';
import { Button, Text, Image } from '../../atoms';

const APP_ICON_URL = "http://localhost:3845/assets/ab6010e71c8910e6df77545db3008b1f090023f0.png";

export const HeaderApp: React.FC = () => {
  return (
    <div className="box-border content-stretch flex flex-row gap-2 items-center justify-start px-4 py-2 relative size-full">
      <div
        aria-hidden="true"
        className="absolute border-[0px_0px_1px] border-solid border-zinc-200 inset-0 pointer-events-none shadow-[0px_1px_4px_0px_rgba(0,0,0,0.1)]"
      />
      
      <div className="bg-center bg-cover bg-no-repeat relative rounded-md shrink-0 size-8">
        <Image 
          src={APP_ICON_URL}
          alt="ライブドアアプリ"
          className="size-full rounded-md"
        />
        <div
          aria-hidden="true"
          className="absolute border border-solid border-zinc-200 inset-0 pointer-events-none rounded-md"
        />
      </div>
      
      <div className="basis-0 box-border content-stretch flex flex-col gap-1 grow items-start justify-center leading-[0] min-h-px min-w-px not-italic p-0 relative shrink-0 text-left">
        <Text variant="xs-bold" color="primary">
          ライブドア
        </Text>
        <Text variant="xs" color="secondary" className="text-[10px] leading-[14px]">
          ライブドア Appで開く
        </Text>
      </div>
      
      <Button variant="primary" size="medium">
        開く
      </Button>
    </div>
  );
};