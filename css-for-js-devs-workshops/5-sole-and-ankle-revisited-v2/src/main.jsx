import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './components/App';
import GlobalStyles from './components/GlobalStyles';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <GlobalStyles />
  </StrictMode>
);
