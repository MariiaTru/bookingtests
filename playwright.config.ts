import{PlaywrightTestConfig} from "@playwright/test";
const config: PlaywrightTestConfig = {
    reporter: [["line"],["allure-playwright"]]
}
export default config;