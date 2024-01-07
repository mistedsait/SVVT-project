import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));




export class SportLogin extends BasePage {
    
    private reg_no_acc=By.xpath("//div[@class='main']//a[@href='https://sportsport.ba/register']")
    private email_login_field=By.xpath("//div[@class='mt-3']//input[@id='email']")
    private pass_login_field=By.xpath("//div[@class='mt-3 relative']//input[@id='password']")
    private prijava_btn=By.xpath("//div[@class='flex items-center mt-10']//button[@type='submit']")
    constructor(driver: WebDriver) {
        super(driver);
    }
    
    async clickOnRegistracija(){
        await this.waitAndClick(this.reg_no_acc,50000)
    }
    async fillEmailLogin(){
        await this.fillInputField(this.email_login_field,testData.account.email)
    }
    async fillPasswordLogin(){
        await this.fillInputField(this.pass_login_field,testData.account.password)
    }
    async clickPrijava(){
        await this.findElementAndClick(this.prijava_btn)
    }
    
}
