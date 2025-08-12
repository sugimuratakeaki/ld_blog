export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export interface TextProps {
  variant?: 'heading-xl' | 'heading-lg' | 'heading-md' | 'body' | 'body-bold' | 'small' | 'small-bold' | 'xs' | 'xs-bold';
  color?: 'primary' | 'secondary' | 'white' | 'blue';
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export interface LogoProps {
  variant?: 'default' | 'white';
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export interface ImageProps {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
}

// Layout Configuration Types (Updated with UI/UX improvements)
import type { LayoutConfig } from '../config/layout';
export type { LayoutConfig } from '../config/layout';

export interface ResponsiveLayoutProps {
  isMobile?: boolean;
  config?: LayoutConfig;
  children: React.ReactNode;
  showMobileHeaders?: boolean;
}

export interface OrganismProps {
  isMobile?: boolean;
  className?: string;
}

export interface HeaderOrganismProps extends OrganismProps {
  showDesktop?: boolean;
  showMobileApp?: boolean;
  showMobileBlog?: boolean;
}

export interface FooterOrganismProps extends OrganismProps {
  showAppPromotion?: boolean;
}

export interface AppPromotionOrganismProps extends OrganismProps {
  variant?: 'standalone' | 'embedded';
  placement?: 'header' | 'footer' | 'inline';
}