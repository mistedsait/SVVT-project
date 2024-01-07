import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver,quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { SportHome } from "../core/page-objects/sport-page";
import { SportRegister } from "../core/page-objects/sport-register";
import { SportLogin } from "../core/page-objects/sport-login";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json")
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: SportHome;
let registerPage:SportRegister;
let loginPage: SportLogin;

beforeAll(async () => {
    driver = await createDriver(testData.url.sporturl);
    homePage = new SportHome(driver);
    loginPage = new SportLogin(driver);
    registerPage = new SportRegister(driver);
},100000);


test("user registration", async () => {
    await homePage.clickOnLogin();
    await loginPage.clickOnRegistracija();
    await registerPage.waitForPage();
    await registerPage.fillUsernameReg();
    await registerPage.fillEmailReg();
    await registerPage.fillPassReg();
    await registerPage.fillConfPassReg();
    await driver.sleep(15) //for manually doing reCAPTCHA
    await registerPage.clickRegistrujSe();
    await registerPage.verifyAccountCreation();
},100000);


afterAll(async () => {
    await quitDriver(driver);
},10000);
