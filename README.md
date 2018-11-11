# Desafio B2W

Projeto utilizado para construção do desafio B2W.

## Instalação

Para rodar o projeto é necessário possuir o Docker e Docker-compose instalados na máquina. Baixe o repositório e entre no diretório raiz do projeto.

#### Para executar o projeto
```
docker-compose up
```

#### Para parar o projeto
```
ctrl + c
docker-compose down
docker-compose stop
```

#### Para executar os testes do projeto
```
docker-compose -f docker-compose.test.yml up
```

## APIs do projeto

* URL_BASE = http://localhost:3000

#### Listar
* GET /planets

#### Adicionar
* POST /planets
```
{
    "name": "Alderaan",
    "climate": "temperate",
    "terrain": "grasslands, mountains"
}
```

#### Buscar por ID
* GET /planets/id-desejado

#### Buscar por nome
* GET /planets?name=nome-desejado

#### Remover
* DELETE /planets/id-desejado
