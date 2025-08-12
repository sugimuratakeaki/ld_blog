# Figma Design Analysis: オレ的ゲーム速報@刃 PC Layout

## Design System Variables Extracted

### Colors
- **Primary Text**: `#27272A` (text/main)
- **Secondary Text**: `#A1A1AA` (text/sub)
- **Disabled Text**: `#D4D4D8` (text/disable)
- **Primary Blue**: `#2563EB` (blue/600)
- **Secondary Blue**: `#3B82F6` (blue/500)
- **Accent Red**: `#DC2626` (red/600)
- **Accent Yellow**: `#CA8A04` (yellow/600)
- **Background Gray**: `#FAFAFA` (gray/50)
- **Border Gray**: `#F4F4F5` (gray/100)
- **Medium Gray**: `#71717A` (gray/500)
- **Black**: `#000000`
- **White**: `#FFFFFF`

### Typography System
**Font Family**: Hiragino Sans

**Text Sizes and Weights**:
- `text-xs`: 12px (regular: 300, bold: 600) / line-height: 16px
- `text-sm`: 14px (regular: 300, bold: 600) / line-height: 20px
- `text-base`: 16px (regular: 300, bold: 600) / line-height: 24px
- `text-lg`: 18px bold (600) / line-height: 28px
- `text-xl`: 20px bold (600) / line-height: 28px
- `text-2xl`: 24px bold (600) / line-height: 32px
- `text-3xl`: 30px bold (600) / line-height: 36px

## 1. Main Layout Structure

### Container System
- **Max Width**: 1200px
- **Content Max Width**: 1160px
- **Grid Layout**: Two-column (main content + sidebar)
- **Grid Columns**: `1fr 300px` (content area 300px sidebar)
- **Gap**: 24px between columns
- **Padding**: 24px vertical, 20px horizontal
- **Background**: White container on gray background

### Responsive Breakpoints
- **Mobile**: ≤ 768px - Single column layout
- **Desktop**: > 768px - Two-column layout

## 2. Header Content Structure

### Header Container
- **Background**: White
- **Border**: 1px solid gray/100 (#F4F4F5)
- **Padding**: 16px vertical, 20px horizontal
- **Layout**: Flexbox with space-between alignment

### Site Branding
- **Site Title**: "オレ的ゲーム速報@刃"
- **Typography**: text-3xl-bold (30px/36px, weight: 600)
- **Color**: text/main (#27272A)

### Navigation
- **Layout**: Horizontal flex with 24px gap
- **Link Styling**: 
  - Font: text-sm-bold (14px/20px, weight: 600)
  - Padding: 8px 12px
  - Border-radius: 4px
  - Hover: background gray/100
  - Active: blue/600 text color

## 3. Article List Layout and Styling

### Article Container
- **Layout**: Vertical flex with 24px gap
- **Item Structure**: Horizontal flex with 16px gap

### Article Item
- **Background**: White
- **Border**: 1px solid gray/100
- **Border-radius**: 8px
- **Padding**: 16px
- **Hover Effect**: Box-shadow (0 2px 8px rgba(0,0,0,0.1))

### Article Thumbnail
- **Dimensions**: 120px × 80px
- **Border-radius**: 4px
- **Object-fit**: cover
- **Fallback**: gray/100 background

### Article Content
- **Layout**: Vertical flex with 8px gap
- **Title Typography**: text-lg-bold (18px/28px, weight: 600)
- **Title Hover**: blue/600 color
- **Meta Typography**: text-xs-regular (12px/16px, weight: 300)
- **Meta Color**: text/sub (#A1A1AA)
- **Excerpt Typography**: text-sm-regular (14px/20px, weight: 300)

## 4. Sidebar Components

### Sidebar Container
- **Width**: 300px (fixed)
- **Background**: gray/50 (#FAFAFA)
- **Border-radius**: 8px
- **Padding**: 20px

### Widget Structure
- **Spacing**: 24px margin-bottom between widgets
- **Background**: White
- **Border**: 1px solid gray/100
- **Border-radius**: 8px
- **Padding**: 16px

### Widget Title
- **Typography**: text-lg-bold (18px/28px, weight: 600)
- **Color**: text/main (#27272A)
- **Border-bottom**: 2px solid blue/600
- **Margin-bottom**: 12px
- **Padding-bottom**: 8px

### Widget Content
- **Typography**: text-sm-regular (14px/20px, weight: 300)
- **Color**: text/main (#27272A)

## 5. Key Spacing and Layout Details

### Global Spacing System
- **Container padding**: 20px horizontal
- **Section gaps**: 24px
- **Component gaps**: 16px
- **Small gaps**: 8px
- **Micro gaps**: 4px

### Interaction States
- **Hover transitions**: 0.2s ease
- **Focus states**: Blue outline for accessibility
- **Active states**: Blue/600 color and gray/100 background

### Mobile Adaptations
- **Single column**: Content stacks vertically
- **Reduced padding**: 16px instead of 24px
- **Thumbnail**: Full width, 200px height
- **Navigation**: Centered and wrapped

## Component Architecture Recommendations

1. **Header Component**: Separate navigation and branding
2. **ArticleCard Component**: Reusable for different contexts
3. **SidebarWidget Component**: Generic widget container
4. **Layout Component**: Grid container with responsive breakpoints
5. **Typography Components**: Utility classes for consistent text styling

## Files Generated
- **HTML Structure**: `/Users/sugimura/Local Sites/ld_blog/figma-layout-analysis.html`
- **Design Analysis**: `/Users/sugimura/Local Sites/ld_blog/figma-design-analysis.md`

The HTML file contains a complete implementation of the main layout structure with all the extracted design system variables and responsive behavior.