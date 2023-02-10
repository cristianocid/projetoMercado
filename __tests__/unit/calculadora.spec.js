// Bibliotecas
// Apontamento para o arquivo de desenvolvimento que vamos testar
const calculadora = require("../../src/calculadora");

// Apontamento para o arquivo de massa de teste
const arquivoJson = require("../../src/vendors/csv/massaDivisao");

//Funções de teste de unidade
test("Somar 5 + 7", () => {
    // 1 - Configura
    // 1.1 Dados de entrada 
    const num1 = 5;
    const num2 = 7;

    // 1.2 Resultado Esperado
    const resultadoEsperado = 12;

    // 2 - Executa
    // criando um objeto para receber a função da calculadora
    const somarDoisNumeros = calculadora.somarDoisNumeros;
    // executando a função somar dois numeros e guardando resultado atual
    const resultadoAtual = somarDoisNumeros(num1, num2);

    // 3 - Valida
    expect(resultadoAtual).toBe(resultadoEsperado);
    console.log("Somar ",num1, "+",num2,": ", resultadoAtual); 
})

test("Subtrair 15 - 7", () => {
    // 1 - Configura
    // 1.1 Dados de entrada 
    const num1 = 15;
    const num2 = 7;

    // 1.2 Resultado Esperado
    const resultadoEsperado = 8;

    // 2 - Executa
    // criando um objeto para receber a função da calculadora
    const subtrairDoisNumeros = calculadora.subtrairDoisNumeros;
    // executando a função subtrair dois numeros e guardando resultado atual
    const resultadoAtual = subtrairDoisNumeros(num1, num2);

    // 3 - Valida
    expect(resultadoAtual).toBe(resultadoEsperado);
    console.log("Subtrair ",num1, "-", num2,": ", resultadoAtual); 
})

test("Multiplicar 2 * 7", () => {
    // 1 - Configura
    // 1.1 Dados de entrada 
    const num1 = 2;
    const num2 = 7;

    // 1.2 Resultado Esperado
    const resultadoEsperado = 14;

    // 2 - Executa
    // criando um objeto para receber a função da calculadora
    const multiplicarDoisNumeros = calculadora.multiplicarDoisNumeros;
    // executando a função multiplicar dois numeros e guardando resultado atual
    const resultadoAtual = multiplicarDoisNumeros(num1, num2);

    // 3 - Valida
    expect(resultadoAtual).toBe(resultadoEsperado);
    console.log("Multiplicar", num1, "*" ,num2,": ", resultadoAtual); 
})

    //HP ALM Data Driven Test
    let massaDivisao = [
        [10, 5, 2],
        [15, 3, 5],
        [ 8, 4, 2],
        [ 7, 0, Infinity]
    ];
    
test.each(massaDivisao)("Dividir %f / %f", (num1, num2, resultadoEsperado) => {
    // Dados de entrada e resultado esperado são providos pela lista massaDivisão
    // 1 - Configura
    // 1.1 Dados de entrada 
    //const num1 = 14;
    //const num2 = 7;

    // 1.2 Resultado Esperado
    //const resultadoEsperado = 2;

    // 2 - Executa
    // criando um objeto para receber a função da calculadora
    const dividirDoisNumeros = calculadora.dividirDoisNumeros;
    // executando a função dividir dois numeros e guardando resultado atual
    const resultadoAtual = dividirDoisNumeros(num1, num2);

    // 3 - Valida
    expect(resultadoAtual).toBe(resultadoEsperado);
    console.log("Dividir ",num1, "/",num2,": ", resultadoAtual);    
})

test.each(arquivoJson.array.map(elemento => [
    elemento.num1,
    elemento.num2,
    elemento.resultadoEsperado
]))
("DDT: Dividir %f / %f", (num1, num2, resultadoEsperado) => {
    // 1 - Configura
    // As informoções estão vindo do arquivoCsv

    // 2 - Executa
    // criando um objeto para receber a função da calculadora
    const dividirDoisNumeros = calculadora.dividirDoisNumeros;
    // executando a função multiplicar dois numeros e guardando resultado atual
    const resultadoAtual = dividirDoisNumeros(num1, num2);

    // 3 - Valida
    expect(resultadoAtual).toBe(resultadoEsperado);
    console.log("Dividir", num1, "/" ,num2,": ", resultadoAtual); 
})