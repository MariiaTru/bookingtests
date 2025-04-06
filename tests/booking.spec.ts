import { test, expect } from '@playwright/test';

test("Currency change", async ({page}) => {
    await page.goto("https://booking.com");
    await page.getByTestId("header-currency-picker-trigger").click();

    await page.locator("data-testid=Suggested for you").getByText("EUR").click();

    //await page.waitForURL("**/?selected_currency=*");
    await expect(page.getByTestId("header-currency-picker-trigger")).toContainText("EUR");
});

test("Language change", async ({page}) => {
    await page.goto("https://booking.com");
    await page.getByTestId("header-language-picker-trigger").click();
    await page.locator("data-testid=Suggested for you").getByText("Polski").click();
    await expect(page.getByTestId("header-custom-action-button")).toContainText("Udostępnij obiekt");
    await page.goto("https://booking.com");
    await page.getByTestId("header-language-picker-trigger").click();
    await page.locator("data-testid=Wszystkie języki").getByText("Deutsch").click();
    await expect(page.getByTestId("header-custom-action-button")).toContainText("Ihre Unterkunft anmelden");

    await page.getByTestId("header-language-picker-trigger").click();
    await page.locator("data-testid=Alle Sprachen").getByText("Srpski").click();
    await expect(page.getByTestId("header-custom-action-button")).toContainText("Registrujte svoj objekat");

});


test("Search for the city", async ({page}) => {
    await page.goto("https://booking.com");
    await page.locator("input[name=ss]").fill('Lviv');

    const firstAutocompleteOption = page.locator("#autocomplete-result-0");
    await expect(firstAutocompleteOption).toContainText(/.*Lviv.*/);
    await firstAutocompleteOption.click();

    await page.locator("button[type=submit]").click();
    await expect(page.locator("h1")).toContainText(/.*Lviv.*/);
})


