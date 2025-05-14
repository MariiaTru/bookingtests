import { test, expect } from '@playwright/test';
import {Homepage} from './pages/homepage';

test.describe('TestForBooking', () => {
    let homepage: Homepage;
    test.beforeEach(async ({page}) => {
        homepage = new Homepage(page);
        await homepage.goto();
    })

    test("Currency change", async ({page}) => {
        await homepage.selectEuroCurrency();
        await expect(homepage.currencyButton).toContainText("EUR")
    });

    test("Language change", async ({page}) => {

        await homepage.selectLanguage('pl');
        await expect(homepage.registerYourPropertyButton).toContainText("Udostępnij obiekt");

        await homepage.selectLanguage('de');
        await expect(homepage.registerYourPropertyButton).toContainText("Ihre Unterkunft anmelden");


        await homepage.selectLanguage('sr');
        await expect(homepage.registerYourPropertyButton).toContainText("Registrujte svoj objekat");

    });


    test.only("Search for the city", async ({page}) => {

        await homepage.searchByCity("Lviv");
        await expect(page.locator("h1")).toContainText(/.*Lviv.*/);
    })
})




