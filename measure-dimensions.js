import { chromium } from 'playwright';

async function measurePage(url, width) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width, height: 800 });
  await page.goto(url);
  await page.waitForTimeout(2000); // Wait for animations
  
  const measurements = await page.evaluate(() => {
    const sections = [
      { name: 'Hero', selector: 'section:nth-of-type(1)' },
      { name: 'Stack', selector: 'section:nth-of-type(2)' },
      { name: 'AI', selector: 'section:nth-of-type(3)' },
      { name: 'Architecture', selector: 'section:nth-of-type(4)' },
      { name: 'Contacts', selector: 'section:nth-of-type(5)' },
    ];
    
    const results = {};
    results.pageHeight = document.documentElement.scrollHeight;
    
    sections.forEach(({ name, selector }) => {
      const el = document.querySelector(selector);
      if (el) {
        const rect = el.getBoundingClientRect();
        results[name] = {
          top: Math.round(rect.top + window.scrollY),
          height: Math.round(rect.height)
        };
      }
    });
    
    return results;
  });
  
  await browser.close();
  return measurements;
}

async function main() {
  console.log('Measuring dimensions...\n');
  
  const widths = [1280, 390];
  const mainUrl = 'http://localhost:4173';  // main branch on port 4173
  const branchUrl = 'http://localhost:4174'; // tailwind branch on port 4174
  
  for (const width of widths) {
    console.log(`\n=== ${width}px Width ===\n`);
    
    const mainMeasurements = await measurePage(mainUrl, width);
    const branchMeasurements = await measurePage(branchUrl, width);
    
    console.log(`Page Height:`);
    console.log(`  Main:   ${mainMeasurements.pageHeight}px`);
    console.log(`  Branch: ${branchMeasurements.pageHeight}px`);
    console.log(`  Diff:   ${branchMeasurements.pageHeight - mainMeasurements.pageHeight}px`);
    
    console.log(`\nSection Measurements:`);
    console.log(`Section         | Main (top/height) | Branch (top/height) | Diff (top/height)`);
    console.log(`----------------|-------------------|---------------------|-------------------`);
    
    ['Hero', 'Stack', 'AI', 'Architecture', 'Contacts'].forEach(section => {
      const main = mainMeasurements[section];
      const branch = branchMeasurements[section];
      if (main && branch) {
        const topDiff = branch.top - main.top;
        const heightDiff = branch.height - main.height;
        console.log(`${section.padEnd(15)} | ${main.top}/${main.height}`.padEnd(19) + 
                    ` | ${branch.top}/${branch.height}`.padEnd(21) + 
                    ` | ${topDiff}/${heightDiff}`);
      }
    });
  }
}

main().catch(console.error);
