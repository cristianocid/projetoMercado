const { Builder, By } = require('selenium-webdriver') // Selenium WebDriver
require('chromedriver')                               // Chrome Driver
const assert = require('assert')                      // Assert - para fazer as validações

// Suite de Teste - Conjunto de testes
describe('Login', function (){
    let driver    // objeto do Selenium WebDriver

    // Antes do teste
    beforeEach(async function (){
        driver = await new Builder()  // instacia o Selenium WebDriver
            .forBrowser('chrome')     // seleciona o driver para o Chrome
            .build()                  // executa a operação
        
        driver.manage().setTimeouts({ implicit: 60000 }) // espera implicita de ate 60 mil milisegundos
        driver.manage().window().maximize()              // maximiza a janela do browser 
    })

    // Depois do teste
    afterEach(async function (){
        await driver.quit()           // destruir o objeto do Selenium WebDriver
    })

    // Os Testes
    it('Experimentando Login', async function (){
        await driver.get('https://www.blazedemo.com')         // acessar a home do site
        await driver.findElement(By.linkText('home')).click()  // clicar no link escrito home

        // validar se entrou na pagina de login
        assert(await driver.getTitle() == 'BlazeDemo')        // valida o titulo da guia - neste caso não é conclusivo 
        assert(await driver.findElement(By.css('div.panel-heading')).getText() == 'Login')  // comparar se no cabeçalho do painel esta escrito Login - Mais conclusivo
        
        await driver.findElement(By.id('email')).sendKeys('teste@teste.com.br')             // modo sendKeys cola o texto
        //await driver.findElemet(By.id('email')).sendKeys(Key.chord('teste@teste.com.br'))  // modo Key.chord digita cada caractere do texto
    
        // escreve no campo senha
        await driver.findElement(By.id('password')).sendKeys('teste123')

        // clicar no botao Login
        await driver.findElement(By.css('button.btn.btn-primary')).click()

        await driver.sleep(3000) // espera bruta - "alfinete" - remover antes de subir no repositorio
        
        // Validar titulo da guia
        assert(await driver.getTitle() == 'Page Expired')

        console.log('texto: ' + driver.findElement(By.css('div.flex-center.position-ref.full-height')).getText()) // pegar texto da pagina
        // Validar titulo da pagina
        assert(await driver.findElement(By.css('div.flex-center.position-ref.full-height')).getText() == '419\nPage Expired')
    })


})