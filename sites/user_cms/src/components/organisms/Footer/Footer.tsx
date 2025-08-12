import React from 'react';
import { clsx } from 'clsx';
import type { BaseComponentProps } from '@/types';

interface FooterLink {
  text: string;
  url: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface FooterProps extends BaseComponentProps {
  sections?: FooterSection[];
  poweredBy?: string;
}

const DEFAULT_SECTIONS: FooterSection[] = [
  {
    title: 'お困りの方へ',
    links: [
      { text: 'ヘルプ', url: '#' },
      { text: 'お問い合わせフォーム', url: '#' },
      { text: '公式X', url: '#' },
      { text: '公式Instagram', url: '#' },
      { text: 'livedoor Blog ガイドライン', url: '#' },
    ],
  },
  {
    title: '人気のブログ/記事を探す',
    links: [
      { text: 'ブログランキング', url: '#' },
      { text: 'ブログ速報', url: '#' },
      { text: 'カテゴリ一覧', url: '#' },
    ],
  },
  {
    title: '関連サイト',
    links: [
      { text: 'livedoor', url: '#' },
      { text: '相互RSS', url: '#' },
    ],
  },
];

export const Footer: React.FC<FooterProps> = ({
  className,
  sections = DEFAULT_SECTIONS,
  poweredBy = 'Powered by ライブドアブログ',
  ...props
}) => {
  return (
    <footer className={clsx('footer', className)} {...props}>
      <div className="footer-container">
        <div className="footer-sections">
          {sections.map((section, index) => (
            <div key={index} className="footer-section">
              <h3 className="footer-section-title">{section.title}</h3>
              <ul className="footer-section-links">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="footer-link-item">
                    <a
                      href={link.url}
                      className="footer-link"
                      target={link.url.startsWith('http') ? '_blank' : undefined}
                      rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.text}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="footer-bottom">
          <p className="footer-powered-by">{poweredBy}</p>
          <p className="footer-copyright">© 2024 ライブドアブログCMS</p>
        </div>
      </div>
    </footer>
  );
};