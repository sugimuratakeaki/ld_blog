import React, { useState } from 'react';
import { MaintenancePage, NotFoundPage, DemoPage, IndividualBlogPage } from './components/pages';

type PageType = 'maintenance' | 'notfound' | 'demo' | 'individualblog';
type DeviceType = 'desktop' | 'mobile';

function App() {
  console.log('🚀 App component rendering');
  const [currentPage, setCurrentPage] = useState<PageType>('individualblog');
  const [currentDevice, setCurrentDevice] = useState<DeviceType>('desktop');
  
  console.log('📱 Current state:', { currentPage, currentDevice });

  const renderPage = () => {
    const isMobile = currentDevice === 'mobile';
    
    switch (currentPage) {
      case 'maintenance':
        return <MaintenancePage isMobile={isMobile} />;
      case 'notfound':
        return <NotFoundPage isMobile={isMobile} />;
      case 'demo':
        return <DemoPage isMobile={isMobile} />;
      case 'individualblog':
        return <IndividualBlogPage isMobile={isMobile} />;
      default:
        return <MaintenancePage isMobile={isMobile} />;
    }
  };

  // Fallback test content for debugging (disabled by default)
  if (window.location.search.includes('debug')) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        backgroundColor: '#f0f0f0', 
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}>
        <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>
          🎯 React App Debug Mode
        </h1>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <p><strong>Current Page:</strong> {currentPage}</p>
          <p><strong>Current Device:</strong> {currentDevice}</p>
          <p><strong>React Version:</strong> {React.version}</p>
          <p><strong>Status:</strong> ✅ React is rendering successfully!</p>
        </div>
        
        {/* Demo Controls */}
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
          <h3 style={{ marginBottom: '15px' }}>Controls:</h3>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Page:</label>
            <select 
              value={currentPage} 
              onChange={(e) => setCurrentPage(e.target.value as PageType)}
              style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="individualblog">Individual Blog</option>
              <option value="maintenance">Maintenance</option>
              <option value="notfound">Not Found</option>
              <option value="demo">Layout Demo</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px' }}>Device:</label>
            <select 
              value={currentDevice} 
              onChange={(e) => setCurrentDevice(e.target.value as DeviceType)}
              style={{ padding: '5px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
        </div>

        <button 
          onClick={() => window.location.search = '?production=true'}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Switch to Production Layout
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Demo Controls */}
      <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
        <div className="flex flex-col gap-2">
          <div>
            <label className="block text-sm font-medium mb-1">Page:</label>
            <select 
              value={currentPage} 
              onChange={(e) => setCurrentPage(e.target.value as PageType)}
              className="border rounded px-2 py-1"
            >
              <option value="individualblog">Individual Blog</option>
              <option value="maintenance">Maintenance</option>
              <option value="notfound">Not Found</option>
              <option value="demo">Layout Demo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Device:</label>
            <select 
              value={currentDevice} 
              onChange={(e) => setCurrentDevice(e.target.value as DeviceType)}
              className="border rounded px-2 py-1"
            >
              <option value="desktop">Desktop</option>
              <option value="mobile">Mobile</option>
            </select>
          </div>
        </div>
      </div>

      {/* Page Content */}
      {renderPage()}
    </div>
  );
}

export default App;