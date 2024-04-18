const { test, expect } = require("@playwright/test");
const { auto } = require("auto-playwright");

const baseUrl = 'https://testautomationpro.com/aut'
const loginPageUrl = baseUrl + '/login.php'
const formPageUrl = baseUrl + '/form.php'

const options = {
  // If true, debugging information is printed in the console.
  debug: false,
  // The OpenAI model (https://platform.openai.com/docs/models/overview)
  model: "gpt-3.5-turbo",
  // The OpenAI API key
  openaiApiKey: '', // populate with your OpenAI API key
};

test("auto Playwright example - Guestbook App", async ({ page }) => {

  await page.goto(baseUrl);

  await auto("Click on the 'LOGIN' menu item", { page, test }, options)

  await page.waitForURL(loginPageUrl)

  await auto("Enter Username as 'Demouser' and enter Password as 'Demopass'", { page, test }, options)

  await auto("Submit the 'Login' button", { page, test }, options)

  await page.waitForURL(formPageUrl)

  await auto("Fill out 'name' field  with a realistic value", { page, test }, options)
  await auto("Fill out 'email' field  with a realistic value", { page, test }, options)
  await auto("Fill out 'comment' field  with a realistic value", { page, test }, options)

  await auto("Submit the 'Submit' button", { page, test }, options)

  await page.waitForURL("https://testautomationpro.com/aut/guest.php")

  await auto("Click the 'View your Guest Book Entry' link", { page, test }, options)

  await page.waitForURL("https://testautomationpro.com/aut/index.php#guestbook")

  await auto("Validate page title says 'Guesbook' ", { page, test }, options)

  await auto('Name entered during registratin is on the page', { page, test }, options)

await auto("Click on the 'LOGOUT DEMOUSER' menu item", { page, test }, options)
  
});