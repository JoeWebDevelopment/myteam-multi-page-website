const { test, expect } = require('@playwright/test');

const directors = [
  ['Nikita Marks', 'nikita-details', 'It always amazes me'],
  ['Cristian Duncan', 'cristian-details', 'Distributed teams required unique processes'],
  ['Cruz Hamer', 'cruz-details', 'Technology is at the forefront'],
  ['Drake Heaton', 'Drake-details', 'Hiring similar people'],
  ['Griffin Wise', 'griffin-details', 'Unique perspectives shape unique products'],
  ['Aden Allan', 'aden-details', 'Empowered teams create truly amazing products'],
];

for (const [name, panelId, quote] of directors) {
  test(`${name}: details open and close without changing other cards`, async ({ page }) => {
    await page.goto('/about.html');
    const button = page.getByRole('button', { name: new RegExp(`Details about\\s+${name}`) });
    const panel = page.locator(`#${panelId}`);

    await expect(page.locator('.article-btn')).toHaveCount(6);
    await expect(button).toHaveAttribute('aria-controls', panelId);
    await expect(button).toHaveAttribute('aria-expanded', 'false');
    await expect(panel).toBeHidden();

    // Two cycles catch controls that work only the first time.
    for (let cycle = 0; cycle < 2; cycle++) {
      await button.click();
      await expect(button).toHaveAttribute('aria-expanded', 'true');
      await expect(panel).toBeVisible();
      await expect(panel.locator('.overlay-name')).toHaveText(name);
      await expect(panel.locator('.overlay-quote')).toContainText(quote);
      await expect(page.locator('.overlay:visible')).toHaveCount(1);
      await button.click();
      await expect(button).toHaveAttribute('aria-expanded', 'false');
      await expect(panel).toBeHidden();
    }
  });
}

test('two director cards can stay open independently', async ({ page }) => {
  await page.goto('/about.html');
  const first = page.getByRole('button', { name: 'Details about Nikita Marks' });
  const second = page.getByRole('button', { name: 'Details about Cristian Duncan' });
  await first.click();
  await second.click();
  await expect(page.locator('#nikita-details')).toBeVisible();
  await expect(page.locator('#cristian-details')).toBeVisible();
  await first.click();
  await expect(page.locator('#nikita-details')).toBeHidden();
  await expect(page.locator('#cristian-details')).toBeVisible();
  await expect(second).toHaveAttribute('aria-expanded', 'true');
});
