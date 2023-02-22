// bibliotecas
const { Builder, By } = require('selenium-webdriver')
require('chormewebdriver')
const assert = require('assert')

// Suite de Teste
describe('Comprar Passagem WD', () => {
    let driver // objeto para ser o Selenium

    // Inicialização
    beforeEach('', async() => { //async function ()
        driver = await new Builder()
            .forBrowser('chrome')
            .build()
        driver.manage().setTimeouts({ implicit: 60000 })
        driver.manage().window().maximize()
    })

    // Finalização
    afterEach('', async() => {
        await driver.quit()
    })

    // Teste
    it('Comprar Passagem SP - CA', async() => {
        await driver.get('https://www.blazedemo.com')

        {
            const dropdown = await driver.findElement(By.name('fromPort'))
            await dropdown.findElement(By.xpath("//option[. = 'São Paolo']")).click()
        }


        {
            const dropdown = await driver.findElement(By.name('toPort'))
            await dropdown.findElement(By.xpath("//option[. = 'Cairo']")).click()
        }

        
    })
})