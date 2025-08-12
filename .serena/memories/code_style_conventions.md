# Code Style and Conventions

## File Structure (Atomic Design)
```
src/components/
├── atoms/           # 最小単位のコンポーネント (Button, Text, Logo, Image)
├── molecules/       # 複数のatomsを組み合わせ (HeaderApp, HeaderBlog, etc.)
├── organisms/       # 複雑なUIセクション (Header, Footer)
├── templates/       # ページレイアウト (MainLayout)
└── pages/          # 実際のページ (MaintenancePage, NotFoundPage)
```

## Naming Conventions
- **コンポーネント**: PascalCase (Button, MainLayout)
- **ファイル**: PascalCase (Button.tsx, MainLayout.tsx)
- **Props**: camelCase
- **フォルダ**: PascalCase

## TypeScript Guidelines
- Strict mode enabled
- All components must have proper type definitions
- Props interfaces defined in types/ folder
- Export interfaces from types/index.ts

## Styling
- **Primary framework**: Tailwind CSS (CDN版)
- **Font**: Hiragino Sans (W3=300, W6=600)
- **Colors**: Primary #27272A, Secondary #A1A1AA, Blue #3B82F6
- **Responsive**: PC (1280px), Mobile (375px)
- Minimal custom CSS - prefer Tailwind classes

## Component Structure
Each component folder contains:
- ComponentName.tsx (main component)
- index.ts (export file)

## Props Pattern
```tsx
interface ComponentProps {
  isMobile?: boolean;
  children?: React.ReactNode;
  className?: string;
}
```