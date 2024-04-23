const { test, expect } = require('@playwright/test');

test('Google Search Test', async ({ page }) => {
    console.log(`Test Run Start: ${new Date().toLocaleString()}`);
    // Navigate to Google Home page
    await page.goto('https://www.google.com/');
    // Enter 'Playwright Automated Testing' in the search field
    await page.fill('textarea[name=q]', 'Playwright Automated Testing');
    // Submit the search
    await page.keyboard.press('Enter');
    // Wait for network to be idle after submitting the search
    await page.waitForLoadState('networkidle');
    // Validate search results page title
    await expect(page).toHaveTitle('Playwright Automated Testing - Google Search');
    // Click the first result and log the URL and title of the page that opens
    await page.click('#search a');
    await page.waitForLoadState('networkidle');
    console.log(`URL: ${page.url()}`);
    console.log(`Title: ${await page.title()}`);
});

test('Login Functionality Test', async ({ page }) => {
    console.log(`Test Run Start: ${new Date().toLocaleString()}`);
    // Navigate to the login page
    await page.goto('https://the-internet.herokuapp.com/login');
    // Fill in username and password fields
    await page.fill('input#username', 'tomsmith');
    await page.fill('input#password', 'SuperSecretPassword!');
    // Submit the form by clicking Login button
    await page.click('button[type=submit]');
    // Wait for network to be idle after login
    await page.waitForLoadState('networkidle');
    // Validate that the user is redirected to a secure area
    await expect(page.locator('h2')).toHaveText('Secure Area');
    // Validate locator id=flash contains the text
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
});

test('Login Test and Navigate Through Pages', async ({ page }) => {
    console.log(`Test Run Start: ${new Date().toLocaleString()}`);
    // Navigate to test automation practice site
    await page.goto('https://testautomationpro.com/aut/');
    // Click Login menu item to navigate to Login Form
    await page.click('text=Login');
    await page.waitForLoadState('networkidle');
    // Log the Page Title and Page Url
    console.log(`Title: ${await page.title()}`);
    console.log(`URL: ${page.url()}`);
    // Fill in username and password fields and click Login button
    await page.fill('input[name="username"]', 'Demouser');
    await page.fill('input[name="password"]', 'Demopass');
    await page.click('input[name="Submit"]');
    // Wait for network to be idle after login
    await page.waitForLoadState('networkidle');
    // Validate that the user is redirected to the form page with title 'Sign The Guestbook'
    await expect(page.locator('h2')).toHaveText('Sign The Guestbook');
    // Log the Page Title and Page Url
    console.log(`Title: ${await page.title()}`);
    console.log(`URL: ${page.url()}`);
    // Click Logout Demouser menu item
    await page.click('text=Logout Demouser');
    await page.waitForLoadState('networkidle');
    // Validate page has h1 title Guestbook Demo
    await expect(page.locator('h1')).toHaveText('Guestbook Demo');
    // Log the Page Title and Page Url
    console.log(`Title: ${await page.title()}`);
    console.log(`URL: ${page.url()}`);
});
