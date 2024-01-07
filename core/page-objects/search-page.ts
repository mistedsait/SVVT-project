import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));




export class SportSearch extends BasePage {
    

    private search_revelance=By.xpath("//div[@class='main']//h1")
    private noresult_msg=By.xpath("//h1[@class='text-5xl dark:text-white']")
    constructor(driver: WebDriver) {
        super(driver);
    }
    
    
    async checkRevelance(){
        await this.waitForElement(this.search_revelance, 100000);
        await this.checkMatchingElements(this.search_revelance,testData.searchquery.cr7)
    }
    async checkNoResultFound(){
        await this.waitForElement(this.noresult_msg, 100000);
        await this.checkMatchingElements(this.noresult_msg,testData.verification_message.nema_rezultata)
    }
    
}
