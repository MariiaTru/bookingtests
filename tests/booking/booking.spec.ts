import { test, expect } from '@playwright/test';
import {Homepage} from './pages/homepage';

test.describe('TestForBooking', () => {
    let homepage: Homepage;
    test.beforeEach(async ({page}) => {
        homepage = new Homepage(page);
        await homepage.goto();
    })

    test("Currency change", async ({page}) => {
        let currencyFormattingMap = [
            {currency: "EUR", format: "€"},
            {currency: "USD", format: "US$"},
            {currency: "UAH", format: "UAH"},
        ];

        await homepage.searchByCity("Lviv");
        for(let elem of currencyFormattingMap){
            await homepage.selectCurrency(elem.currency);

            await expect(homepage.currencyButton).toContainText(elem.currency);
            for(const price of await homepage.searchResultsSection.pricesOfResults.all()){
                //await page.pause();
                await expect(price).toContainText(elem.format);
            }
        }
    });

    test("Language change", async ({page}) => {

        const translations = [
            {lang:"pl", translation:"Udostępnij obiekt"},
            {lang:"de", translation:"Ihre Unterkunft anmelden"},
            {lang:"sr", translation:"Registrujte svoj objekat"}
        ];
        for(let elem of translations) {
            await homepage.selectLanguage(elem.lang);
            await expect(homepage.registerYourPropertyButton).toContainText(elem.translation);
        }
        //await homepage.selectLanguage('pl');
        //await expect(homepage.registerYourPropertyButton).toContainText("Udostępnij obiekt");

        //await homepage.selectLanguage('de');
        //await expect(homepage.registerYourPropertyButton).toContainText("Ihre Unterkunft anmelden");

        //await homepage.selectLanguage('sr');
        //await expect(homepage.registerYourPropertyButton).toContainText("Registrujte svoj objekat");

    });


    test.only("Search for the city", async ({page}) => {

        const cities = ["Lviv", "Kyiv", "Odesa"];
        for (let city of cities){
            await homepage.searchByCity(city);
            await expect(homepage.searchResultsSection.searchResultsTitle).toContainText(city);

            for(const address of await homepage.searchResultsSection.addressesOfResults.all()){
                await expect(address).toContainText(city);
            }
        }
    })
})




