import React, { useRef, useEffect } from 'react';
import { MainLayout } from '../../templates';
import { Text } from '../../atoms';

interface IndividualBlogPageProps {
  isMobile?: boolean;
}

export const IndividualBlogPage: React.FC<IndividualBlogPageProps> = ({
  isMobile = false
}) => {
  const navRef = useRef<HTMLElement>(null);
  const leftIndicatorRef = useRef<HTMLDivElement>(null);
  const rightIndicatorRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    if (!isMobile || !leftIndicatorRef.current || !rightIndicatorRef.current) return;
    
    const container = e.target as HTMLElement;
    const leftIndicator = leftIndicatorRef.current;
    const rightIndicator = rightIndicatorRef.current;
    
    // Show left indicator when scrolled right
    leftIndicator.style.opacity = container.scrollLeft > 10 ? '1' : '0';
    
    // Show right indicator when not fully scrolled
    const isAtEnd = container.scrollLeft >= (container.scrollWidth - container.clientWidth - 10);
    rightIndicator.style.opacity = isAtEnd ? '0' : '1';
    
    // Add subtle shadow to indicate scrollable content
    container.style.boxShadow = container.scrollLeft > 0 
      ? 'inset 8px 0 8px -8px rgba(0,0,0,0.1)' 
      : 'none';
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>, index: number) => {
    const tabs = navRef.current?.querySelectorAll('a');
    if (!tabs) return;

    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      (tabs[index - 1] as HTMLElement).focus();
    } else if (e.key === 'ArrowRight' && index < tabs.length - 1) {
      e.preventDefault();
      (tabs[index + 1] as HTMLElement).focus();
    }
  };

  useEffect(() => {
    // Initialize scroll indicators for mobile
    if (isMobile && navRef.current && rightIndicatorRef.current) {
      const container = navRef.current;
      const hasScrollableContent = container.scrollWidth > container.clientWidth;
      rightIndicatorRef.current.style.opacity = hasScrollableContent ? '1' : '0';
    }
  }, [isMobile]);

  return (
    <MainLayout isMobile={isMobile}>
      {/* Hero Banner Section */}
      <section className="w-full bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 py-8 relative">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-yellow-300 opacity-20" style={{
            backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)`
          }}></div>
          
          {/* Character Illustrations */}
          <div className="relative flex items-center justify-between h-32">
            {/* Left side characters */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">👻</span>
              </div>
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-black text-2xl">⚡</span>
              </div>
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🌊</span>
              </div>
            </div>

            {/* Center Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 bg-yellow-600 px-6 py-2 rounded-lg shadow-lg">
              <Text variant="heading-lg" color="white" className="font-bold text-white">
                オレ的ゲーム速報の刃
              </Text>
            </div>

            {/* Right side characters */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">🍃</span>
              </div>
              <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center">
                <span className="text-white text-2xl">⚔️</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Info Section */}
      <section className="w-full bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="text-center">
            <Text variant="heading-xl" color="primary" className="mb-2">
              オレ的ゲーム速報の刃
            </Text>
            <Text variant="body" color="secondary" className="mb-4">
              オレ的ゲーム速報の刃：気になったゲーム情報やニュースを配信するブログ。ゲーム、アニメ、漫画、芸能など幅広いネタまた、皆が考える色々な事に関しています。
            </Text>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="w-full bg-blue-500 overflow-hidden relative">
        <div className="max-w-4xl mx-auto relative">
          {/* Scroll indicators for mobile */}
          {isMobile && (
            <>
              <div 
                ref={leftIndicatorRef}
                className="absolute left-0 top-0 bottom-0 w-6 z-10 pointer-events-none opacity-0 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to right, #3b82f6 0%, #3b82f6 50%, transparent 100%)' }}
                aria-hidden="true"
              />
              <div 
                ref={rightIndicatorRef}
                className="absolute right-0 top-0 bottom-0 w-6 z-10 pointer-events-none opacity-0 transition-opacity duration-300"
                style={{ background: 'linear-gradient(to left, #3b82f6 0%, #3b82f6 50%, transparent 100%)' }}
                aria-hidden="true"
              />
            </>
          )}
          
          <nav 
            ref={navRef}
            role="tablist"
            aria-label="コンテンツカテゴリー"
            className={`flex ${isMobile ? 'overflow-x-auto snap-x snap-mandatory scroll-smooth' : ''}`}
            style={isMobile ? {
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch'
            } : {}}
            onScroll={handleScroll}
          >
            {/* CSS for hiding webkit scrollbar */}
            {isMobile && (
              <style dangerouslySetInnerHTML={{
                __html: `
                  nav[aria-label="コンテンツカテゴリー"]::-webkit-scrollbar {
                    display: none;
                  }
                `
              }} />
            )}
            {[
              { name: 'ゲーム', active: true },
              { name: 'アニメ・マンガ', active: false },
              { name: 'ニュース', active: false },
              { name: '炎上', active: false },
              { name: 'お知らせ', active: false },
              { name: '運営先（ネタ投稿）', active: false }
            ].map((tab, index) => (
              <a
                key={index}
                href="#"
                role="tab"
                aria-selected={tab.active}
                aria-controls={`tabpanel-${index}`}
                tabIndex={tab.active ? 0 : -1}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className={`
                  ${isMobile 
                    ? 'flex-shrink-0 px-6 py-3 text-white font-medium text-sm whitespace-nowrap transition-all duration-200 ease-in-out snap-start border-r border-blue-400 last:border-r-0 touch-manipulation min-w-max flex items-center justify-center' 
                    : 'px-4 py-3 text-white font-medium text-sm border-r border-blue-400 last:border-r-0'
                  }
                  ${tab.active 
                    ? 'bg-blue-600 shadow-inner relative before:absolute before:bottom-0 before:left-0 before:right-0 before:h-1 before:bg-yellow-400' 
                    : 'hover:bg-blue-400 active:bg-blue-500'
                  }
                  focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-inset focus:z-20
                `}
                style={isMobile ? { minHeight: '44px' } : {}}
              >
                {tab.name}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="w-full bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'grid-cols-3'}`}>
            {/* News Feed */}
            <div className="col-span-2">
              <div className="space-y-4">
                {/* Sample News Items */}
                {[
                  {
                    type: '朗報',
                    title: '道路上でクズ同士が出会うところなる【ドラレコ】',
                    date: '2025年03月10日 17:00',
                    category: 'ニュース',
                    comments: 123,
                    tags: ['4ch吼', 'Pch語', 'どうせ', 'だりのレコ']
                  }
                ].map((news, index) => (
                  <article key={index} className="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
                            【{news.type}】
                          </span>
                          <Text variant="xs" color="secondary">
                            {news.date}
                          </Text>
                          <Text variant="xs" color="secondary">
                            カテゴリ：{news.category}
                          </Text>
                          <Text variant="xs" color="secondary">
                            コメント({news.comments})
                          </Text>
                        </div>
                        <Text variant="heading-md" color="primary" className="mb-2 hover:text-blue-600 cursor-pointer">
                          {news.title}
                        </Text>
                        <div className="flex flex-wrap gap-1">
                          <Text variant="xs" color="secondary">タグ</Text>
                          {news.tags.map((tag, tagIndex) => (
                            <Text key={tagIndex} variant="xs" color="blue" className="hover:underline cursor-pointer">
                              {tag}
                              {tagIndex < news.tags.length - 1 && '、'}
                            </Text>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}

                {/* More news items would go here */}
                <div className="text-center py-8">
                  <Text variant="body" color="secondary">
                    その他の記事を読み込み中...
                  </Text>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            {!isMobile && (
              <aside className="space-y-6">
                {/* Advertisement Placeholder */}
                <div className="bg-white rounded-lg border p-4">
                  <div className="h-64 bg-pink-100 rounded flex items-center justify-center">
                    <Text variant="small" color="secondary">
                      広告エリア
                    </Text>
                  </div>
                </div>

                {/* Additional Sidebar Content */}
                <div className="bg-white rounded-lg border p-4">
                  <Text variant="body-bold" color="primary" className="mb-3">
                    人気記事
                  </Text>
                  <div className="space-y-2">
                    <Text variant="small" color="primary" className="hover:text-blue-600 cursor-pointer">
                      ・サンプル人気記事タイトル1
                    </Text>
                    <Text variant="small" color="primary" className="hover:text-blue-600 cursor-pointer">
                      ・サンプル人気記事タイトル2
                    </Text>
                    <Text variant="small" color="primary" className="hover:text-blue-600 cursor-pointer">
                      ・サンプル人気記事タイトル3
                    </Text>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};