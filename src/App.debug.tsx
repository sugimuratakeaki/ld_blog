import React, { useState, useEffect } from 'react';

function AppDebug() {
  const [debugInfo, setDebugInfo] = useState({
    mounted: false,
    error: null as Error | null,
    loadTime: new Date().toISOString(),
    components: {
      MaintenancePage: false,
      NotFoundPage: false,
      DemoPage: false
    }
  });

  useEffect(() => {
    console.log('App mounted successfully');
    setDebugInfo(prev => ({ ...prev, mounted: true }));
    
    // Test component imports
    try {
      const { MaintenancePage, NotFoundPage, DemoPage } = require('./components/pages');
      setDebugInfo(prev => ({
        ...prev,
        components: {
          MaintenancePage: !!MaintenancePage,
          NotFoundPage: !!NotFoundPage,
          DemoPage: !!DemoPage
        }
      }));
    } catch (error) {
      console.error('Component import error:', error);
      setDebugInfo(prev => ({ ...prev, error: error as Error }));
    }
  }, []);

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'monospace',
      backgroundColor: '#f0f0f0',
      minHeight: '100vh'
    }}>
      <h1 style={{ color: '#333' }}>React App Debug Info</h1>
      
      <div style={{
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h2>Status</h2>
        <p>Mounted: {debugInfo.mounted ? '✅ Yes' : '❌ No'}</p>
        <p>Load Time: {debugInfo.loadTime}</p>
        <p>React Version: {React.version}</p>
      </div>

      <div style={{
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h2>Components</h2>
        <p>MaintenancePage: {debugInfo.components.MaintenancePage ? '✅ Loaded' : '❌ Not Found'}</p>
        <p>NotFoundPage: {debugInfo.components.NotFoundPage ? '✅ Loaded' : '❌ Not Found'}</p>
        <p>DemoPage: {debugInfo.components.DemoPage ? '✅ Loaded' : '❌ Not Found'}</p>
      </div>

      {debugInfo.error && (
        <div style={{
          backgroundColor: '#ffcccc',
          padding: '15px',
          borderRadius: '5px',
          marginTop: '20px'
        }}>
          <h2>Error</h2>
          <pre>{debugInfo.error.message}</pre>
          <pre>{debugInfo.error.stack}</pre>
        </div>
      )}

      <div style={{
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h2>DOM Info</h2>
        <p>Root Element: {document.getElementById('root') ? '✅ Found' : '❌ Not Found'}</p>
        <p>Body Classes: {document.body.className || 'None'}</p>
        <p>Tailwind Loaded: {typeof (window as any).tailwind !== 'undefined' ? '✅ Yes' : '❌ No'}</p>
      </div>

      <div style={{
        backgroundColor: '#e6f3ff',
        padding: '15px',
        borderRadius: '5px',
        marginTop: '20px'
      }}>
        <h2>Visual Test</h2>
        <div className="bg-blue-500 text-white p-4 rounded">
          If this box is blue with white text, Tailwind CSS is working
        </div>
      </div>
    </div>
  );
}

export default AppDebug;