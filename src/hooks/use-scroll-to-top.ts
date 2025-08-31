import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Custom hook that scrolls to the top of the page on route changes
 * This ensures users always start at the top when navigating to a new page
 */
export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top with smooth behavior
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);
}

/**
 * Utility function to scroll to top immediately (without smooth behavior)
 * Useful for programmatic navigation where you want instant scrolling
 */
export function scrollToTopImmediate() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'auto'
  });
}

/**
 * Utility function to scroll to top with smooth behavior
 * Useful for manual scroll-to-top buttons or specific navigation events
 */
export function scrollToTopSmooth() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
  });
}
