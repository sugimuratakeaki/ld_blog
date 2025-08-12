// ==========================================================================
// SVG Illustrations & Placeholders
// イラストレーションとプレースホルダー画像
// ==========================================================================

import React from 'react';

// ==========================================================================
// Types
// ==========================================================================

interface IllustrationProps {
  width?: number | string;
  height?: number | string;
  className?: string;
}

interface PlaceholderProps extends IllustrationProps {
  text?: string;
  bgColor?: string;
  textColor?: string;
}

// ==========================================================================
// Placeholder Image Generator
// ==========================================================================

export const PlaceholderImage: React.FC<PlaceholderProps> = ({
  width = 300,
  height = 200,
  text,
  bgColor = '#F1F5F9',
  textColor = '#6B7280',
  className = '',
}) => {
  const displayText = text || `${width}×${height}`;
  
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={`placeholder-image ${className}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={width} height={height} fill={bgColor} />
      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fill={textColor}
        fontSize="14"
        fontFamily="system-ui, sans-serif"
      >
        {displayText}
      </text>
    </svg>
  );
};

// ==========================================================================
// Article Thumbnail Placeholder
// ==========================================================================

export const ArticleThumbnail: React.FC<IllustrationProps> = ({
  width = 300,
  height = 200,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 300 200"
    className={`article-thumbnail ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="300" height="200" fill="#F1F5F9" />
    <rect x="20" y="20" width="260" height="100" rx="4" fill="#E5E7EB" />
    <rect x="20" y="135" width="180" height="10" rx="2" fill="#D1D5DB" />
    <rect x="20" y="155" width="220" height="10" rx="2" fill="#D1D5DB" />
    <rect x="20" y="175" width="140" height="10" rx="2" fill="#D1D5DB" />
  </svg>
);

// ==========================================================================
// User Avatar Placeholder
// ==========================================================================

export const AvatarPlaceholder: React.FC<IllustrationProps> = ({
  width = 40,
  height = 40,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 40 40"
    className={`avatar-placeholder ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="20" cy="20" r="20" fill="#E5E7EB" />
    <circle cx="20" cy="15" r="6" fill="#C0C0C0" />
    <path
      d="M8 35 Q20 28 32 35"
      fill="#C0C0C0"
    />
  </svg>
);

// ==========================================================================
// Empty State Illustrations
// ==========================================================================

export const EmptyArticles: React.FC<IllustrationProps> = ({
  width = 200,
  height = 200,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 200"
    className={`empty-state ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.8">
      <rect x="40" y="50" width="120" height="100" rx="8" fill="#F1F5F9" stroke="#E5E7EB" strokeWidth="2" />
      <line x1="60" y1="75" x2="140" y2="75" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="95" x2="120" y2="95" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
      <line x1="60" y1="115" x2="130" y2="115" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" />
      <circle cx="100" cy="165" r="3" fill="#C0C0C0" />
      <circle cx="110" cy="165" r="3" fill="#C0C0C0" />
      <circle cx="90" cy="165" r="3" fill="#C0C0C0" />
    </g>
    <text x="100" y="190" textAnchor="middle" fill="#6B7280" fontSize="14" fontFamily="system-ui">
      記事がありません
    </text>
  </svg>
);

export const EmptyImages: React.FC<IllustrationProps> = ({
  width = 200,
  height = 200,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 200"
    className={`empty-state ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.8">
      <rect x="50" y="50" width="100" height="100" rx="8" fill="#F1F5F9" stroke="#E5E7EB" strokeWidth="2" />
      <circle cx="75" cy="75" r="8" fill="#D1D5DB" />
      <path d="M50 120 L80 90 L110 120 L130 100 L150 120 L150 150 L50 150 Z" fill="#E5E7EB" />
    </g>
    <text x="100" y="175" textAnchor="middle" fill="#6B7280" fontSize="14" fontFamily="system-ui">
      画像がありません
    </text>
  </svg>
);

export const EmptySearch: React.FC<IllustrationProps> = ({
  width = 200,
  height = 200,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 200"
    className={`empty-state ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <g opacity="0.8">
      <circle cx="90" cy="80" r="35" fill="none" stroke="#E5E7EB" strokeWidth="3" />
      <line x1="115" y1="105" x2="135" y2="125" stroke="#E5E7EB" strokeWidth="3" strokeLinecap="round" />
      <text x="90" y="82" textAnchor="middle" fill="#C0C0C0" fontSize="20" fontFamily="system-ui">
        ?
      </text>
    </g>
    <text x="100" y="165" textAnchor="middle" fill="#6B7280" fontSize="14" fontFamily="system-ui">
      検索結果がありません
    </text>
  </svg>
);

// ==========================================================================
// Loading Skeleton
// ==========================================================================

export const CardSkeleton: React.FC<IllustrationProps> = ({
  width = 300,
  height = 150,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 300 150"
    className={`skeleton-loading ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="300" height="150" fill="#F1F5F9" />
    <rect x="15" y="15" width="270" height="80" rx="4" fill="#E5E7EB" className="skeleton-pulse" />
    <rect x="15" y="105" width="180" height="12" rx="2" fill="#E5E7EB" className="skeleton-pulse" />
    <rect x="15" y="125" width="120" height="12" rx="2" fill="#E5E7EB" className="skeleton-pulse" />
  </svg>
);

// ==========================================================================
// Chart Placeholder
// ==========================================================================

export const ChartPlaceholder: React.FC<IllustrationProps> = ({
  width = 400,
  height = 250,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 400 250"
    className={`chart-placeholder ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect width="400" height="250" fill="#F6F8FA" />
    
    {/* Y Axis */}
    <line x1="50" y1="30" x2="50" y2="200" stroke="#D1D5DB" strokeWidth="1" />
    
    {/* X Axis */}
    <line x1="50" y1="200" x2="370" y2="200" stroke="#D1D5DB" strokeWidth="1" />
    
    {/* Bars */}
    <rect x="80" y="140" width="40" height="60" fill="#0096EF" opacity="0.7" />
    <rect x="140" y="100" width="40" height="100" fill="#0096EF" opacity="0.7" />
    <rect x="200" y="120" width="40" height="80" fill="#0096EF" opacity="0.7" />
    <rect x="260" y="80" width="40" height="120" fill="#0096EF" opacity="0.7" />
    <rect x="320" y="110" width="40" height="90" fill="#0096EF" opacity="0.7" />
    
    {/* Grid lines */}
    {[1, 2, 3, 4].map((i) => (
      <line
        key={i}
        x1="50"
        y1={200 - i * 40}
        x2="370"
        y2={200 - i * 40}
        stroke="#E5E7EB"
        strokeWidth="0.5"
        strokeDasharray="2,2"
      />
    ))}
  </svg>
);

// ==========================================================================
// Logo Placeholder
// ==========================================================================

export const LogoPlaceholder: React.FC<IllustrationProps> = ({
  width = 120,
  height = 40,
  className = '',
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 120 40"
    className={`logo-placeholder ${className}`}
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="5" y="8" width="24" height="24" rx="4" fill="#0096EF" />
    <text x="17" y="24" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="system-ui">
      B
    </text>
    <text x="40" y="24" fill="#334155" fontSize="16" fontWeight="600" fontFamily="system-ui">
      BlogCMS
    </text>
  </svg>
);

// ==========================================================================
// Helper function to generate data URIs
// ==========================================================================

export const generatePlaceholderDataUri = (
  width: number,
  height: number,
  text?: string,
  bgColor = '#F1F5F9',
  textColor = '#6B7280'
): string => {
  const svg = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${width}" height="${height}" fill="${bgColor}"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="${textColor}" font-size="14" font-family="system-ui">
        ${text || `${width}×${height}`}
      </text>
    </svg>
  `;
  return `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;
};