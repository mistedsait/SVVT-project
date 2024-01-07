import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver,quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { SportHome } from "../core/page-objects/sport-page";
import { SportLogin } from "../core/page-objects/sport-login";
import { SportProfile } from "../core/page-objects/sport-profile";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json")
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: SportHome;
let loginPage: SportLogin;
let profilePage: SportProfile;

beforeAll(async () => {
    driver = await createDriver(testData.url.sporturl);
    homePage = new SportHome(driver);
    loginPage = new SportLogin(driver);
    profilePage= new SportProfile(driver);
},100000);


test("change password", async () => {
    await homePage.clickOnLogin();
    await loginPage.fillEmailLogin();
    await loginPage.fillPasswordLogin();
    await loginPage.clickPrijava();
    await homePage.clickProfileIcon();
    await homePage.clickOnUrediProfil();
    await profilePage.fillPasswrod();
    await profilePage.fillPasswordAgain();
    await profilePage.saveChangesForPass();
    await profilePage.checkIfSuccesfullChange();


    
},100000);


afterAll(async () => {
    await quitDriver(driver);
},10000);
