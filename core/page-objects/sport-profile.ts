import { By, WebDriver, until } from "selenium-webdriver";
import BasePage from "./base-page";
import { readFileSync } from "fs";
import * as path from "path";
const dataFilePath = path.resolve(__dirname, "../data/data.json");
const testData = JSON.parse(readFileSync(dataFilePath, "utf8"));




export class SportProfile extends BasePage {
    private input_name=By.xpath("//input[@id='input-name']")
    private genderclick=By.xpath("/html/body/div[2]/div[2]/div/div[2]/div[2]/form[1]/div[4]/div/select")
    private gender=By.xpath("//option[@value='M']")
    private year=By.xpath("//option[@value='2002']")
    private country=By.xpath("//option[@value='27']")
    private mjesto=By.xpath("/html/body/div[2]/div[2]/div/div[2]/div[2]/form[1]/div[7]/div/select/option[2]")
    private spasi_izmjene=By.xpath("//div[@class='flex items-center mt-10']//button")
    private success=By.xpath("//div[@class='bg-green-100 border border-green-600 text-green-600 px-4 py-3 rounded-md relative mb-5 text-base']//strong[@class='font-bold']")
    private new_password_field=By.xpath("//input[@id='password']")
    private repeat_pass=By.xpath("//input[@id='retype-password']")
    private spasi_novi_pass=By.xpath("/html/body/div[2]/div[2]/div/div[2]/div[2]/form[2]/div[3]/button")
    private change_picture=By.xpath("//label[@for='upload-image']")
    constructor(driver: WebDriver) {
        super(driver);
    }
    async choseName(){
        await this.fillInputField(this.input_name,testData.account.profilename)
    }
    async genderTypeClick(){
        await this.waitAndClick(this.genderclick,5000)
    }
    async genderType(){
        await this.findElementAndClick(this.gender)
    }
    async yearOfBirth(){
        await this.findElementAndClick(this.year)
    }
    async pickCountry(){
        await this.findElementAndClick(this.country)
    }
    async pickMjesto(){
        await this.findElementAndClick(this.mjesto)
    }
    async spasiIzmjene(){
        await this.waitAndClick(this.spasi_izmjene,5000)
    }
    async checkIfSuccesfullChange(){
        await this.checkMatchingElements(this.success,testData.verification_message.registartion_message)
    }
    async fillPasswrod(){
        await this.fillInputField(this.new_password_field,testData.account.newpass)
    }
    async fillPasswordAgain(){
        await this.fillInputField(this.repeat_pass,testData.account.newpass)
    }
    async saveChangesForPass(){
        await this.waitAndClick(this.spasi_novi_pass,5000)
    }
    async clickOnPicChange(){
        await this.waitAndClick(this.change_picture,5000)
    }
    
    
}
