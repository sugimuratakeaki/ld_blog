import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import SimpleApp from './SimpleApp';

const rootElement = document.getElementById('root');
console.log('Root element found:', rootElement);

if (!rootElement) {
  console.error('Root element not found!');
  document.body.innerHTML = '<h1>Error: Root element not found</h1>';
} else {
  const root = ReactDOM.createRoot(rootElement);
  console.log('ReactDOM.createRoot called');
  
  root.render(
    <React.StrictMode>
      <SimpleApp />
    </React.StrictMode>
  );
  console.log('root.render called');
}