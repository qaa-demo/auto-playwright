// Playwright Test 1
const { test, expect } = require('@playwright/test');

test('Google Search Test', async ({ page }) => {
    console.log('Test Run Start:', new Date().toLocaleString());
    // Navigate to Google Home page
    await page.goto('https://www.google.com/');

    // Enter a search term in a search field
    await page.fill('textarea[name=q]', 'Playwright Automated Testing');

    // Submit the search
    await page.press('textarea[name=q]', 'Enter');

    // Validate search results page title
    await expect(page).toHaveTitle('Playwright Automated Testing - Google Search');

    // Click the first result and log the URL and title of the page that opens to console
    const firstResult = await page.waitForSelector('a h3');
    await firstResult.click();
    await page.waitForLoadState('networkidle');
    console.log('Page URL:', page.url());
    console.log('Page Title:', await page.title());
});

// Playwright Test 2
test('Login Functionality Test', async ({ page }) => {
    console.log('Test Run Start:', new Date().toLocaleString());
    // Navigate to the login page
    await page.goto('https://the-internet.herokuapp.com/login');

    // Fill in the username and password fields
    await page.fill('input[name=username]', 'tomsmith');
    await page.fill('input[name=password]', 'SuperSecretPassword!');

    // Submit the form by clicking Login button
    await page.click('button[type=submit]');
    await page.waitForLoadState('networkidle');

    // Validate that the user is redirected a page that has h2 title 'Secure Area'
    await expect(page.locator('h2')).toHaveText('Secure Area');

    // Validate locator id=flash contains text
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    // Log the Page Title and Page Url
    console.log('Page URL:', page.url());
    console.log('Page Title:', await page.title());
});

// Playwright Test 3
test('Login and Logout Functionality Test', async ({ page }) => {
    console.log('Test Run Start:', new Date().toLocaleString());
    // Navigate to https://testautomationpro.com/aut/
    await page.goto('https://testautomationpro.com/aut/');

    // Click Login menu item to navigate to Login Form
    await page.click('text=Login');
    await page.waitForLoadState('networkidle');

    // Log the Page Title and Page Url
    console.log('Page URL:', page.url());
    console.log('Page Title:', await page.title());

    // Fill in the username and password fields and click Login button
    await page.fill('input[name="username"]', 'Demouser');
    await page.fill('input[name="password"]', 'Demopass');
    await page.click('input[name="Submit"]');
    await page.waitForLoadState('networkidle');

    // Validate that the user is redirected to form page that has h2 title 'Sign The Guestbook'
    await expect(page.locator('h2')).toHaveText('Sign The Guestbook');

    // Log the Page Title and Page Url
    console.log('Page URL:', page.url());
    console.log('Page Title:', await page.title());

    // Click Logout Demouser menu item
    await page.click('text=Logout Demouser');
    await page.waitForLoadState('networkidle');

    // Validate page has h1 title Guestbook Demo
    await expect(page.locator('h1')).toHaveText('Guestbook Demo');

    // Log the Page Title and Page Url
    console.log('Page URL:', page.url());
    console.log('Page Title:', await page.title());
});
