// Generated by Selenium IDE
const { Builder, By, Key, until, WebDriver } = require('selenium-webdriver')
const firefox = require('selenium-webdriver/firefox')
const assert = require('assert')
const { describe, it, before, after, beforeEach } = require('mocha')

describe('test_suite', function() {
  this.timeout(30000)
  /**
   * @type {WebDriver}
   */
  let driver
  let vars
  const service = new firefox.ServiceBuilder('geckodriver.exe')
  const options = new firefox.Options()
  // options.headless()
  before(async function() {
    driver = await new Builder().forBrowser('firefox').setFirefoxService(service).setFirefoxOptions(options).build()
    await driver.manage().setTimeouts({ implicit: 10000 })
    vars = {}
  })
  beforeEach("Timeout", function (done) {
    this.timeout(3000)
    setTimeout(done, 2000)
  })
  after(async function() {
    setTimeout(() => {
      driver.quit()
    }, 100)
  })
  it('register_user', async function() {
    // await driver.
    await driver.get("http://localhost:3000//")
    await driver.manage().window().setRect({ width: 1536, height: 816 })
    await driver.findElement(By.id("get-started-btn")).click()
    await driver.findElement(By.id("input-email-for-credentials-provider")).click()
    await driver.findElement(By.id("input-email-for-credentials-provider")).sendKeys("selenium@example.com")
    await driver.findElement(By.id("input-password-for-credentials-provider")).sendKeys("1234")
    await driver.findElement(By.id("input-new-for-credentials-provider")).click()
    await driver.findElement(By.css("button")).click()
    // await driver.close()
  })
  it('create_post', async function() {
    // await driver.get
    await driver.get("http://localhost:3000/")
    // await driver.manage().window().setRect({ width: 1552, height: 832 })
    await driver.findElement(By.css("button[itemid='menu-button-4']")).click()
    await driver.findElement(By.linkText("Create Post")).click()
    // {
    //   const element = await driver.findElement(By.css(".chakra-editable__preview"))
    //   await driver.actions({ bridge: true }).moveToElement(element).clickAndHold().perform()
    // }
    // {
    //   const element = await driver.findElement(By.css(".chakra-editable__input"))
    //   await driver.actions({ bridge: true }).moveToElement(element).release().perform()
    // }
    await driver.findElement(By.css(".chakra-editable__preview")).click()
    await driver.findElement(By.css(".chakra-editable__input")).sendKeys("Selenium post title")
    await driver.findElement(By.css(".placeholder")).click()
    {
      const element = await driver.findElement(By.css(".ProseMirror"))
      await driver.executeScript("if(arguments[0].contentEditable === 'true') {arguments[0].innerText = '###Selenium post content'}", element)
    }
    await driver.findElement(By.xpath("//button[@type=\'submit\']")).click()
    // await driver.close()
  })
  it('create_post_missing_fields', async function() {
    await driver.get("http://localhost:3000/")
    // await driver.manage().window().setRect({ width: 1552, height: 832 })
    await driver.findElement(By.css("button[itemid='menu-button-4']")).click()
    await driver.findElement(By.linkText("Create Post")).click()
    await driver.findElement(By.xpath("//button[@type=\'submit\']")).click()
    {
      const elements = await driver.findElements(By.xpath("//div[contains(.,\'Missing fields\')]"))
      assert(elements.length)
    }
    // await driver.close()
  })
  it('edit_post', async function() {
    await driver.get("http://localhost:3000/")
    // await driver.manage().window().setRect({ width: 1552, height: 832 })
    await driver.findElement(By.xpath("//div[starts-with(@id, \'selenium\')]")).click()
    await driver.findElement(By.css(".ProseMirror > p")).click()
    vars["postContent"] = await driver.executeScript("return new Date().toString()")
    {
      const element = await driver.findElement(By.css(".ProseMirror"))
      await driver.executeScript(`if(arguments[0].contentEditable === 'true') {arguments[0].innerText = '${vars["postContent"]}'}`, element)
    }
    await driver.findElement(By.css("button[type='submit']")).click()
    // await driver.close()
  })
  it('delete_post', async function() {
    await driver.get("http://localhost:3000/")
    // await driver.manage().window().setRect({ width: 1552, height: 832 })
    await driver.findElement(By.xpath("//div[starts-with(@id, \'selenium\')]")).click()
    await driver.findElement(By.id("delete-btn")).click()
    // await driver.close()
  })
  it('logout', async function() {
    await driver.get("http://localhost:3000//")
    await driver.findElement(By.css("button[itemid='menu-button-4']")).click()
    await driver.findElement(By.css("button[itemid='logout-btn']")).click()
    // await driver.close()
  })
  it('register_user_exists', async function() {
    await driver.get("http://localhost:3000//")
    // await driver.manage().window().setRect({ width: 1536, height: 816 })
    await driver.findElement(By.id("get-started-btn")).click()
    await driver.findElement(By.id("input-email-for-credentials-provider")).click()
    await driver.findElement(By.id("input-email-for-credentials-provider")).sendKeys("selenium@example.com")
    await driver.findElement(By.id("input-password-for-credentials-provider")).sendKeys("1234")
    await driver.findElement(By.id("input-new-for-credentials-provider")).click()
    await driver.findElement(By.css("button")).click()
    {
      const elements = await driver.findElements(By.xpath("//p[contains(.,\'Sign in failed. Check the details you provided are correct.\')]"))
      assert(elements.length)
    }
    // await driver.close()
  })
  it('login_user_missing', async function() {
    await driver.get("http://localhost:3000/")
    // await driver.manage().window().setRect({ width: 1552, height: 832 })
    await driver.findElement(By.id("get-started-btn")).click()
    await driver.findElement(By.css("button")).click()
    {
      const elements = await driver.findElements(By.xpath("//p[contains(.,\'Sign in failed. Check the details you provided are correct.\')]"))
      assert(elements.length)
    }
    // await driver.close()
  })
  it('login_user_invalid', async function() {
    await driver.get("http://localhost:3000/")
    // await driver.manage().window().setRect({ width: 1552, height: 832 })
    await driver.findElement(By.id("get-started-btn")).click()
    await driver.findElement(By.id("input-email-for-credentials-provider")).click()
    await driver.findElement(By.id("input-email-for-credentials-provider")).sendKeys("selenium@example.com")
    await driver.findElement(By.id("input-password-for-credentials-provider")).sendKeys("12345")
    await driver.findElement(By.css("button")).click()
    {
      const elements = await driver.findElements(By.xpath("//p[contains(.,\'Sign in failed. Check the details you provided are correct.\')]"))
      assert(elements.length)
    }
    // await driver.close()
  })
  it('login_user', async function() {
    await driver.get("http://localhost:3000/")
    // await driver.manage().window().setRect({ width: 1552, height: 832 })
    await driver.findElement(By.id("get-started-btn")).click()
    await driver.findElement(By.id("input-email-for-credentials-provider")).click()
    await driver.findElement(By.id("input-email-for-credentials-provider")).sendKeys("selenium@example.com")
    await driver.findElement(By.id("input-password-for-credentials-provider")).sendKeys("1234")
    await driver.findElement(By.css("button")).click()
    // await driver.close()
  })
})
