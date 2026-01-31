import { test, expect } from '@playwright/test';

test('Debug page structure', async ({ page }) => {
  // Capture console messages
  page.on('console', msg => console.log('Console:', msg.type(), msg.text()));
  page.on('pageerror', error => console.log('Page error:', error.message));
  
  await page.goto('http://localhost:3006');
  
  // Wait for page to load
  await page.waitForLoadState('networkidle');
  
  // Wait a bit more for React to render
  await page.waitForTimeout(2000);
  
  // Get page content
  const content = await page.content();
  console.log('Page content length:', content.length);
  
  // Check if header exists
  const headerExists = await page.locator('header').count();
  console.log('Header elements found:', headerExists);
  
  // Check if any buttons exist
  const buttonCount = await page.locator('button').count();
  console.log('Button elements found:', buttonCount);
  
  // List all button texts
  const buttonTexts = await page.locator('button').allTextContents();
  console.log('Button texts:', buttonTexts);
  
  // Take screenshot
  await page.screenshot({ path: 'test-results/debug-screenshot.png' });
});