import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";


import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));




export class SportHome extends BasePage {
    private login_btn=By.xpath("//div[@class='flex items-center']//a[@href='https://sportsport.ba/login']")
    private reg_no_acc=By.xpath("//div[@class='main']//a[@href='https://sportsport.ba/register']")
    private username_regfield=By.xpath("//div[@class='main']//input[@id='username']")
    private email_regfield=By.xpath("//div[@class='main']//input[@id='email']")
    private pass_regfield=By.xpath("//div[@class='main']//input[@id='password']")
    private passconf_regfield=By.xpath("//div[@class='main']//input[@id='password_confirmation']")
    private register_btn=By.xpath("//div[@class='main']//button[@type='submit']")
    private check_captcha=By.xpath("//div[@class='rc-anchor-content']//span[@role='checkbox']")
    private verificaton_msg=By.xpath("//div[@class='bg-green-100 border border-green-600 text-green-600 px-4 py-3 rounded-md relative mb-5 text-base']//strong[@class='font-bold']")
    private profile_icon=By.xpath("//span[@class='relative']")
    private odjava=By.xpath("//a[@href='https://sportsport.ba/logout']//span[@class='rounded-md block bg-black bg-opacity-5 group-hover:bg-opacity-10 py-1.5 px-3 w-5/6 mr-2 uppercase md:mr-1 dark:bg-white dark:bg-opacity-20']")
    private search_field=By.xpath("//div[@class='flex items-center']//input[@type='text']")
    private lupa_btn=By.xpath("//*[@id='search']/button")
    private uredi_profil=By.xpath("//div[@class='text-base leading-7 mt-4 overflow-x-auto ']//a[@href='https://sportsport.ba/profil/test99test/uredi-profil']")
    private enter_article=By.xpath("/html/body/div[2]/div[1]/div[1]/div/article/figure")
    constructor(driver: WebDriver) {
        super(driver);
    }
    async clickOnLogin(){
        await this.waitAndClick(this.login_btn,50000)
    }
    async clickOnRegistracija(){
        await this.waitAndClick(this.reg_no_acc,50000)
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

    async checkIfLogged(){
        await this.findElement(this.profile_icon)
    }

    async clickProfileIcon(){
        await this.waitAndClick(this.profile_icon,5000)
    }

    async clickOdjava(){
        await this.waitAndClick(this.odjava,5000)
    }

    async checkIfLoggedOut(){
        await this.findElement(this.login_btn)
    }

    async fillSearchField(){
        await this.fillInputField(this.search_field,testData.searchquery.cr7)
    }
    async fillFailedSearch(){
        await this.fillInputField(this.search_field,testData.searchquery.failedQeury)
    }
    async clickOnLupa(){
        await this.waitAndClick(this.lupa_btn,5000)
    }
    async clickOnUrediProfil(){
        await this.waitAndClick(this.uredi_profil,5000)
    }
    async clickOnArticle(){
        await this.waitAndClick(this.enter_article,5000)
    }


    
}
