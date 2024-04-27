import { test, expect } from '@playwright/test';

test('Create a Task', async ({ page }) => {
  await page.goto('http://localhost:3000/');
  page.getByRole('listitem')
    .filter({ hasText: 'Create' })
//   await page.getByRole('button', { name: 'Open user menu' }).click();
//   await page.getByRole('menuitem', { name: 'Einloggen →' }).click();

//   await page.getByRole('button', { name: 'Registrieren' }).click();
//   await page.waitForLoadState('load', { timeout: 30000 });

//   await page.locator('input[name="vorname"]').fill('TestVorname');
//   const enterDataUrl = page.url();
//   const instanceAsEmail = enterDataUrl.substring(35, 71) + '@test.de';
//   const urlWithoutEnterData = enterDataUrl.substring(0, enterDataUrl.length - 10);
//   const verifyEmailUrl = urlWithoutEnterData + 'verify_email';
//   await page.locator('input[name="nachname"]').fill('TestNachname');
//   await page.locator('input[name="unternehmen"]').fill('TestUnternehmen');
//   await page.locator('input[name="email"]').fill(instanceAsEmail);
//   await page.locator('input[name="password"]').fill('TestPassword123');
//   await page.locator('input[name="password-repeat"]').fill('TestPassword123');
//   await page.getByRole('button', { name: 'Registrieren' }).click();

//   await page.waitForLoadState('load', { timeout: 30000 });
//   await expect(page).toHaveURL(urlWithoutEnterData + 'confirm_email_sending');
//   await page.getByRole('button', { name: 'Verstanden' }).click();

//   await expect(page).toHaveURL('http://localhost:3000');
//   await page.goto(verifyEmailUrl, { timeout: 30000 });

//   await page.waitForLoadState('load', { timeout: 30000 });
//   await page.getByRole('button', { name: 'Email bestätigen' }).click();

//   await page.waitForLoadState('load', { timeout: 30000 });
//   await expect(page).toHaveURL('http://localhost:3000/');
//   await page.getByRole('button', { name: 'Open user menu' }).click();
//   await page.getByRole('menuitem', { name: 'Einloggen →' }).click();

//   await page.getByRole('button', { name: 'Einloggen' }).click();

//   await page.locator('input[name="username"]').fill(instanceAsEmail);
//   await page.locator('input[name="password"]').fill('TestPassword123');
//   await page.locator('input[value="Login"]').click();

//   await page.waitForLoadState('load', { timeout: 30000 });
//   const okButtonAuthority = page.locator('input[value="OK"]');
//   if (await okButtonAuthority.isVisible()) {
//     await page.locator('input[value="OK"]').click();
//   }

//   await page.getByRole('button', { name: 'Open user menu ' }).click();
//   await expect(page.getByText(instanceAsEmail)).toBeVisible();
});
