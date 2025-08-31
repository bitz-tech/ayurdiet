# Scroll to Top Functionality

## Overview

The AyurDiet application automatically scrolls to the top of the page when users navigate between different routes. This ensures a consistent user experience where users always start at the top of new pages.

## Implementation

### Components

1. **ScrollToTop Component** (`src/components/layout/ScrollToTop.tsx`)
   - A utility component that handles automatic scrolling
   - Uses the `useScrollToTop` hook internally
   - Renders nothing (returns `null`)

2. **useScrollToTop Hook** (`src/hooks/use-scroll-to-top.ts`)
   - Custom hook that listens for route changes
   - Automatically scrolls to top when pathname changes
   - Uses smooth scrolling behavior

### Integration

The `ScrollToTop` component is integrated in `src/App.tsx`:

```tsx
<BrowserRouter>
  <ScrollToTop />
  <Routes>
    {/* All routes */}
  </Routes>
</BrowserRouter>
```

## How It Works

1. **Route Change Detection**: The hook uses `useLocation()` from React Router to detect when the route changes
2. **Automatic Scrolling**: When a route change is detected, `window.scrollTo()` is called with smooth behavior
3. **Universal Coverage**: Works with all navigation methods:
   - `<Link>` components in Navbar and Footer
   - Programmatic navigation using `useNavigate()`
   - Direct URL changes

## Additional Utilities

The hook file also provides utility functions for manual scroll control:

- `scrollToTopImmediate()`: Scrolls to top instantly (no smooth behavior)
- `scrollToTopSmooth()`: Scrolls to top with smooth animation

## Testing

To test the functionality:

1. Navigate to the bottom of any page (e.g., Home page)
2. Click on any navigation link (e.g., "Contact" in the navbar)
3. Verify that you land at the top of the new page
4. Test with both desktop and mobile navigation

## Browser Compatibility

The smooth scrolling behavior is supported in all modern browsers. For older browsers, it gracefully falls back to instant scrolling.
