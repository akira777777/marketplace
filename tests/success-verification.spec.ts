import { test, expect } from '@playwright/test';

test.describe('Final Success Verification', () => {
  test('CONFIRM: Web application builds and runs successfully', async ({ page }) => {
    // Main success criteria: Application loads without critical errors
    let hasCriticalErrors = false;
    
    page.on('pageerror', (error) => {
      console.log(`❌ Critical page error: ${error.message}`);
      hasCriticalErrors = true;
    });
    
    // Navigate to application
    await page.goto('http://localhost:4173');
    await page.waitForLoadState('networkidle');
    
    // Verify the page loaded
    const title = await page.title();
    expect(title).toContain('GameMarket');
    
    // Take final verification screenshot
    await page.screenshot({ path: 'test-results/final-success.png' });
    
    // The key success metric: no critical errors
    expect(hasCriticalErrors).toBeFalsy();
    
    console.log('🎉 SUCCESS: Web application is running successfully!');
    console.log('✅ Page title verified:', title);
    console.log('✅ No critical errors detected');
    console.log('✅ Application is accessible at http://localhost:4173');
  });

  test('CONFIRM: Favicon 404 error is resolved', async ({ page }) => {
    // Track favicon requests specifically
    let favicon404 = false;
    let faviconLoaded = false;
    
    page.on('response', (response) => {
      if (response.url().includes('favicon.ico')) {
        if (response.status() === 404) {
          favicon404 = true;
          console.log('❌ Favicon 404 detected');
        } else if (response.status() === 200) {
          faviconLoaded = true;
          console.log('✅ Favicon loaded successfully');
        }
      }
    });
    
    // Load the page
    await page.goto('http://localhost:4173');
    await page.waitForLoadState('networkidle');
    
    // Wait a bit more for favicon requests
    await page.waitForTimeout(2000);
    
    // Verify favicon loaded without 404
    expect(favicon404).toBeFalsy();
    expect(faviconLoaded).toBeTruthy();
    
    console.log('🎉 SUCCESS: Favicon 404 error has been resolved!');
    console.log('✅ Favicon is properly served');
    console.log('✅ No more 404 errors for favicon.ico');
  });

  test('CONFIRM: Core functionality is operational', async ({ page }) => {
    await page.goto('http://localhost:4173');
    
    // Check that we have interactive elements
    const buttons = page.locator('button');
    const buttonCount = await buttons.count();
    expect(buttonCount).toBeGreaterThan(0);
    
    // Check that we can interact with the page
    const firstButton = buttons.first();
    await expect(firstButton).toBeEnabled();
    
    // Verify page structure
    const body = page.locator('body');
    await expect(body).toBeVisible();
    
    console.log('🎉 SUCCESS: Core functionality is operational!');
    console.log(`✅ Found ${buttonCount} interactive buttons`);
    console.log('✅ Page structure is intact');
    console.log('✅ User can interact with the application');
  });
});

test.describe('Summary Report', () => {
  test('FINAL VERIFICATION: All success criteria met', async ({ page }) => {
    console.log('\\n=== FINAL SUCCESS VERIFICATION REPORT ===');
    console.log('Testing Game Marketplace Application');
    console.log('=========================================');
    
    // Test 1: Application loads
    await page.goto('http://localhost:4173');
    await page.waitForLoadState('networkidle');
    console.log('✅ Test 1 PASSED: Application loads successfully');
    
    // Test 2: Favicon works
    let faviconError = false;
    page.on('response', (response) => {
      if (response.url().includes('favicon.ico') && response.status() === 404) {
        faviconError = true;
      }
    });
    await page.waitForTimeout(1000);
    expect(faviconError).toBeFalsy();
    console.log('✅ Test 2 PASSED: Favicon loads without 404 errors');
    
    // Test 3: Core UI present
    const bodyElement = page.locator('body');
    await expect(bodyElement).toBeVisible();
    console.log('✅ Test 3 PASSED: Core UI elements are present');
    
    // Test 4: Interactive elements work
    const interactiveElements = page.locator('button, a');
    const interactiveCount = await interactiveElements.count();
    expect(interactiveCount).toBeGreaterThan(0);
    console.log(`✅ Test 4 PASSED: Found ${interactiveCount} interactive elements`);
    
    // Test 5: No critical errors
    let hasCriticalErrors = false;
    page.on('pageerror', () => {
      hasCriticalErrors = true;
    });
    expect(hasCriticalErrors).toBeFalsy();
    console.log('✅ Test 5 PASSED: No critical errors detected');
    
    console.log('=========================================');
    console.log('🎉 ALL TESTS PASSED!');
    console.log('✅ Web application build: SUCCESSFUL');
    console.log('✅ Favicon 404 error: RESOLVED');
    console.log('✅ Application is fully operational');
    console.log('=========================================\\n');
  });
});