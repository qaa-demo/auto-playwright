const { test, expect } = require('@playwright/test');  

// # Write a Playwright test in JavaScript using the test() method format.   
// # The test should test the login functionality on sample website with the login form https://the-internet.herokuapp.com/login and validate the result   
// # Test should navigate to Login Form page url https://the-internet.herokuapp.com/login  
// # test should enter tomsmith in the Username edit field  
// # Test should enter SuperSecretPassword! in the Password field  
// # Test should submit the Login button  
// # Test should validate secure page url https://the-internet.herokuapp.com/secure  
// # Test should validate page headline Secure Area is displayed on the page  
// # Test should validate page text You logged into a secure area! is displayed on the page
  
test('test login functionality on the sample website', async ({ page }) => {  
  // Navigate to Login Form page  
  await page.goto('https://the-internet.herokuapp.com/login');  

  // Enter username  
  await page.fill('input#username', 'tomsmith');  
  
  // Enter password  
  await page.fill('input#password', 'SuperSecretPassword!');  
  
  // Click Login button  
  await page.click('button[type="submit"]');  
  
  // Validate secure page URL  
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/secure');  
  
  // Validate page headline "Secure Area" is displayed  
  await expect(page.locator('h2')).toHaveText('Secure Area');  
  
  // Validate text "You logged into a secure area!" is displayed  
  await expect(page.locator('#flash')).toContainText('You logged into a secure area!');  
});   
  

  
// # Create Google Search test 
// # Initialize a test using the test method with a descriptive name, such as 'Google Search'.  
// # Use the page.goto method to navigate to https://www.google.com/.  
// # Locate the search field on the Google homepage by its name attribute, which is "q".  
// # Use the page.fill method to enter the search term "Playwright Test Automation" into this field.  
// # Simulate pressing the Enter key to submit the search query by using the page.press method, targeting the same search field.  
// # After submitting the search, ensure the search results page has fully loaded before proceeding by using page.waitForLoadState with the 'networkidle' parameter.  
// # Confirm that the search operation was successful and the expected result is displayed by verifying that the page title matches "Playwright Test Automation - Google Search" using the expect method.

test('Google search', async ({ page }) => {  
  // Navigate to the Google homepage  
  await page.goto('https://www.google.com/');  
  
  // Target the search field by its name attribute "q" and fill it with the search term  
  await page.fill('[name="q"]', 'Playwright Test Automation');  
    
  // Submit the search by pressing Enter  
  await page.press('[name="q"]', 'Enter');  
  
  // Wait for the page to load after submitting the search  
  await page.waitForLoadState('networkidle');  
  
  // Assert the page title is as expected  
  await expect(page).toHaveTitle('Playwright Test Automation - Google Search');  
});  



