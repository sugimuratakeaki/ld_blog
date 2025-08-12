import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Ensure DOM is fully loaded before attempting to mount React
function mountApp() {
  const rootElement = document.getElementById('root');
  
  if (!rootElement) {
    console.error('Failed to find root element');
    return;
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

// The script has defer attribute, so DOM should be ready, but let's be safe
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  // DOM is already loaded
  mountApp();
}