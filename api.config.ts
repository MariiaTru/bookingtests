import{PlaywrightTestConfig} from "@playwright/test";
const config: PlaywrightTestConfig = {
    reporter: [["line"],["allure-playwright"]],
    testDir: 'tests/api',
}
export default config;