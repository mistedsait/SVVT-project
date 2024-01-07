import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver,quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { SportHome } from "../core/page-objects/sport-page";
import { SportLogin } from "../core/page-objects/sport-login";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json")
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: SportHome;

let loginPage: SportLogin;

beforeAll(async () => {
    driver = await createDriver(testData.url.sporturl);
    homePage = new SportHome(driver);
    loginPage = new SportLogin(driver);
},100000);


test("user logout", async () => {
    await homePage.clickOnLogin();
    await loginPage.fillEmailLogin();
    await loginPage.fillPasswordLogin();
    await loginPage.clickPrijava();
    await homePage.clickProfileIcon();
    await homePage.clickOdjava();
    await homePage.checkIfLoggedOut();
    
    
},100000);


afterAll(async () => {
    await quitDriver(driver);
},10000);
