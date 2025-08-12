// Dashboard types
export interface DashboardStats {
  totalArticles: number;
  published: number;
  scheduled: number;
  drafts: number;
}

// Article types
export type ArticleStatus = 'published' | 'draft' | 'scheduled';
export type ArticleStatusClass = 'success' | 'warning' | 'info';

export interface Article {
  id: number;
  title: string;
  status: ArticleStatus;
  statusLabel: string;
  statusClass: ArticleStatusClass;
  date: string;
  thumbnail: string;
  excerpt?: string;
  category?: string;
  views?: number;
  comments?: number;
}

// Activity types
export type ActivityIconClass = 'success' | 'primary' | 'warning' | 'info';

export interface Activity {
  icon: string;
  iconClass: ActivityIconClass;
  title: string;
  time: string;
}

// Image types
export interface Image {
  id: number;
  name: string;
  url: string;
  size: string;
  dimensions: string;
  uploadedDate: string;
  folder: string;
}

// Folder types
export interface Folder {
  id: number;
  name: string;
  count: number;
}

// Category types
export interface Category {
  id: number;
  name: string;
  count: number;
}

// Common UI types
export interface SelectOption {
  value: string | number;
  label: string;
}

// Form types
export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'select' | 'file' | 'checkbox' | 'radio';
  required?: boolean;
  placeholder?: string;
  options?: SelectOption[];
  rows?: number;
}

// Navigation types
export interface NavItem {
  id: string;
  label: string;
  path: string;
  icon?: string;
  badge?: string | number;
  children?: NavItem[];
}

// Page props types
export interface PageProps {
  title?: string;
  className?: string;
}

// Component props types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}