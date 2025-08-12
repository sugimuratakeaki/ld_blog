// ==========================================================================
// SVG Icon System
// アイコンコンポーネントの定義
// ==========================================================================

import React from 'react';

// ==========================================================================
// Icon Types
// ==========================================================================

export interface IconProps {
  size?: number | string;
  color?: string;
  className?: string;
  strokeWidth?: number;
}

// ==========================================================================
// Base Icon Component
// ==========================================================================

const BaseIcon: React.FC<IconProps & { children: React.ReactNode }> = ({
  size = 24,
  color = 'currentColor',
  className = '',
  strokeWidth = 2,
  children,
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={`icon ${className}`}
    {...props}
  >
    {children}
  </svg>
);

// ==========================================================================
// Navigation Icons
// ==========================================================================

export const MenuIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </BaseIcon>
);

export const CloseIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </BaseIcon>
);

export const HomeIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </BaseIcon>
);

export const DashboardIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </BaseIcon>
);

// ==========================================================================
// Action Icons
// ==========================================================================

export const PlusIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </BaseIcon>
);

export const EditIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </BaseIcon>
);

export const DeleteIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </BaseIcon>
);

export const SaveIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
    <polyline points="17 21 17 13 7 13 7 21" />
    <polyline points="7 3 7 8 15 8" />
  </BaseIcon>
);

export const SearchIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </BaseIcon>
);

// ==========================================================================
// Content Icons
// ==========================================================================

export const ArticleIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </BaseIcon>
);

export const ImageIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <circle cx="8.5" cy="8.5" r="1.5" />
    <polyline points="21 15 16 10 5 21" />
  </BaseIcon>
);

export const FolderIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </BaseIcon>
);

export const TagIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
    <line x1="7" y1="7" x2="7.01" y2="7" />
  </BaseIcon>
);

// ==========================================================================
// Status Icons
// ==========================================================================

export const CheckIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="20 6 9 17 4 12" />
  </BaseIcon>
);

export const AlertIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </BaseIcon>
);

export const InfoIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </BaseIcon>
);

export const ErrorIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </BaseIcon>
);

// ==========================================================================
// User Interface Icons
// ==========================================================================

export const ChevronDownIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="6 9 12 15 18 9" />
  </BaseIcon>
);

export const ChevronUpIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="18 15 12 9 6 15" />
  </BaseIcon>
);

export const ChevronLeftIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="15 18 9 12 15 6" />
  </BaseIcon>
);

export const ChevronRightIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <polyline points="9 18 15 12 9 6" />
  </BaseIcon>
);

export const MoreVerticalIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="12" cy="5" r="1" />
    <circle cx="12" cy="19" r="1" />
  </BaseIcon>
);

export const MoreHorizontalIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
  </BaseIcon>
);

// ==========================================================================
// User & Account Icons
// ==========================================================================

export const UserIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </BaseIcon>
);

export const SettingsIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 1v6m0 6v6m4.22-13.22l4.24 4.24M1.54 9.46l4.24 4.24M21 12h-6m-6 0H3m13.22 4.22l-4.24 4.24M9.46 1.54L5.22 5.78" />
  </BaseIcon>
);

export const LogoutIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </BaseIcon>
);

export const BellIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </BaseIcon>
);

// ==========================================================================
// Utility Icons
// ==========================================================================

export const CalendarIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </BaseIcon>
);

export const ClockIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </BaseIcon>
);

export const UploadIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </BaseIcon>
);

export const DownloadIcon: React.FC<IconProps> = (props) => (
  <BaseIcon {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </BaseIcon>
);

// ==========================================================================
// Icon Map for Dynamic Usage
// ==========================================================================

export const icons = {
  menu: MenuIcon,
  close: CloseIcon,
  home: HomeIcon,
  dashboard: DashboardIcon,
  plus: PlusIcon,
  edit: EditIcon,
  delete: DeleteIcon,
  save: SaveIcon,
  search: SearchIcon,
  article: ArticleIcon,
  image: ImageIcon,
  folder: FolderIcon,
  tag: TagIcon,
  check: CheckIcon,
  alert: AlertIcon,
  info: InfoIcon,
  error: ErrorIcon,
  chevronDown: ChevronDownIcon,
  chevronUp: ChevronUpIcon,
  chevronLeft: ChevronLeftIcon,
  chevronRight: ChevronRightIcon,
  moreVertical: MoreVerticalIcon,
  moreHorizontal: MoreHorizontalIcon,
  user: UserIcon,
  settings: SettingsIcon,
  logout: LogoutIcon,
  bell: BellIcon,
  calendar: CalendarIcon,
  clock: ClockIcon,
  upload: UploadIcon,
  download: DownloadIcon,
} as const;

export type IconName = keyof typeof icons;

// ==========================================================================
// Dynamic Icon Component
// ==========================================================================

export interface DynamicIconProps extends IconProps {
  name: IconName;
}

export const Icon: React.FC<DynamicIconProps> = ({ name, ...props }) => {
  const IconComponent = icons[name];
  return <IconComponent {...props} />;
};