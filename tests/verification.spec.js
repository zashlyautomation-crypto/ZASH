import { test, expect } from '@playwright/test';

test.describe('Accessibility and Image Loading', () => {
    test.beforeEach(async ({ page }) => {
        // Assuming the dev server is running on localhost:5173
        await page.goto('http://localhost:5173/');
    });

    test('Contact form should have proper accessibility attributes', async ({ page }) => {
        const nameLabel = page.locator('label[for="name"]');
        const nameInput = page.locator('input#name');
        const emailLabel = page.locator('label[for="email"]');
        const emailInput = page.locator('input#email');
        const messageLabel = page.locator('label[for="message"]');
        const messageTextarea = page.locator('textarea#message');

        await expect(nameLabel).toBeVisible();
        await expect(nameInput).toBeVisible();
        await expect(nameInput).toHaveAttribute('name', 'name');
        await expect(nameInput).toHaveAttribute('autoComplete', 'name');

        await expect(emailLabel).toBeVisible();
        await expect(emailInput).toBeVisible();
        await expect(emailInput).toHaveAttribute('name', 'email');
        await expect(emailInput).toHaveAttribute('autoComplete', 'email');

        await expect(messageLabel).toBeVisible();
        await expect(messageTextarea).toBeVisible();
        await expect(messageTextarea).toHaveAttribute('name', 'message');

        // Verify label association (clicking label should focus input)
        await nameLabel.click();
        await expect(nameInput).toBeFocused();

        await emailLabel.click();
        await expect(emailInput).toBeFocused();

        await messageLabel.click();
        await expect(messageTextarea).toBeFocused();

        const submitButton = page.locator('button[type="submit"]');
        await expect(submitButton).toBeVisible();
        await expect(submitButton).toHaveText(/EXECUTE TRANSMISSION/);
    });

    test('Image trail images should load without CORB errors', async ({ page }) => {
        const images = page.locator('#image-trail img');
        const count = await images.count();
        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const src = await images.nth(i).getAttribute('src');
            // Check if URL is well-formed (no double ??)
            expect(src).not.toContain('??');
            expect(src).toContain('?');
            expect(src).toContain('&');

            // Verify image actually loads
            const response = await page.request.get(src);
            expect(response.status()).toBe(200);
        }
    });
});
