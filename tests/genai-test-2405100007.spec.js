const { test, expect } = require('@playwright/test');

test('Google Search Test', async ({ page }) => {
    console.log('Test Run Start', new Date().toLocaleString());

    // Test steps:
    // - Navigate to Google Home page
    await page.goto('https://www.google.com');

    // - Enter a search term in a search field
    await page.fill('textarea[name=q]', 'Playwright Automated Testing');

    // - For search field, use locator textarea[name=q] and submit the search
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.press('textarea[name=q]', 'Enter')
    ]);

    // - Validate search results page title
    await expect(page).toHaveTitle('Playwright Automated Testing - Google Search');

    // - Click the first search result
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.click('#search .g:first-child a')
    ]);

    // - Log to console the URL and title of the page that opens
    console.log(await page.title());
    console.log(await page.url());
});

test('Login Functionality Test', async ({ page }) => {
    console.log('Test Run Start', new Date().toLocaleString());

    // Test steps:
    // - Navigate to the login page
    await page.goto('https://the-internet.herokuapp.com/login');

    // - Fill in the username and password fields
    await page.fill('input[id=username]', 'tomsmith');
    await page.fill('input[id=password]', 'SuperSecretPassword!');

    // - Submit the form by clicking Login button
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.click('button[type=submit]')
    ]);

    // - Validate that the user is redirected a page that has h2 title 'Secure Area'
    await expect(page.locator('h2')).toHaveText('Secure Area');
    
    // - validate locator id=flash contains text 'You logged into a secure area!'
    await expect(page.locator('#flash')).toContainText('You logged into a secure area!');

    // - Log the Page Title and Page Url
    console.log(await page.title());
    console.log(await page.url());
});

test('Guestbook App login Test', async ({ page }) => {
    console.log('Test Run Start', new Date().toLocaleString());

    // Test steps:
    // - Navigate to https://testautomationpro.com/aut/
    await page.goto('https://testautomationpro.com/aut/');

    // - Click 'Login' menu item to navigate to Login Form
    await page.click('text=Login');

    // - Log the Page Title and Page Url
    console.log(await page.title());
    console.log(await page.url());

    // - Fill in the username and password fields and click Login button
    await page.fill('input[name="username"]', 'Demouser');
    await page.fill('input[name="password"]', 'Demopass');
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.click('input[name="Submit"]')
    ]);

    // - Validate that the user is redirected to form page that has h2 title 'Sign The Guestbook'
    await expect(page.locator('h2')).toHaveText('Sign The Guestbook');

    // - Log the Page Title and Page Url
    console.log(await page.title());
    console.log(await page.url());

    // - Click 'Logout Demouser' menu item
    await Promise.all([
        page.waitForLoadState('networkidle'),
        page.click('text=Logout Demouser')
    ]);

    // - Validate page has h1 title Guestbook Demo
    await expect(page.locator('h1')).toHaveText('Guestbook Demo');

    // - Log the Page Title and Page Url
    console.log(await page.title());
    console.log(await page.url());
});
