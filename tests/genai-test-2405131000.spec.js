const { test, expect } = require('@playwright/test');

// Test 1: Google Search
test('Google Search Test', async ({ page }) => {
    console.log('Test Run Start', new Date().toLocaleString());

    // Navigate to Google Home page
    await page.goto('https://www.google.com');

    // Enter a search term in a search field
    await page.fill('textarea[name="q"]', 'Playwright Automated Testing');

    // Submit the search
    await page.press('textarea[name="q"]', 'Enter');
    await page.waitForLoadState('networkidle');

    // Validate search results page title
    await expect(page).toHaveTitle('Playwright Automated Testing - Google Search');

    // Click the first search result
    await page.click('#search a');

    // Log to console the URL and title of the page that opens
    console.log('URL:', page.url());
    console.log('Title:', await page.title());
});

// Test 2: Login Functionality
test('Login Functionality Test', async ({ page }) => {
    console.log('Test Run Start', new Date().toLocaleString());

    // Navigate to the login page
    await page.goto('https://the-internet.herokuapp.com/login');

    // Fill in the username and password fields
    await page.fill('input#username', 'tomsmith');
    await page.fill('input#password', 'SuperSecretPassword!');

    // Submit the form by clicking Login Button
    await page.click('button[type="submit"]');
    await page.waitForLoadState('networkidle');

    // Validate redirect to 'Secure Area'
    await expect(page.locator('h2')).toHaveText('Secure Area');

    // Validate success message
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    // Log the Page Title and Page Url
    console.log('Page Title:', await page.title());
    console.log('Page Url:', page.url());
});

// Test 3: Guestbook App Login
test('Guestbook App Login Test', async ({ page }) => {
    console.log('Test Run Start', new Date().toLocaleString());

    // Navigate to Guestbook app
    await page.goto('https://testautomationpro.com/aut/');

    // Click 'Login' menu item
    await page.click('text=Login');
    await page.waitForLoadState('networkidle');

    // Log the Page Title and Page Url
    console.log('Page Title:', await page.title());
    console.log('Page Url:', page.url());

    // Fill in the username and password fields and click Login button
    await page.fill('input[name="username"]', 'Demouser');
    await page.fill('input[name="password"]', 'Demopass');
    await page.click('input[name="Submit"]');
    await page.waitForLoadState('networkidle');

    // Validate redirect to 'Sign The Guestbook'
    await expect(page.locator('h2')).toHaveText('Sign The Guestbook');

    // Log the Page Title and Page Url
    console.log('Page Title:', await page.title());
    console.log('Page Url:', page.url());

    // Click 'Logout Demouser' menu item
    await page.click('text=Logout Demouser');
    await page.waitForLoadState('networkidle');

    // Validate page has h1 title Guestbook Demo
    await expect(page.locator('h1')).toHaveText('Guestbook Demo');

    // Log the Page Title and Page Url
    console.log('Page Title:', await page.title());
    console.log('Page Url:', page.url());
});
