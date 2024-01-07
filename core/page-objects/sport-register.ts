import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";


import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));




export class SportRegister extends BasePage {
    
    private username_regfield=By.xpath("//div[@class='main']//input[@id='username']")
    private email_regfield=By.xpath("//div[@class='main']//input[@id='email']")
    private pass_regfield=By.xpath("//div[@class='main']//input[@id='password']")
    private passconf_regfield=By.xpath("//div[@class='main']//input[@id='password_confirmation']")
    private register_btn=By.xpath("//div[@class='main']//button[@type='submit']")
    private check_captcha=By.xpath("//div[@class='rc-anchor-content']//span[@role='checkbox']")
    private verificaton_msg=By.xpath("//div[@role='alert']//strong[@class='font-bold']")
    constructor(driver: WebDriver) {
        super(driver);
    }
    
    
    async waitForPage(){
        await this.waitForElement(this.username_regfield,50000)
    }
    async fillUsernameReg(){
        
        await this.fillInputField(this.username_regfield,testData.account.username)
    }
    async fillEmailReg(){
        await this.fillInputField(this.email_regfield,testData.account.email)
    }
    async fillPassReg(){
        await this.fillInputField(this.pass_regfield,testData.account.password)
    }
    async fillConfPassReg(){
        await this.fillInputField(this.passconf_regfield,testData.account.password)
    }
    async checkCaptcha(){
        await this.findElementAndClick(this.check_captcha)
    }
    async clickRegistrujSe(){
        await new Promise(resolve => setTimeout(resolve, 5000));
        await this.findElementAndClick(this.register_btn)
    }
    async verifyAccountCreation(){
        await this.waitForElement(this.verificaton_msg, 10000);
        await this.checkMatchingElements(this.verificaton_msg, testData.verification_message.registartion_message)
    }
    
}
