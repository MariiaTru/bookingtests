import {Locator, Page} from "@playwright/test";


export class SearchBar {
    readonly page: Page;
    readonly cityInput: Locator;
    readonly datesInput: Locator;
    readonly occupantsInput: Locator;

    readonly firstAutocompleteOption: Locator;
    readonly searchButton: Locator;

    readonly datePicker: Locator;


    constructor(page: Page) {
        this.page = page;
        this.cityInput = this.page.locator("input[name=ss]");
        this.datesInput = this.page.getByTestId("searchbox-dates-container");
        this.occupantsInput = this.page.getByTestId("occupancy-config");
        this.firstAutocompleteOption = page.locator("#autocomplete-result-0");
        this.searchButton = page.locator("button[type=submit]");

        this.datePicker = page.getByTestId("searchbox-datepicker-calendar");
    }

    async searchByCity(city: string) {
        await this.cityInput.click();
        await this.cityInput.fill(city);
        await this.firstAutocompleteOption.getByText(city, {exact:true}).click();

        const isDataPickerVisible = await this.datePicker.isVisible();
        if(!isDataPickerVisible){
            await this.datesInput.click();
        }
        const nextMonth = this.datePicker.locator("div > div").nth(1);
        const startDate = nextMonth.locator("table > tbody > tr:nth-child(1) > td").nth(0);
        await startDate.click();

        const endDate = nextMonth.locator("table > tbody > tr:nth-child(2) > td").nth(0);
        await endDate.click();

        await this.searchButton.click();
    }
}