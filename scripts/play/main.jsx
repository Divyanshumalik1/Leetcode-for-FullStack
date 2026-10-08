import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@problem';

// StrictMode double-runs effects in development — it surfaces cleanup bugs early.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
