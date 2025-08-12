# SCSS Architecture Documentation

## Overview

This SCSS architecture follows a modular, maintainable structure based on the 7-1 pattern, adapted for the LDBlog User CMS project.

## Directory Structure

```
scss/
├── foundation/          # Core foundation files
│   ├── _variables.scss  # All SCSS variables (colors, spacing, typography)
│   ├── _functions.scss  # Utility functions
│   ├── _mixins.scss     # Reusable mixins
│   ├── _reset.scss      # CSS reset/normalize
│   └── _base.scss       # Base element styles
│
├── layout/              # Layout components
│   ├── _grid.scss       # Grid system
│   ├── _container.scss  # Container layouts
│   ├── _header.scss     # Header styles
│   ├── _footer.scss     # Footer styles
│   ├── _sidebar.scss    # Sidebar navigation
│   └── _drawer.scss     # Mobile drawer menu
│
├── components/          # Reusable UI components
│   ├── _button.scss     # Button styles
│   ├── _card.scss       # Card components
│   ├── _form.scss       # Form elements
│   ├── _table.scss      # Table styles
│   ├── _modal.scss      # Modal dialogs
│   ├── _alert.scss      # Alert messages
│   ├── _pagination.scss # Pagination
│   ├── _breadcrumb.scss # Breadcrumb navigation
│   ├── _tag.scss        # Tag components
│   ├── _badge.scss      # Badge styles
│   ├── _tooltip.scss    # Tooltips
│   ├── _dropdown.scss   # Dropdown menus
│   └── _ad.scss         # Advertisement areas
│
├── pages/               # Page-specific styles
│   ├── _dashboard.scss  # Dashboard page
│   ├── _article-edit.scss  # Article editor
│   ├── _article-list.scss  # Article listings
│   └── _image-manager.scss # Image management
│
├── utilities/           # Utility classes
│   ├── _spacing.scss    # Margin/padding utilities
│   ├── _text.scss       # Text utilities
│   ├── _color.scss      # Color utilities
│   ├── _display.scss    # Display utilities
│   ├── _flex.scss       # Flexbox utilities
│   └── _responsive.scss # Responsive utilities
│
├── themes/              # Theme variations
│   └── _default.scss    # Default theme
│
└── main.scss            # Main entry point
```

## Key Features

### Variables

All design tokens are centralized in `foundation/_variables.scss`:
- **Colors**: Primary, status, neutral colors
- **Typography**: Font families, sizes, weights, line-heights
- **Spacing**: 8px-based spacing system
- **Breakpoints**: Responsive breakpoints (sp, tablet, pc, wide)
- **Layout**: Container widths, sidebar dimensions
- **Effects**: Shadows, transitions, border-radius

### Mixins

Commonly used mixins in `foundation/_mixins.scss`:

#### Responsive Mixins
```scss
@include sp { }      // Mobile: max-width 767px
@include tablet { }  // Tablet: 768px - 1023px
@include pc { }      // Desktop: min-width 1024px
@include wide { }    // Wide: min-width 1280px
```

#### Layout Mixins
```scss
@include flex-center;   // Center content with flexbox
@include flex-between;  // Space between with flexbox
@include container;     // Container with max-width
```

#### Utility Mixins
```scss
@include truncate;           // Text ellipsis
@include line-clamp($lines); // Multi-line truncation
@include focus-ring;         // Accessible focus styles
@include custom-scrollbar;   // Custom scrollbar styles
```

### Functions

Utility functions in `foundation/_functions.scss`:
- `px-to-rem($px)` - Convert pixels to rem
- `percentage($value, $total)` - Calculate percentage
- `tint($color, $percentage)` - Lighten color
- `shade($color, $percentage)` - Darken color
- `z($layer)` - Get z-index value
- `space($index)` - Get spacing value

## Usage

### Development

```bash
# Install dependencies
npm install

# Watch for changes (development)
npm run dev
# or
npm run sass:watch

# Single compilation
npm run sass
```

### Production Build

```bash
# Build minified CSS
npm run build
# or
npm run sass:build
```

### Custom Compilation

```bash
# Using the Node.js script
node compile-scss.js          # Single compilation
node compile-scss.js --watch  # Watch mode
```

## Output Files

- `static/css/style.css` - Expanded CSS for development
- `static/css/style.min.css` - Minified CSS for production (when using compile script)

## Best Practices

1. **Variables First**: Always use variables for colors, spacing, and sizes
2. **Mobile First**: Write base styles for mobile, then add responsive overrides
3. **Component Isolation**: Each component should be self-contained
4. **Utility Last**: Use utilities for quick overrides, not primary styling
5. **Semantic Naming**: Use descriptive, meaningful class names
6. **DRY Principle**: Use mixins and functions to avoid repetition

## Adding New Components

1. Create a new file in the appropriate directory (e.g., `components/_newcomponent.scss`)
2. Import it in `main.scss` in the correct section
3. Follow existing naming conventions and structure
4. Use variables and mixins from foundation files

## Responsive Design

The system uses a mobile-first approach with these breakpoints:
- **Mobile (sp)**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop (pc)**: 1024px - 1279px
- **Wide**: ≥ 1280px

## Color System

Based on the Figma design system:
- **Primary**: Blue (#0096EF)
- **Status Colors**: Success (Green), Warning (Yellow), Error (Red), Info (Turquoise)
- **Neutrals**: White, grays, borders
- **Semantic Colors**: Each color has light variants for backgrounds

## Spacing System

8px-based spacing scale:
- `$spacing-sm`: 8px
- `$spacing-md`: 16px
- `$spacing-lg`: 24px
- `$spacing-xl`: 32px
- `$spacing-2xl`: 40px

## Browser Support

The compiled CSS supports:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- CSS Grid and Flexbox
- CSS Custom Properties (fallbacks included via SCSS variables)

## Maintenance

- Keep files focused and under 300 lines when possible
- Document complex mixins and functions
- Update this README when adding major features
- Run build before committing to ensure compilation works