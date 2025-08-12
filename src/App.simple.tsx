import React from 'react';

function AppSimple() {
  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f0f0', minHeight: '100vh' }}>
      <h1 style={{ color: '#333' }}>React App is Working!</h1>
      <p>If you can see this, React is rendering correctly.</p>
      <div className="bg-blue-500 text-white p-4 rounded mt-4">
        This box should be blue if Tailwind CSS is working
      </div>
    </div>
  );
}

export default AppSimple;