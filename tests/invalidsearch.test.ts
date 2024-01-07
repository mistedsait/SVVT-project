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


test("invalid search", async () => {
    //This test will fail because in first project submission we specified query to be "asdasd"
    //and even tho there is no article containing asdasd it still displays something
    //Of course if we left it empty and press on search it would display "Nema Rezultata" and test would pass.
    await homePage.fillFailedSearch();
    await homePage.clickOnLupa();
    await searchPage.checkNoResultFound();
},100000);


afterAll(async () => {
    await quitDriver(driver);
},100000);
