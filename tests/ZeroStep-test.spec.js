const { test, expect } = require('@playwright/test');
const { ai } = require('@zerostep/playwright');

test.describe('Guestbook', () => {
  
  test('Guestbook Login', async ({ page }) => {

    await page.goto('https://testautomationpro.com/aut/')

    await ai('Click on "Sign the Guesbook" menu item', { page, test })

    await ai('Fill login form with "Demouser" username and "Demopass" password', { page, test })

    await ai('Click the "Login" button', { page, test })

    const element = await page.getByText('Logout Demouser')

    expect(element).toBeVisible()

    await ai('Click on "Logout Demouser" menu item', { page, test })
  })
})
