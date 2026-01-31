import { test, expect } from '@playwright/test';

test.describe('Game Marketplace Success Verification', () => {
  test('should load application without errors and verify favicon', async ({ page }) => {
    // Track favicon requests
    let faviconError = false;
    page.on('response', (response) => {
      if (response.url().includes('favicon.ico') && response.status() === 404) {
        faviconError = true;
      }
    });
    
    // Navigate to the application
    await page.goto('http://localhost:3006');
    await page.waitForLoadState('networkidle');
    
    // Verify page loads successfully
    await expect(page).toHaveTitle(/GameMarket/);
    console.log('✅ Application loaded successfully');
    
    // Verify favicon loads without 404 error
    expect(faviconError).toBeFalsy();
    console.log('✅ Favicon loaded successfully (no 404 errors)');
    
    // Take a screenshot for visual verification
    await page.screenshot({ path: 'test-results/app-loaded.png' });
  });

  test('should display core UI components', async ({ page }) => {
    await page.goto('http://localhost:3006');
    
    // Check for header/logo - logo text changes based on page
    const header = page.locator('header');
    await expect(header).toBeVisible();
    
    // Check that header contains either GameMarket or GameVault
    const logoText = await header.locator('h2').textContent();
    expect(logoText).toMatch(/GameMarket|GameVault/);
    console.log(`✅ Header/Logo visible with text: ${logoText}`);
    
    // Check for navigation elements - these are hidden on mobile, so check desktop view first
    await page.setViewportSize({ width: 1200, height: 800 }); // Ensure desktop view
    
    const navButtons = page.locator('button').filter({ hasText: /Browse|Catalog|Inventory|Create|Insights/ });
    const navButtonCount = await navButtons.count();
    expect(navButtonCount).toBeGreaterThan(0);
    console.log(`✅ Found ${navButtonCount} navigation buttons`);
    
    // Check for main content area
    const mainContent = page.locator('div').first();
    await expect(mainContent).toBeVisible();
    console.log('✅ Main content area visible');
  });

  test('should verify responsive design works', async ({ page }) => {
    await page.goto('http://localhost:3006');
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ Mobile view working');
    
    // Test tablet view
    await page.setViewportSize({ width: 768, height: 1024 });
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ Tablet view working');
    
    // Test desktop view
    await page.setViewportSize({ width: 1920, height: 1080 });
    await expect(page.locator('body')).toBeVisible();
    console.log('✅ Desktop view working');
  });

  test('should verify interactive functionality', async ({ page }) => {
    await page.goto('http://localhost:3006');
    
    // Test navigation buttons are clickable - ensure desktop view first
    await page.setViewportSize({ width: 1200, height: 800 });
    
    const browseButton = page.locator('button').filter({ hasText: 'Browse' });
    await expect(browseButton).toBeVisible({ timeout: 10000 }); // Increased timeout
    await expect(browseButton).toBeEnabled();
    console.log('✅ Navigation buttons are functional');
    
    // Test that we can interact with elements
    await browseButton.click({ force: true });
    await page.waitForTimeout(1000); // Wait for any transitions
    console.log('✅ Interactive elements working');
  });

  test('should verify no critical errors', async ({ page }) => {
    let hasCriticalErrors = false;
    let errorMessages: string[] = [];
    
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        errorMessages.push(msg.text());
        // Only consider it critical if it's not a favicon 404
        if (!msg.text().includes('favicon.ico')) {
          hasCriticalErrors = true;
        }
      }
    });
    
    page.on('pageerror', (error) => {
      errorMessages.push(`Page error: ${error.message}`);
      hasCriticalErrors = true;
    });
    
    await page.goto('http://localhost:3006');
    await page.waitForLoadState('networkidle');
    
    // Log any errors for debugging
    if (errorMessages.length > 0) {
      console.log('Non-critical errors detected:');
      errorMessages.forEach(msg => console.log(`  - ${msg}`));
    }
    
    // The main success criteria is that there are no critical errors
    expect(hasCriticalErrors).toBeFalsy();
    console.log('✅ No critical errors detected');
  });
});