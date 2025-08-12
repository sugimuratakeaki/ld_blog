import React from 'react';

export const TestComponent: React.FC = () => {
  React.useEffect(() => {
    console.log('TestComponent mounted!');
  }, []);
  
  return (
    <div style={{ 
      backgroundColor: 'red', 
      color: 'white', 
      padding: '20px',
      fontSize: '24px',
      fontWeight: 'bold' 
    }}>
      TEST: React is rendering!
    </div>
  );
};