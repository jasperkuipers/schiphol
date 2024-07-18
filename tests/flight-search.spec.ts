import { Flight } from '@/app/api/flights/route';
import { test, expect } from '@playwright/test';

test('should navigate to the home page and start search for destination "London"', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await page.click('input');
    await page.fill('input', 'London');

    await expect(page).toHaveURL('http://localhost:3000?destination=London');
});

test('should fetch data from the api with a maximum of 5 results', async ({ request }) => {
    const destination = 'London';
    const limit = 5;
    const response = await request.get(`http://localhost:3000/api/flights/?destination=${destination}&limit=${limit}`);

    expect(response.ok()).toBeTruthy();

    const data = await response.json();

    expect(data.flights.length).toBeLessThanOrEqual(limit);

    data.flights.forEach((flight: Flight) => {
        expect(flight.airport.toLowerCase()).toContain(destination.toLowerCase());
    });
});

test('should show the corresponding result when the user types in the input field', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await page.click('input');
    await page.fill('input', 'London');

    await page.waitForSelector('table');

    const rows = await page.$$('table tbody tr');

    expect(rows.length).toBe(5);
});
