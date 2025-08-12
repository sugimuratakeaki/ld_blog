import React from 'react';

function SimpleApp() {
  React.useEffect(() => {
    console.log('SimpleApp mounted!');
    // Also add visible indicator to DOM
    const indicator = document.createElement('div');
    indicator.id = 'react-mounted-indicator';
    indicator.textContent = 'React Mounted Successfully';
    indicator.style.cssText = 'position: fixed; top: 0; left: 0; background: green; color: white; padding: 10px; z-index: 9999;';
    document.body.appendChild(indicator);
  }, []);
  
  return (
    <div style={{ 
      backgroundColor: 'blue', 
      color: 'white', 
      padding: '50px',
      fontSize: '30px',
      textAlign: 'center',
      minHeight: '100vh'
    }}>
      <h1>REACT IS WORKING!</h1>
      <p>If you can see this blue screen with white text, React is rendering correctly.</p>
    </div>
  );
}

export default SimpleApp;