import {Locator, Page} from "@playwright/test";


export class SearchResults {
    readonly page: Page;
    readonly searchResultsTitle: Locator;
    readonly addressesOfResults: Locator;
    readonly pricesOfResults: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchResultsTitle = page.locator("h1");
        this.addressesOfResults = page.getByTestId("address");
        this.pricesOfResults = page.getByTestId("price-and-discounted-price");
    }
}