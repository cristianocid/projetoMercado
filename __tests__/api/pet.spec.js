// Bicliotecas
// Configura
const supertest = require('supertest'); // Framework de Teste de API
// Checar informações que vai acontecer no teste
const assert = require('chai').assert; // Função de assertiva do resultado

// Constantes, Variaveis e Objetos
const baseUrl = "https://petstore.swagger.io/v2"; // url base da API
const petId = 17321812;                           // codigo do animal

// Descrição = Conjuntos de Testes ~ Classe

describe("PetStore Swagger - Pet", () => {
    const request = supertest(baseUrl);
    const pets = require("../../src/vendors/json/petn")
    let pet = require("../../src/vendors/json/petBase.json")
    
    // Teste respeitando a ordem primeiro adicionar e só depois deletar
    pets.array.forEach(({nomePet, idPet, nomeCategoria, idCategoria}) => {
        it("Setup Swagger - Add Pets - " + nomePet, () => {
            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria
            pet.tags[0].id = 3
            pet.tags[0].name = "vaccinated" 
            pet.status = "done"

            return request
                .post("/pet")
                .send(pet)
                .then((response) => {
                    assert.equal(response.statusCode, 200)
                });
        });
    })

    // Post - teste de incluir animal
    it("Post Pet", () => {
        // Configura
        // Apontou para o arquivo com os dados do animal
        const jsonFile = require("../../src/vendors/json/pet1.json");
        // Realizar a requisição e receber a resposta

        // Executa
        return request      // chamada para a requisição
            .post("/pet")   // endpoint / função para incluir o animal
            .send(jsonFile) // envia os dados do animal no corpo da requisição
            // Valida
            .then((response) => {
                assert.equal(response.statusCode, 200); // Se a requisição foi recebida e processada
                assert.equal(response.body.id, petId); // Se é o id esperado do animal
                assert.equal(response.body.name, "Garfield"); // Se é o nome esperado
                assert.equal(response.body.status, "available"); // Se está com o status esperado
            })
        });

    // Get - Consulta o animal pelo petID
    it("Get Pet", () => {
        return request              // chamada para a requisição
            .get("/pet/" + petId)   // consultar o animal pelo id
            .then((response) => {  // tratar a resposta / retorno
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.id, petId);
                assert.equal(response.body.name, "Garfield");
                assert.equal(response.body.status, "available");
            });
        });

    // Put - Alterar dados do animal
    it("Put Pet", () => {
        // Configura
        // Apontou para o arquivo json com a alteração desejada
        const jsonFile = require("../../src/vendors/json/pet2.json");
        
        return request              // realizar a requisição
            .put("/pet")            // alterar o animal - aponta para o endpoint
            .send(jsonFile)         // json com a alteração
            .then((response) => {   // receber e validar a resposta
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.id, petId);
                assert.equal(response.body.name, "Garfield");
                assert.equal(response.body.tags[1].id, 4);
                assert.equal(response.body.tags[1].name, "castrated");
                assert.equal(response.body.status, "solded");
            });
        });
    
    // Delete - Exclui o animal
    it("Delete Pet", () => {
        return request                  //realizar requisição
            .delete("/pet/" + petId)    // excluir o animal pelo id
            .then((response) => {       // validar a resposta
                assert.equal(response.statusCode, 200);
                assert.equal(response.body.name, "Garfield");
        });
    });

    // Função de cargas de animais - Setup
    // Adicionando animais
    // Teste não respeitando ordem, adiciona 1 animal e exclui em seguida
    pets.array.forEach(({nomePet, idPet, nomeCategoria, idCategoria}) => {
        {/*it("Setup Swagger - Add Pets - " + nomePet, () => {
            pet.id = idPet
            pet.name = nomePet
            pet.category.id = idCategoria
            pet.category.name = nomeCategoria
            pet.tags[0].id = 3
            pet.tags[0].name = "vaccinated" 
            pet.status = "done"

            return request
                .post("/pet")
                .send(pet)
                .then((response) => {
                    assert.equal(response.statusCode, 200)
                });
        });*/}

        // Deletando animais
        // Para a ordem de teste ficar correta deleta o Setup Swagger 
        it("Teardown Swagger - Delete Pets - " + nomePet, () => {
            
            return request
                .delete(`/pet/${idPet}`)
                .then((response) => {
                    assert.equal(response.statusCode, 200)
                });
        });
    });

});