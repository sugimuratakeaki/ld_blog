import React, { memo } from 'react';
import { Text, Image } from '../../atoms';
import { AppPromotionOrganismProps } from '../../../types';

const APP_ICON_URL = "http://localhost:3845/assets/ab6010e71c8910e6df77545db3008b1f090023f0.png";
const APP_STORE_BADGE = "http://localhost:3845/assets/aafa56a6390d26d27d5d18103e8690f211b43dd9.png";
const GOOGLE_PLAY_BADGE = "http://localhost:3845/assets/4c9180b20094948ee4e80bd9b18dd80f3070461a.png";
const QR_CODE = "http://localhost:3845/assets/2eb5e4be3858369827e8dbe67dd93c3eec117b7e.png";

const APP_SCREENS = {
  GROUP_2417: "http://localhost:3845/assets/765d9e3d2a69f98d8d1cc4a69c7ef92a0776eb0e.png",
  GROUP_2419: "http://localhost:3845/assets/41f39442706ac141de2f9870686846241f307501.png",
  GROUP_2418: "http://localhost:3845/assets/cf3dd35b764ec084216736b54fd236b596a3d028.png",
  GROUP_2420: "http://localhost:3845/assets/234c8ba2b7bd153a26242ca0c83c8f4e3e4cf349.png"
};

