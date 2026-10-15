import { chromium } from 'playwright';

const url = 'http://localhost:5173';

(async () => {
  const browser = await chromium.launch();
  
  const desktopPage = await browser.newPage({ viewport: { width: 1280, height: 1024 } });
  await desktopPage.goto(url, { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(3000);
  await desktopPage.screenshot({ 
    path: 'desktop-test.png', 
    fullPage: true 
  });
  console.log('✓ Desktop screenshot');
  await desktopPage.close();
  
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto(url, { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(3000);
  await mobilePage.screenshot({ 
    path: 'mobile-test.png', 
    fullPage: true 
  });
  console.log('✓ Mobile screenshot');
  await mobilePage.close();
  
  await browser.close();
})();
