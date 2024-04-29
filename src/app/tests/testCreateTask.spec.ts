import { test } from '@playwright/test';
import { chromium } from 'playwright';
import { getCreateProcessInstanzess } from '../components/startsprocess';

test('Create a Task', async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.getByRole('button', { name: 'Sign in with 5Minds Authority' }).click();
  await page.locator('input[name="username"]').fill("admin");
  await page.locator('input[name="password"]').fill("admin");
  await page.getByRole('button', { name: 'Login' }).click();
  await page.waitForTimeout(2000);
  await page.getByTestId('Create').click();
  await page.locator('input[name="description"]').fill("Test Beschreibung");
  await page.locator('select').selectOption({ label: 'Dringend' });
  await page.getByRole('button', { name: 'Create Task' }).click();
  await page.waitForTimeout(2000);
  await page.getByTestId('ReviewCreateTask').click();
  await page.waitForTimeout(2500);
  await page.getByTestId('tick').click();
  await page.waitForTimeout(2000);
  await page.getByTestId('tick').click();
  await page.waitForTimeout(2000);
  await page.getByTestId('ReviewFinishTask').click();
  await page.waitForTimeout(2000);
  await page.getByTestId('tick').click();
  await page.waitForTimeout(2000);
  await page.getByTestId('Historie').click();
})