const AppPromotionComponent: React.FC<AppPromotionOrganismProps> = ({ 
  isMobile = false, 
  variant = 'embedded',
  className = ''
}) => {
  const isStandalone = variant === 'standalone';
  
  if (isMobile) {
    const baseClasses = "bg-neutral-50 box-border content-stretch flex flex-col gap-6 items-center justify-center px-8 py-12 relative shrink-0";
    const containerClasses = isStandalone ? 
      `${baseClasses} w-full max-w-[375px] mx-auto` : 
      `${baseClasses} w-[375px]`;

    return (
      <div className={`${containerClasses} ${className}`}>
        <div className="box-border content-stretch flex flex-col gap-6 items-center justify-center p-0 relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-row gap-3.5 items-center justify-start p-0 relative shrink-0 w-full">
            <div className="bg-center bg-cover bg-no-repeat relative rounded-[3.402px] shrink-0 size-[45px]">
              <Image src={APP_ICON_URL} alt="ライブドアアプリ" className="size-full rounded-[3.402px]" />
              <div
                aria-hidden="true"
                className="absolute border-[0.681px] border-solid border-zinc-200 inset-0 pointer-events-none rounded-[3.402px]"
              />
            </div>
            <Text variant="body-bold" color="primary">
              ライブドアアプリ
            </Text>
          </div>
          
          <Text variant="heading-lg" color="primary" align="left" className="min-w-full">
            アプリでフォローして
            お気に入りを追いかけよう！
          </Text>
          
          {/* Mobile App Screenshots */}
          <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
            <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[9.317px] mt-[12.461px] place-items-start relative">
              <div
                className="[grid-area:1_/_1] bg-no-repeat bg-size-[100%_113.21%] bg-top-left h-[198.915px] ml-0 mt-0 w-[111.665px]"
                style={{ backgroundImage: `url('${APP_SCREENS.GROUP_2417}')` }}
              />
              <div
                className="[grid-area:1_/_1] bg-no-repeat bg-size-[100%_121.93%] bg-top-left h-[182.941px] ml-[91.677px] mt-[15.87px] w-[111.665px]"
                style={{ backgroundImage: `url('${APP_SCREENS.GROUP_2419}')` }}
              />
            </div>
            <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
              <div
                className="[grid-area:1_/_1] bg-no-repeat bg-size-[100%_111.27%] bg-top-left h-56 ml-0 mt-0 w-[124px]"
                style={{ backgroundImage: `url('${APP_SCREENS.GROUP_2418}')` }}
              />
              <div
                className="[grid-area:1_/_1] bg-no-repeat bg-size-[100%_119.97%] bg-top-left h-[205.853px] ml-[100px] mt-[18.147px] w-[124px]"
                style={{ backgroundImage: `url('${APP_SCREENS.GROUP_2420}')` }}
              />
            </div>
          </div>
          
          <Text variant="body" color="primary" className="text-left w-[311px]">
            ニュースから人気ブログ、注目のまとめまでサクサク読める「ライブドアアプリ」
            アプリならお気に入りのブログをフォローしたり、更新通知を受け取れます。
          </Text>
        </div>
        
        <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
          <Image src={APP_STORE_BADGE} alt="App Store" className="h-[42px] w-[115px]" />
          <Image src={GOOGLE_PLAY_BADGE} alt="Google Play" className="h-[42px] w-[141px]" />
        </div>
        
        {/* App Store Disclaimer for standalone */}
        {isStandalone && (
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

  // Desktop version
  const baseDesktopClasses = "box-border content-stretch flex flex-row gap-16 items-center justify-start p-0 relative rounded-[20px] shrink-0";
  const containerDesktopClasses = isStandalone ? 
    `${baseDesktopClasses} w-full max-w-[1280px] mx-auto` : 
    `${baseDesktopClasses} w-[1280px]`;

  return (
    <div className={`${containerDesktopClasses} ${className}`}>
      {/* App Screenshots */}
      <div className="grid-cols-[max-content] grid-rows-[max-content] inline-grid leading-[0] place-items-start relative shrink-0">
        <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-[20.397px] mt-[27.259px] place-items-start relative">
          <div
            className="[grid-area:1_/_1] bg-no-repeat bg-size-[100%_113.21%] bg-top-left h-[435.127px] ml-0 mt-0 w-[244.48px]"
            style={{ backgroundImage: `url('${APP_SCREENS.GROUP_2417}')` }}
          />
          <div
            className="[grid-area:1_/_1] bg-no-repeat bg-size-[100%_121.93%] bg-top-left h-[400.182px] ml-[200.717px] mt-[34.715px] w-[244.48px]"
            style={{ backgroundImage: `url('${APP_SCREENS.GROUP_2419}')` }}
          />
        </div>
        <div className="[grid-area:1_/_1] grid-cols-[max-content] grid-rows-[max-content] inline-grid ml-0 mt-0 place-items-start relative">
          <div
            className="[grid-area:1_/_1] bg-no-repeat bg-size-[100%_111.27%] bg-top-left h-[490px] ml-0 mt-0 w-[271.485px]"
            style={{ backgroundImage: `url('${APP_SCREENS.GROUP_2418}')` }}
          />
          <div
            className="[grid-area:1_/_1] bg-no-repeat bg-size-[100%_119.97%] bg-top-left h-[450.304px] ml-[218.94px] mt-[39.696px] w-[271.485px]"
            style={{ backgroundImage: `url('${APP_SCREENS.GROUP_2420}')` }}
          />
        </div>
      </div>
      
      {/* Content */}
      <div className="box-border content-stretch flex flex-col gap-8 items-start justify-start p-0 relative shrink-0 w-[702px]">
        <div className="box-border content-stretch flex flex-col gap-6 items-start justify-start pb-8 pt-0 px-0 relative shrink-0 w-full">
          <div
            aria-hidden="true"
            className="absolute border-[0px_0px_1px] border-solid border-zinc-200 inset-0 pointer-events-none"
          />
          <div className="box-border content-stretch flex flex-row gap-3.5 items-center justify-start p-0 relative shrink-0">
            <div className="bg-center bg-cover bg-no-repeat relative rounded-[3.402px] shrink-0 size-[45px]">
              <Image src={APP_ICON_URL} alt="ライブドアアプリ" className="size-full rounded-[3.402px]" />
              <div
                aria-hidden="true"
                className="absolute border-[0.681px] border-solid border-zinc-200 inset-0 pointer-events-none rounded-[3.402px]"
              />
            </div>
            <Text variant="heading-md" color="primary">
              ライブドアアプリ
            </Text>
          </div>
          
          <Text variant="heading-xl" color="primary" className="min-w-full">
            アプリでフォローしてお気に入りを追いかけよう！
          </Text>
          
          <Text variant="body" color="primary" className="min-w-full">
            ニュースから人気ブログ、注目のまとめまでサクサク読める「ライブドアアプリ」
            アプリならお気に入りのブログをフォローしたり、更新通知を受け取れます。
          </Text>
        </div>
        
        <div className="box-border content-stretch flex flex-col gap-4 items-start justify-start p-0 relative shrink-0 w-full">
          <div className="box-border content-stretch flex flex-row gap-4 items-center justify-start p-0 relative shrink-0">
            <Image src={APP_STORE_BADGE} alt="App Store" className="h-[52.248px] w-36" />
            <Image src={GOOGLE_PLAY_BADGE} alt="Google Play" className="h-[52px] w-44" />
            <Image src={QR_CODE} alt="QR Code" className="h-[77px] w-20" />
          </div>
          
          {/* App Store Disclaimer for standalone */}
          {isStandalone && (
            <Text variant="xs" color="primary" className="min-w-full">
              ・Apple、Apple ロゴ、iPad、iPhone、iPod touch は米国および他の国々で登録された Apple Inc. の商標です。
              ・App Store は Apple Inc. のサービスマークです。
              ・Google Play は Google Inc. の商標または登録商標です。
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

// Memoize the component to prevent unnecessary re-renders
export const AppPromotion = memo(AppPromotionComponent);