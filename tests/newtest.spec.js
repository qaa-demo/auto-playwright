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
  openaiApiKey: '', // populate the OpenAI API key value
};

test("auto Playwright example - Guestbook App", async ({ page }) => {

  await page.goto(baseUrl);

  await auto("Click on the 'LOGIN' menu item", { page, test }, options, { debug: true })

  await page.waitForURL(loginPageUrl)

  await auto("Enter Username as 'Demouser' and enter Password as 'Demopass'", { page, test }, options)

  await auto("Submit the 'Login' button", { page, test }, options)

  await page.waitForURL(formPageUrl)

  await auto("Fill out 'name', 'email' and 'comment' fields only with realistic random values", { page, test }, options)

  await auto("Submit the 'Submit' button", { page, test }, options)

  await page.waitForURL("https://testautomationpro.com/aut/guest.php")

  await auto("Click the 'View your Guest Book Entry' link", { page, test }, options)

  await page.waitForURL("https://testautomationpro.com/aut/index.php#guestbook")

  await auto('validate if the above filled realistic values exist on the page', { page, test }, options)

  
});