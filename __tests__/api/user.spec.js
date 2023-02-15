// Bicliotecas
// Configura
const supertest = require('supertest'); // Framework de Teste de API
// Checar informações que vai acontecer no teste
const assert = require('chai').assert; // Função de assertiva do resultado

// Constantes, Variaveis e Objetos
const baseUrl = "https://petstore.swagger.io/v2"; // url base da API

// Descrição = Conjuntos de Testes ~ Classe

describe("PetStore Swagger - User", () => {
    const request = supertest(baseUrl);
    // Get - teste de consultar usuario
    it("Get User Login", () => {
        // Configura
        username = "xyzcompany";
        password = "123456";

        // Executa
        return request
            .get("/user/login?username=" + username + "&password=" + password)
            .then((response) => {
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.code, 200);
                assert.equal(response.body.type, "unknown");
                mensagem = response.body.message;
                frase = mensagem.substring(0,mensagem.indexOf(":") + 1);
                console.log("A frase eh " + frase);
                assert.equal(frase, "logged in user session:");
                token = mensagem.substring(mensagem.indexOf(":") + 1);
                console.log("O token eh " + token);
                //assert.equal(response.body.message, message);
                //assert.equal(response.body.username, "xyzcompany");
                //assert.equal(response.body.password, "123456");
            });
    });
});