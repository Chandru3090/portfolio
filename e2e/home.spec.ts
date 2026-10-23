import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test('should load and display hero section', async ({ page }) => {
    await page.goto('/');

    // Check hero heading
    const heading = page.locator('h1:has-text("Chandran Lakshmanan")');
    await expect(heading).toBeVisible();
  });

  test('should display navigation', async ({ page }) => {
    await page.goto('/');

    // Check navigation items
    const navItems = ['Home', 'About', 'Experience', 'Skills', 'Projects', 'Contact'];
    for (const item of navItems) {
      const nav = page.getByRole('button', { name: item });
      await expect(nav).toBeVisible();
    }
  });

  test('should navigate to projects section', async ({ page }) => {
    await page.goto('/');

    const viewWorkBtn = page.getByRole('link', { name: /View Work/i });
    await viewWorkBtn.click();

    await page.waitForURL(/.*#projects/);
    const projectsSection = page.locator('#projects');
    await expect(projectsSection).toBeVisible();
  });

  test('should navigate to contact section', async ({ page }) => {
    await page.goto('/');

    const contactBtn = page.getByRole('link', { name: /Get in Touch/i });
    await contactBtn.click();

    await page.waitForURL(/.*#contact/);
    const contactSection = page.locator('#contact');
    await expect(contactSection).toBeVisible();
  });

  test('should display skills section', async ({ page }) => {
    await page.goto('/');

    // Scroll to skills section
    const skillsSection = page.locator('#skills');
    await skillsSection.scrollIntoViewIfNeeded();

    await expect(skillsSection).toBeVisible();

    // Check skill groups
    const skillCards = page.locator('.skill-card');
    await expect(skillCards).not.toHaveCount(0);
  });

  test('should apply theme based on current day', async ({ page }) => {
    await page.goto('/');

    const html = page.locator('html');
    const theme = await html.getAttribute('data-theme');

    // Theme should be set to one of the available themes
    const validThemes = ['aurora', 'diwali', 'holi', 'navratri', 'ocean', 'forest', 'sunset', 'midnight', 'spring', 'cherry'];
    expect(validThemes).toContain(theme);
  });

  test('should be responsive on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');

    const heading = page.locator('h1:has-text("Chandran Lakshmanan")');
    await expect(heading).toBeVisible();

    // Navigation should be visible
    const nav = page.locator('[class*="nav"]');
    await expect(nav.first()).toBeVisible();
  });
});
