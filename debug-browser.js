const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching browser to debug React app...');
  
  try {
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();
    
    // Enable console log capture
    page.on('console', msg => {
      console.log('Browser console:', msg.type(), '-', msg.text());
    });
    
    page.on('error', err => {
      console.error('Browser error:', err);
    });
    
    page.on('pageerror', err => {
      console.error('Page error:', err);
    });
    
    await page.goto('http://localhost:8070', { waitUntil: 'networkidle2' });
    
    // Wait a bit for React to mount
    await page.waitForTimeout(2000);
    
    // Check the content
    const content = await page.evaluate(() => {
      const root = document.getElementById('root');
      return {
        rootExists: !!root,
        rootHTML: root ? root.innerHTML : 'No root',
        rootChildren: root ? root.children.length : 0,
        bodyBgColor: document.body.style.backgroundColor,
        hasReactRoot: !!(root && root._reactRootContainer),
        documentTitle: document.title,
        scriptsLoaded: Array.from(document.scripts).map(s => s.src || 'inline').filter(s => s.includes('bundle'))
      };
    });
    
    console.log('Page analysis:', JSON.stringify(content, null, 2));
    
    await browser.close();
  } catch (error) {
    console.error('Error:', error.message);
    console.log('Note: puppeteer may not be installed. Installing...');
    
    // Try with simple HTTP request to check console
    const http = require('http');
    http.get('http://localhost:8070/static/js/bundle.js', (res) => {
      console.log('Bundle.js status:', res.statusCode);
      console.log('Bundle.js headers:', res.headers['content-type']);
    });
  }
})();