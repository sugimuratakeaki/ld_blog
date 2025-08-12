const http = require('http');
const fs = require('fs');

console.log('=== DETAILED REACT APP TEST ===\n');

// First, get the HTML
http.get('http://localhost:8070', (res) => {
  let html = '';
  res.on('data', chunk => html += chunk);
  res.on('end', () => {
    console.log('1. HTML Response:');
    console.log('   - Status:', res.statusCode);
    console.log('   - Content-Type:', res.headers['content-type']);
    console.log('   - Has <div id="root">:', html.includes('<div id="root">'));
    console.log('   - Has bundle.js script:', html.includes('/static/js/bundle.js'));
    
    // Save HTML for inspection
    fs.writeFileSync('response.html', html);
    console.log('   - Full HTML saved to response.html\n');
    
    // Now check the bundle
    http.get('http://localhost:8070/static/js/bundle.js', (bundleRes) => {
      let bundle = '';
      bundleRes.on('data', chunk => bundle += chunk);
      bundleRes.on('end', () => {
        console.log('2. Bundle.js Response:');
        console.log('   - Status:', bundleRes.statusCode);
        console.log('   - Size:', bundle.length, 'bytes');
        console.log('   - Contains "index.tsx loaded":', bundle.includes('index.tsx loaded'));
        console.log('   - Contains "React is Working":', bundle.includes('React is Working'));
        console.log('   - Contains "ReactDOM.createRoot":', bundle.includes('ReactDOM.createRoot'));
        
        // Check for any errors in bundle
        const errorMatches = bundle.match(/console\.error\([^)]+\)/g);
        if (errorMatches) {
          console.log('   - Console errors found:', errorMatches.length);
        }
        
        console.log('\n3. Diagnosis:');
        if (!html.includes('<div id="root">')) {
          console.log('   ❌ Root element missing in HTML');
        } else if (!html.includes('/static/js/bundle.js')) {
          console.log('   ❌ Bundle script not included in HTML');
        } else if (bundleRes.statusCode !== 200) {
          console.log('   ❌ Bundle.js not loading (status:', bundleRes.statusCode, ')');
        } else if (!bundle.includes('index.tsx loaded')) {
          console.log('   ❌ Our code not in bundle - webpack may not be building correctly');
        } else {
          console.log('   ✓ HTML structure OK');
          console.log('   ✓ Bundle loading OK');
          console.log('   ✓ Our code is in bundle');
          console.log('   ⚠️  React may not be executing in browser');
          console.log('\n   Possible issues:');
          console.log('   - JavaScript errors preventing execution');
          console.log('   - React mounting issue');
          console.log('   - CSS hiding content');
          console.log('\n   Open http://localhost:8070 in browser and check:');
          console.log('   1. Browser console for errors');
          console.log('   2. Network tab to verify bundle.js loads');
          console.log('   3. Elements tab to see if React rendered anything');
        }
      });
    });
  });
});