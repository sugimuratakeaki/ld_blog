# Task Completion Guidelines

## When Task is Complete
1. **Run linting/formatting**: Check for any lint scripts in package.json
2. **Run tests**: `npm test` to ensure no regressions
3. **Build check**: `npm run build` to verify production build works
4. **Manual testing**: Test both PC and mobile layouts
5. **Code review**: Ensure Atomic Design principles followed

## Testing Strategy
- Use demo controls (top-right panel) to test different layouts
- Test both desktop and mobile modes
- Verify Figma design compliance
- Check responsive behavior

## Code Quality Checks
- TypeScript compilation passes
- All components have proper type definitions
- Tailwind CSS classes used correctly
- Component follows Atomic Design hierarchy
- Proper export structure maintained

## No Available Lint Commands
Based on package.json review, there are no specific lint/format commands configured.
Only standard React Scripts commands available:
- `npm test` for testing
- `npm run build` for production build
- `npm start` for development

## Asset Management
- Images served from localhost:3845
- Use provided asset URLs from Figma exports
- Maintain consistent asset naming