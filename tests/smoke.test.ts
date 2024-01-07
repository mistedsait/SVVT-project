import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver,quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { SportHome } from "../core/page-objects/sport-page";
import { SportArticle } from "../core/page-objects/sport-article";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json")
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: SportHome;
let articlePage: SportArticle;


beforeAll(async () => {
    driver = await createDriver(testData.url.sporturl);
    homePage = new SportHome(driver);
    articlePage= new SportArticle(driver);
    
},100000);


test("smoke test", async () => {
    await homePage.clickOnArticle();
    await articlePage.checkIfLoaded();
    
    
    
},100000);


afterAll(async () => {
    await quitDriver(driver);
},10000);
