import { useScrollToTop } from '@/hooks/use-scroll-to-top';

/**
 * Component that automatically scrolls to the top on route changes
 *
 * This component:
 * - Listens for route changes using React Router's useLocation hook
 * - Automatically scrolls to the top of the page when the route changes
 * - Uses smooth scrolling behavior for better user experience
 * - Works with both Link navigation and programmatic navigation (useNavigate)
 *
 * Usage: Place this component inside BrowserRouter but outside Routes
 * Example: <BrowserRouter><ScrollToTop /><Routes>...</Routes></BrowserRouter>
 */
export function ScrollToTop() {
  useScrollToTop();
  return null;
}
