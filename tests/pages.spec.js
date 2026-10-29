const { test, expect } = require('@playwright/test');

const pages = [
  { path: '/index.html', heading: 'Find the best talent' },
  { path: '/about.html', heading: 'About' },
  { path: '/contact.html', heading: 'Contact' },
];

const layouts = [
  { name: 'desktop', width: 1440, height: 900, columns: 3, stacked: false },
  { name: 'tablet', width: 768, height: 1024, columns: 2, stacked: true },
  { name: 'mobile', width: 375, height: 812, columns: 1, stacked: true },
];

for (const layout of layouts) {
  test.describe(layout.name, () => {
    test.use({ viewport: { width: layout.width, height: layout.height } });

    for (const destination of pages) {
      test(`${destination.path} loads and fits the viewport`, async ({ page }) => {
        const errors = [];
        page.on('pageerror', error => errors.push(error.message));
        const response = await page.goto(destination.path);
        expect(response.ok()).toBeTruthy();
        await expect(page.getByRole('heading', { level: 1 })).toHaveText(destination.heading);
        await expect(page.locator('main')).toBeVisible();
        await expect(page.locator('footer')).toBeVisible();
        await page.evaluate(() => document.fonts.ready);

        const widths = await page.evaluate(() => ({
          content: document.documentElement.scrollWidth,
          viewport: document.documentElement.clientWidth,
        }));
        expect(widths.content, 'Page should not scroll horizontally').toBeLessThanOrEqual(widths.viewport + 1);

        if (destination.path === '/about.html') {
          const cards = await page.locator('.director').evaluateAll(elements =>
            elements.map(element => ({ x: element.getBoundingClientRect().x, y: element.getBoundingClientRect().y })));
          const firstRow = cards.filter(card => Math.abs(card.y - cards[0].y) < 2);
          expect(firstRow).toHaveLength(layout.columns);
        } else {
          const selector = destination.path === '/index.html' ? '.hero-two-column' : '.two-column-contact';
          const boxes = await page.locator(selector).evaluate(element =>
            [...element.children].map(child => {
              const { x, y, width, height } = child.getBoundingClientRect();
              return { x, y, width, height };
            }));
          if (layout.stacked) {
            expect(boxes[1].y).toBeGreaterThanOrEqual(boxes[0].y + boxes[0].height - 1);
          } else {
            expect(boxes[1].x).toBeGreaterThanOrEqual(boxes[0].x + boxes[0].width - 1);
          }
        }
        expect(errors, 'Page should load without uncaught JavaScript errors').toEqual([]);
      });
    }

    test('primary links navigate Home → About → Contact → Home', async ({ page }) => {
      await page.goto('/index.html');
      for (const [name, path] of [['About', '/about.html'], ['Contact Us', '/contact.html'], ['Home', '/index.html']]) {
        const nav = page.locator('#primary-nav');
        if (layout.name === 'mobile') {
          const opener = page.getByRole('button', { name: 'Open Navigation', exact: true });
          await expect(nav).toBeHidden();
          await opener.click();
          await expect(opener).toHaveAttribute('aria-expanded', 'true');
          await expect(page.getByRole('button', { name: 'Close Navigation' })).toBeFocused();
        }
        await nav.getByRole('link', { name, exact: true }).click();
        await expect(page).toHaveURL(new RegExp(`${path}$`));
      }
    });

    if (layout.name === 'mobile') {
      test('navigation closes and returns focus to its opener', async ({ page }) => {
        await page.goto('/index.html');
        const opener = page.getByRole('button', { name: 'Open Navigation', exact: true });
        await opener.click();
        await page.getByRole('button', { name: 'Close Navigation' }).click();
        await expect(page.locator('#primary-nav')).toBeHidden();
        await expect(opener).toHaveAttribute('aria-expanded', 'false');
        await expect(opener).toBeFocused();
      });
    }
  });
}
