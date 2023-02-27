Feature: Comprar Passagens Aereas
    Por favor, carregar os dados no ambiente
    Scenario: Selecionar Origem e Destino do Voo
        Given acesso o site BlazeDemo
        When Seleciono origem como "Boston" e destino como "Berlin"
        Then exibe o titulo da guia como "BlazeDemo - reserve"