import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));




export class SportArticle extends BasePage {
    
    private reg_no_acc=By.xpath("//div[@class='main']//a[@href='https://sportsport.ba/register']")
    private email_login_field=By.xpath("//div[@class='mt-3']//input[@id='email']")
    private pass_login_field=By.xpath("//div[@class='mt-3 relative']//input[@id='password']")
    private prijava_btn=By.xpath("//div[@class='flex items-center mt-10']//button[@type='submit']")
    private komentari_btn=By.xpath("//div[@class='flex items-center px-2 mt-5']//a")
    private komentari_field=By.id("comment-main")
    private post_comment=By.xpath("//button[@data-article-id='465928']")
    private postavljeni_komentar=By.xpath("//p[@class='comment-content']")
    private share_button=By.xpath("//div[@class='flex items-center ml-5 ']//a[@title='Podijeli na Facebook']")
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
    async navigateToArticle(){ //We did this because home page is always updating so didn't know if it will cause problems with xpath
        await this.redirectToLink("https://sportsport.ba/fudbal/borac-tegeltija-ostavka/465928")
    }
    async commentsPage(){
        await this.waitAndClick(this.komentari_btn,5000)
    }
    async fillComment(){
        await this.waitForElement(this.komentari_field,10000)
        await this.fillInputField(this.komentari_field,testData.comment.normal)
    }
    async postComment(){
        await this.waitAndClick(this.post_comment,5000)
    }
    async checkIfPosted(){
        await this.waitForElement(this.postavljeni_komentar,1000)
        await this.checkMatchingElements(this.postavljeni_komentar,testData.comment.normal)
    }
    async clickOnShare(){
        await this.findElementAndClick(this.share_button)
    }
    async checkNewTab(){
        const originalWindowHandle = await this.driver.getWindowHandle();
        await this.isNewTabOpened(originalWindowHandle);
    }
    async checkIfLoaded(){
        await this.findElement(this.share_button)
    }
    

}
    

