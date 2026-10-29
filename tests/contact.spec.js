const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/contact.html');
});

async function submitForm(page) {
  await page.getByRole('button', {
    name: 'Submit',
    exact: true,
  }).click();
}

async function expectError(page, fieldId, message) {
  await expect(page.locator(`#${fieldId}Error`)).toBeVisible();
  await expect(page.locator(`#${fieldId}Error`)).toHaveText(message);
  await expect(page.locator(`#${fieldId}`))
    .toHaveAttribute('aria-invalid', 'true');
}

test('empty form shows all required errors and focuses Name', async ({ page }) => {
  await submitForm(page);

  for (const field of ['name', 'email', 'message']) {
    await expectError(page, field, 'This field is required');
  }

  await expect(page.locator('#name')).toBeFocused();
  await expect(page.locator('.successMessage')).toBeHidden();
});

test('malformed email shows the format error and receives focus', async ({ page }) => {
  await page.locator('#name').fill('Sam Rivera');
  await page.locator('#email').fill('not-an-email');
  await page.locator('#message').fill('I would like to discuss a project.');

  await submitForm(page);

  await expectError(page, 'email', 'Please use a valid email address');
  await expect(page.locator('#email')).toBeFocused();
  await expect(page.locator('#nameError')).toBeHidden();
  await expect(page.locator('#messageError')).toBeHidden();
  await expect(page.locator('.successMessage')).toBeHidden();
});

test('missing Message receives its own error and focus', async ({ page }) => {
  await page.locator('#name').fill('Sam Rivera');
  await page.locator('#email').fill('sam@example.com');

  await submitForm(page);

  await expectError(page, 'message', 'This field is required');
  await expect(page.locator('#message')).toBeFocused();
  await expect(page.locator('#nameError')).toBeHidden();
  await expect(page.locator('#emailError')).toBeHidden();
});

test('correcting invalid fields clears errors and shows success', async ({ page }) => {
  await submitForm(page);

  await page.locator('#name').fill('Sam Rivera');
  await page.locator('#email').fill('sam@example.com');
  await page.locator('#message').fill('I would like to discuss a project.');

  await submitForm(page);

  for (const field of ['name', 'email', 'message']) {
    await expect(page.locator(`#${field}Error`)).toBeHidden();
    await expect(page.locator(`#${field}`))
      .not.toHaveAttribute('aria-invalid', 'true');
  }

  // Company and Title remain empty: they are optional.
  await expect(page.locator('.successMessage')).toBeVisible();

  // A later invalid submission must clear the old success message.
  await page.locator('#email').fill('');
  await submitForm(page);

  await expectError(page, 'email', 'This field is required');
  await expect(page.locator('.successMessage')).toBeHidden();
});
