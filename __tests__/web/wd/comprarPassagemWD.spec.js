// bibliotecas
const { Builder, By } = require('selenium-webdriver')
require('chromedriver')
const assert = require('assert')

// Suite de Teste
describe('Comprar Passagem WD', () => {
    let driver // objeto para ser o Selenium

    // Inicialização
    beforeEach(async() => { //async function ()
        driver = await new Builder()
            .forBrowser('chrome')
            .build()
        driver.manage().setTimeouts({ implicit: 60000 })
        driver.manage().window().maximize()
    })

    // Finalização
    afterEach(async() => {
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

        // espera bruta - não devemos deixar no codigo-fonte
        // é como um alfinete - tira antes de usar
        // await driver.sleep(3000)

        // clicar no botão Find Flights ( Procurar Voos )
        await driver.findElement(By.css('input.btn.btn-primary')).click()

        // validar o titulo da guia e a frase de titulo da seleção dos voos
        console.log("Get Title = " + await driver.getTitle()) // escreve no terminal o que esta no getTitle
        assert(await driver.getTitle() == 'BlazeDemo - reserve')
        assert(await driver.findElement(By.css('h3')).getText() == 'Flights from São Paolo to Cairo:')
    })
})