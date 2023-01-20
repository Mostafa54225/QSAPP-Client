import { ReactNotifications } from 'react-notifications-component'
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <ReactNotifications />
      <ScrollToTop />
      <StyledChart />
      <Router />
    </ThemeProvider>
  );
}
