import{PlaywrightTestConfig} from "@playwright/test";
const config: PlaywrightTestConfig = {
    reporter: [["line"],["allure-playwright"]],
    testDir: 'tests/booking',
}
export default config;