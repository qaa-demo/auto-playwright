const { test, expect } = require('@playwright/test');

// Test 1: Google Search
test('Google Search Test', async ({ page }) => {
    console.log('Test Run Start', new Date().toLocaleString());
    // Navigate to Google Home page
    await page.goto('https://www.google.com');

    // Enter a search term in a search field
    await page.fill('textarea[name="q"]', 'Playwright Automated Testing');

    // Submit the search
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.press('textarea[name="q"]', 'Enter')
    ]);

    // Validate search results page title
    expect(await page.title()).toBe('Playwright Automated Testing - Google Search');

    // Click the first result and log the URL and title of the page that opens
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.click('h3')
    ]);
    console.log('URL:', page.url());
    console.log('Title:', await page.title());
});


// Test 2: Login Functionality
test('Login Functionality Test', async ({ page }) => {
    console.log('Test Run Start', new Date().toLocaleString());
    // Navigate to the login page
    await page.goto('https://the-internet.herokuapp.com/login');

    // Fill in the username and password fields
    await page.fill('input[id="username"]', 'tomsmith');
    await page.fill('input[id="password"]', 'SuperSecretPassword!');

    // Submit the form by clicking Login button
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.click('button[type="submit"]')
    ]);

    // Validate that the user is redirected to a page with h2 title 'Secure Area'
    await expect(page.locator('h2')).toHaveText('Secure Area');

    // validate locator id=flash contains text 'You logged into a secure area!'
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    // Log the Page Title and Page URL
    console.log('Page Title:', await page.title());
    console.log('Page URL:', page.url());
});


// Test 3: Login Functionality with Redirection
test('Login and Redirection Test', async ({ page }) => {
    console.log('Test Run Start', new Date().toLocaleString());
    // Navigate to https://testautomationpro.com/aut/
    await page.goto('https://testautomationpro.com/aut/');

    // Click Login menu item to navigate to Login Form
    await page.click('text=Login');
    await page.waitForLoadState('networkidle');

    // Log the Page Title and Page Url
    console.log('Page Title before login:', await page.title());
    console.log('Page URL before login:', page.url());

    // Fill in the username and password fields and click Login button
    await page.fill('input[name="username"]', 'Demouser');
    await page.fill('input[name="password"]', 'Demopass');
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.click('input[name="Submit"]')
    ]);

    // Validate that the user is redirected to form page that has h2 title 'Sign The Guestbook'
    await expect(page.locator('h2')).toHaveText('Sign The Guestbook');
 
    // Log the Page Title and Page Url
    console.log('Page Title after login:', await page.title());
    console.log('Page URL after login:', page.url());

    // Click Logout Demouser menu item
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.click('text=Logout Demouser')
    ]);

    // Validate page has h1 title Guestbook Demo
    await expect(page.locator('h1')).toHaveText('Guestbook Demo');

    // Log the Page Title and Page Url
    console.log('Page Title after logout:', await page.title());
    console.log('Page URL after logout:', page.url());
});
