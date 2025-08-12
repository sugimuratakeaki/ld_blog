const http = require('http');

// Wait a bit for server to be ready
setTimeout(() => {
  http.get('http://localhost:8070', (res) => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('=== PAGE LOAD TEST ===');
      console.log('Status:', res.statusCode);
      console.log('Has root div:', data.includes('<div id="root">'));
      console.log('Has bundle.js:', data.includes('/static/js/bundle.js'));
      console.log('Page length:', data.length);
      
      // Check if React rendered
      const rootMatch = data.match(/<div id="root">(.*?)<\/div>/);
      if (rootMatch) {
        const rootContent = rootMatch[1];
        console.log('Root content length:', rootContent.length);
        console.log('Root is empty:', rootContent.trim() === '');
      }
    });
  }).on('error', (err) => {
    console.error('Error:', err.message);
  });
}, 1000);