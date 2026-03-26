import { test, expect, chromium } from '@playwright/test';

test.describe('Test navigation Of Warehouse Website', async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/', {
      waitUntil: 'domcontentloaded',
    });
  });

  test(
    'To Navigate to Lounge page',
    {
      annotation: [
        {
          type: 'info',
          description: 'Creating an employee with same user details',
        },
        {
          type: 'issue',
          description: 'The employee details should be unique',
        },
      ],
      tag: ['@smoke', '@releasev1.2'],
    },
    async ({ page, browserName }) => {
      // test.skip(
      //   browserName == 'firefox',
      //   'The browser does not support the feature',
      // );

      await test.step('Hovering over category root', async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        var categoryRoot = page.locator('data-test-id=category-root');
        categoryRoot.hover();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        await page
          .locator('.mega-menu-root-list >> #category-homegarden')
          .hover();
      });

      await test.step('Clicking on Lounge link', async () => {
        await page.locator('a[role="menuitem"]:has-text("Lounge")').click();

        await expect(page.locator('.title')).toHaveText('Lounge Suites');

        await expect(page).toHaveTitle(
          'Lounge Suites - Couches, Lounge Chairs & Furniture',
        );
      });
    },
  );

  test('To Navigate to Car Electronics page', async ({ page, browserName }) => {
    test.skip(
      browserName == 'webkit',
      'The browser does not support the feature',
    );

    await test.step('Hovering over category root', async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      var categoryRoot = page.locator('data-test-id=category-root');
      categoryRoot.hover();
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await page.locator('.mega-menu-root-list >> #category-autodiy').hover();
    });

    await test.step('Clicking on Car Electronics link', async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await page
        .locator('a[role="menuitem"]:has-text("Car Electronics")')
        .click();

      await expect(page.locator('.title')).toHaveText('Car Electronics');
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    await page.screenshot({ path: `screenshots/${testInfo.title.trim()}.png` });
  });

  test('Navigating to Lounge of Warehouse site-ARIA locators', async ({
    page,
  }) => {
    //await page.getByRole('button', { name: 'Categories' }).hover();
    await page.getByTestId('category-root').hover();

    const homegarden = page
      .getByRole('link', { name: 'Home, Garden & Appliances' })
      .first();

    await new Promise((resolve) => setTimeout(resolve, 500));
    await homegarden.hover();
    await expect.soft(homegarden).toHaveId('category-homegarden');
    await page.getByRole('menuitem', { name: 'Lounge' }).click();

    //await expect.soft(homegarden).not.toBeVisible();
    //await expect.soft(homegarden).toBeHidden();

    await expect
      .soft(page.getByRole('heading', { name: 'Lounge Suites' }))
      .toHaveText('Lounge Suites');
    await expect
      .soft(page)
      .toHaveTitle('Lounge Suites - Couches, Lounge Chairs & Furniture');
  });
});
