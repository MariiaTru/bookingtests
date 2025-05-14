import {Page,Locator} from '@playwright/test'

export class Homepage {
    readonly page: Page;
    readonly currencyButton : Locator;
    readonly optionEur : Locator;
    readonly languageButton : Locator;
    readonly allLanguagesSection : Locator;
    readonly registerYourPropertyButton : Locator;
    readonly cityInput : Locator;
    readonly firstAutocompleteOption : Locator;
    readonly searchButton: Locator;


    constructor(page: Page) {
        this.page = page;
        this.currencyButton = page.getByTestId("header-currency-picker-trigger");
        this.optionEur = page.getByTestId("Suggested for you").locator("span", {hasText: "Euro"});

        this.languageButton = page.getByTestId("header-language-picker-trigger");
        this.allLanguagesSection = page.locator("#header_language_picker .Picker_selection-list").nth(1);
        this.registerYourPropertyButton = page.getByTestId("header-custom-action-button");

        this.cityInput = page.locator("input[name=ss]");
        this.firstAutocompleteOption = page.locator("#autocomplete-result-0");
        this.searchButton = page.locator("button[type=submit]");

    }

    async goto() {
        await this.page.goto("https://booking.com");
    }

    async selectEuroCurrency(){
        await this.currencyButton.click();
        await this.optionEur.click();
    }
    async selectLanguage(langCode: string){
        await this.languageButton.click();
        await this.allLanguagesSection.locator(`button[lang=${langCode}]`).click();
    }
    async searchByCity(cityName: string){
        await this.cityInput.fill(cityName);
        await this.firstAutocompleteOption.click();
        await this.searchButton.click();
    }
}
