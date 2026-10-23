import { test, expect } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/#contact');
    await page.waitForLoadState('networkidle');
  });

  test('should display contact form', async ({ page }) => {
    const form = page.locator('form');
    await expect(form).toBeVisible();

    // Check form fields
    await expect(page.getByPlaceholder(/Your Name/i)).toBeVisible();
    await expect(page.getByPlaceholder(/email/i)).toBeVisible();
    await expect(page.getByPlaceholder(/Mobile/i)).toBeVisible();
    await expect(page.getByPlaceholder(/What would you like/i)).toBeVisible();
  });

  test('should show validation error for empty form', async ({ page }) => {
    const submitBtn = page.getByRole('button', { name: /Send message/i });
    await submitBtn.click();

    const error = page.locator('.feedback-error');
    await expect(error).toBeVisible();
    await expect(error).toContainText(/required/i);
  });

  test('should validate email format', async ({ page }) => {
    const nameInput = page.getByPlaceholder(/Your Name/i);
    const emailInput = page.getByPlaceholder(/email/i);
    const messageInput = page.getByPlaceholder(/What would you like/i);
    const submitBtn = page.getByRole('button', { name: /Send message/i });

    await nameInput.fill('Test User');
    await emailInput.fill('invalid-email');
    await messageInput.fill('Test message');
    await submitBtn.click();

    const error = page.locator('.feedback-error');
    await expect(error).toContainText(/valid email/i);
  });

  test('should accept valid form submission', async ({ page }) => {
    const nameInput = page.getByPlaceholder(/Your Name/i);
    const emailInput = page.getByPlaceholder(/email/i);
    const phoneInput = page.getByPlaceholder(/Mobile/i);
    const messageInput = page.getByPlaceholder(/What would you like/i);
    const submitBtn = page.getByRole('button', { name: /Send message/i });

    await nameInput.fill('Test User');
    await emailInput.fill('test@example.com');
    await phoneInput.fill('+91 98765 43210');
    await messageInput.fill('This is a test message');

    // Mock the Formspree API response
    await page.route('https://formspree.io/**', route => {
      route.abort('blockedbyclient');
    });

    await submitBtn.click();

    // Form should be disabled during submission
    await expect(submitBtn).toBeDisabled();
  });

  test('should display contact information', async ({ page }) => {
    const contactInfo = page.locator('.contact-info');
    await expect(contactInfo).toBeVisible();

    // Check contact details are displayed
    await expect(page.getByText(/Email/i)).toBeVisible();
    await expect(page.getByText(/Phone/i)).toBeVisible();
    await expect(page.getByText(/Location/i)).toBeVisible();
  });

  test('should display social links', async ({ page }) => {
    const socials = page.locator('.contact-socials');
    await expect(socials).toBeVisible();

    // Check social links
    await expect(page.getByRole('link', { name: /GitHub/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /LinkedIn/i })).toBeVisible();
  });
});
