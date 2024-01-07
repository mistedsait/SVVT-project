import { Builder, By, WebDriver } from "selenium-webdriver";
import { createDriver,quitDriver } from "../core/config/driver-setup";
import { readFileSync } from "fs";
import * as path from "path";
import { SportHome } from "../core/page-objects/sport-page";
import { SportSearch } from "../core/page-objects/search-page";

const dataFilePath = path.resolve(__dirname, "../core/data/data.json")
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));


let driver: WebDriver;
let homePage: SportHome;
let searchPage:SportSearch;

beforeAll(async () => {
    driver = await createDriver(testData.url.sporturl);
    homePage = new SportHome(driver);
    searchPage=new SportSearch(driver);
},100000);


test("search revelance", async () => {
    await homePage.fillSearchField();
    await homePage.clickOnLupa();
    await searchPage.checkRevelance();
},100000);


afterAll(async () => {
    await quitDriver(driver);
},100000);
