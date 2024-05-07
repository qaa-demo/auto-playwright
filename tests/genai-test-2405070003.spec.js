const { test, expect } = require('@playwright/test');

test('Google Search Functionality', async ({ page }) => {
    console.log('Test Run Start', new Date().toLocaleString());
    // Navigate to Google Home page
    await page.goto('https://www.google.com');

    // Enter a search term in a search field
    await page.fill('textarea[name=q]', 'Playwright Automated Testing');

    // Submit the search
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.press('textarea[name=q]', 'Enter'),
    ]);

    // Validate search results page title
    await expect(page).toHaveTitle('Playwright Automated Testing - Google Search');

    // Click the first result and log the URL and title of the page that opens to console
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.click('h3')
    ]);
    console.log('Page URL:', page.url());
    console.log('Page Title:', await page.title());
});

test('Login Functionality Test on Herokuapp', async ({ page }) => {
    console.log('Test Run Start', new Date().toLocaleString());
    // Navigate to the login page
    await page.goto('https://the-internet.herokuapp.com/login');

    // Fill in the username and password fields
    await page.fill('input[id=username]', 'tomsmith');
    await page.fill('input[id=password]', 'SuperSecretPassword!');

    // Submit the form by clicking Login button
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.click('button[type=submit]')
    ]);

    // Validate that the user is redirected to a page that has a h2 title 'Secure Area'
    await expect(page.locator('h2')).toHaveText('Secure Area');

    // Validate locator id=flash contains text 'You logged into a secure area!'
    await expect(page.locator('id=flash')).toContainText('You logged into a secure area!');

    // Log the Page Title and Page Url
    console.log('Page URL:', page.url());
    console.log('Page Title:', await page.title());
});

test('Test Automation Pro Login and Logout', async ({ page }) => {
    console.log('Test Run Start', new Date().toLocaleString());
    // Navigate to https://testautomationpro.com/aut/
    await page.goto('https://testautomationpro.com/aut/');

    // Click 'Login' menu item to navigate to Login Form
    await page.click('text=Login');

    // Log the Page Title and Page Url
    console.log('Login Page URL:', page.url());
    console.log('Login Page Title:', await page.title());

    // Fill in the username and password fields and click Login button
    await page.fill('input[name="username"]', 'Demouser');
    await page.fill('input[name="password"]', 'Demopass');
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.click('input[name="Submit"]')
    ]);

    // Validate that the user is redirected to a form page that has h2 title 'Sign The Guestbook'
    await expect(page.locator('h2')).toHaveText('Sign The Guestbook');

    // Log the Page Title and Page Url
    console.log('Guestbook Page URL:', page.url());
    console.log('Guestbook Page Title:', await page.title());

    // Click 'Logout Demouser' menu item
    await page.click('text=Logout Demouser');
    
    // Validate page has h1 title Guestbook Demo
    await expect(page.locator('h1')).toHaveText('Guestbook Demo');

    // Log the Page Title and Page Url
    console.log('Logged out Page URL:', page.url());
    console.log('Logged out Page Title:', await page.title());
});
