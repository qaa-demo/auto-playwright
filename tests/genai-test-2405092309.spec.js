const { test, expect } = require('@playwright/test');

// Playwright Test 1
test('Google Search Test', async ({ page }) => {
    // Navigate to Google Home page
    await page.goto('https://www.google.com');

    // Enter a search term in a search field and submit the search
    await page.fill('textarea[name=q]', 'Playwright Automated Testing');
    await page.press('textarea[name=q]', 'Enter');

    // Wait for network idle to ensure search results are loaded
    await page.waitForLoadState('networkidle');

    // Validate search results page title
    await expect(page).toHaveTitle('Playwright Automated Testing - Google Search');

    // Click the first search result
    await page.click('(//a/h3)[1]');

    // Log to console the URL and title of the page that opens
    console.log('Test Run Start', new Date().toLocaleString());
    console.log('URL:', page.url());
    console.log('Title:', await page.title());
});

// Playwright Test 2
test('Login Functionality Test on Herokuapp', async ({ page }) => {
    // Navigate to the login page
    await page.goto('https://the-internet.herokuapp.com/login');

    // Fill in the username and password fields
    await page.fill('input#username', 'tomsmith');
    await page.fill('input#password', 'SuperSecretPassword!');

    // Submit the form by clicking Login button
    await page.click('button[type=submit]');

    // Wait for network idle to ensure navigation is complete
    await page.waitForLoadState('networkidle');

    // Validate that the user is redirected a page that has h2 title 'Secure Area' 
    await expect(page.locator('h2')).toHaveText('Secure Area');

    // validate locator id=flash contains text 'You logged into a secure area!'
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    // Log the Page Title and Page Url
    console.log('Test Run Start', new Date().toLocaleString());
    console.log('Page Title:', await page.title());
    console.log('Page URL:', page.url());
});

// Playwright Test 3
test('Login and Logout on TestAutomationPro', async ({ page }) => {
    // Navigate to https://testautomationpro.com/aut/
    await page.goto('https://testautomationpro.com/aut/');

    // Click 'Login' menu item to navigate to Login Form
    await page.click('text=Login');

    // Log the Page Title and Page Url
    console.log('Test Run Start', new Date().toLocaleString());
    console.log('Page Title:', await page.title());
    console.log('Page URL:', page.url());

    // Fill in the username and password fields and click Login button
    await page.fill('input[name="username"]', 'Demouser');
    await page.fill('input[name="password"]', 'Demopass');
    await page.click('input[type="submit"]');

    // Wait for network idle after login
    await page.waitForLoadState('networkidle');

    // Validate that the user is redirected to form page that has h2 title 'Sign The Guestbook'
    await expect(page.locator('h2')).toHaveText('Sign The Guestbook');

    // Log the Page Title and Page Url
    console.log('Page Title:', await page.title());
    console.log('Page URL:', page.url());

    // Click 'Logout Demouser' menu item
    await page.click('text=Logout Demouser');

    // Wait for network idle after logout
    await page.waitForLoadState('networkidle');

    // Validate page has h1 title Guestbook Demo
    await expect(page.locator('h1')).toHaveText('Guestbook Demo');

    // Log the Page Title and Page Url
    console.log('Page Title:', await page.title());
    console.log('Page URL:', page.url());
});
