import { test, expect } from '@playwright/test';

test.describe('Weather App E2E Tests', () => {
  test.beforeEach(async ({ page, context }) => {
    // Block geolocation to prevent auto-loading
    await context.setGeolocation({ latitude: 0, longitude: 0 });
    await page.goto('/');
  });

  test('should load the application', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('World Weather');
    await expect(page.locator('input[placeholder*="Search"]')).toBeVisible();
  });

  test('should search for a location', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('London');

    await page.waitForTimeout(500);

    await expect(page.locator('button:has-text("London")').first()).toBeVisible({
      timeout: 5000,
    });
  });

  test('should select a location and display weather', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('London');

    await page.waitForTimeout(500);

    const londonButton = page.locator('button:has-text("London")').first();
    await londonButton.click();

    await expect(page.locator('h2:has-text("London")').first()).toBeVisible({
      timeout: 10000,
    });
    await expect(page.getByText('Humidity')).toBeVisible();
    await expect(page.getByText('Wind Speed')).toBeVisible();
  });

  test('should toggle temperature units', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Paris');

    await page.waitForTimeout(500);

    const parisButton = page.locator('button:has-text("Paris")').first();
    await parisButton.click();

    await page.waitForTimeout(2000);

    const celsiusBadge = page.locator('span:has-text("°C")').first();
    await expect(celsiusBadge).toBeVisible({ timeout: 10000 });

    const unitToggle = page.locator('button:has-text("Unit:")');
    await unitToggle.click();

    const fahrenheitBadge = page.locator('span:has-text("°F")').first();
    await expect(fahrenheitBadge).toBeVisible();
  });

  test('should display forecast after selecting location', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('New York');

    await page.waitForTimeout(500);

    const nyButton = page.locator('button:has-text("New York")').first();
    await nyButton.click();

    await expect(page.getByText('5-Day Forecast')).toBeVisible({
      timeout: 10000,
    });
  });

  test('should display map', async ({ page }) => {
    const mapContainer = page.locator('.leaflet-container');
    await expect(mapContainer).toBeVisible({ timeout: 15000 });
  });

  test('should show weather details', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Tokyo');

    await page.waitForTimeout(500);

    const tokyoButton = page.locator('button:has-text("Tokyo")').first();
    await tokyoButton.click();

    await expect(page.getByText('Pressure')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Visibility')).toBeVisible();
    await expect(page.getByText('hPa')).toBeVisible();
  });

  test('should handle search with no results', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('XYZ123456789');

    await page.waitForTimeout(500);

    await expect(page.getByText('No locations found')).toBeVisible({
      timeout: 5000,
    });
  });

  test('should not search with less than 2 characters', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('L');

    await page.waitForTimeout(500);

    await expect(page.getByText('No locations found')).not.toBeVisible();
    await expect(page.locator('button:has-text("London")')).not.toBeVisible();
  });

  test('should display footer with OpenWeatherMap link', async ({ page }) => {
    await expect(page.getByText('Weather data provided by')).toBeVisible();
    await expect(
      page.locator('a[href*="openweathermap.org"]'),
    ).toBeVisible();
  });

  test('should persist temperature unit preference', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Madrid');

    await page.waitForTimeout(500);

    const madridButton = page.locator('button:has-text("Madrid")').first();
    await madridButton.click();

    await page.waitForTimeout(2000);

    const unitToggle = page.locator('button:has-text("Unit:")');
    await unitToggle.click();

    const fahrenheitBadge = page.locator('span:has-text("°F")').first();
    await expect(fahrenheitBadge).toBeVisible();

    await page.reload();

    await expect(
      page.locator('span:has-text("°F")').first(),
    ).toBeVisible({ timeout: 10000 });
  });

  test('should display weather metrics cards', async ({ page }) => {
    const searchInput = page.locator('input[placeholder*="Search"]');
    await searchInput.fill('Berlin');

    await page.waitForTimeout(500);

    const berlinButton = page.locator('button:has-text("Berlin")').first();
    await berlinButton.click();

    await expect(page.getByText('Humidity')).toBeVisible({ timeout: 10000 });
    await expect(page.getByText('Wind Speed')).toBeVisible();
    await expect(page.getByText('Pressure')).toBeVisible();
    await expect(page.getByText('Visibility')).toBeVisible();
  });
});

