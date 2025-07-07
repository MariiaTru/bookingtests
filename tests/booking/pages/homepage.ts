import {Page,Locator} from '@playwright/test'
import {SearchResults} from "./components/SearchResults";
import {SearchBar} from "./components/SearchBar";

export class Homepage {
    readonly page: Page;
    readonly searchResultsSection: SearchResults;
    readonly searchBar: SearchBar;

    readonly currencyButton : Locator;
    readonly languageButton : Locator;
    readonly allLanguagesSection : Locator;
    readonly registerYourPropertyButton : Locator;



    constructor(page: Page) {
        this.page = page;
        this.searchResultsSection = new SearchResults(page);
        this.searchBar = new SearchBar(page);

        this.currencyButton = page.getByTestId("header-currency-picker-trigger");

        this.languageButton = page.getByTestId("header-language-picker-trigger");
        this.allLanguagesSection = page.locator("#header_language_picker .Picker_selection-list").nth(1);
        this.registerYourPropertyButton = page.getByTestId("header-custom-action-button");

    }

    async goto() {
        await this.page.goto("https://booking.com");
    }

    async selectCurrency(currency: string){
        await this.currencyButton.click();
        await this.page.getByTestId("All currencies").locator("span").getByText(currency, {exact:true}).click();
    }

    async selectLanguage(langCode: string){
        await this.languageButton.click();
        await this.allLanguagesSection.locator(`button[lang=${langCode}]`).click();
    }

    async searchByCity(city: string){
        await this.searchBar.searchByCity(city);
    }
}
