import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver,quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { SportHome } from "../core/page-objects/sport-page";
import { SportLogin } from "../core/page-objects/sport-login";
import { SportArticle } from "../core/page-objects/sport-article";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json")
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: SportHome;
let loginPage: SportLogin;
let articlePage: SportArticle;

beforeAll(async () => {
    driver = await createDriver(testData.url.sporturl);
    homePage = new SportHome(driver);
    articlePage=new SportArticle(driver);

},100000);


test("share article", async () => {
    await articlePage.navigateToArticle();//We did this because home page is always updating so didn't know if it will cause problems with xpath
    await articlePage.clickOnShare();
    await articlePage.checkNewTab();
},100000);


afterAll(async () => {
    await quitDriver(driver);
},10000);
