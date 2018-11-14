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
* GET /planets?page=2&per_page=5

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

#### Paginação de Resultados
| Para realizar paginação de resultados basta informar os seguintes parâmetros abaixo:
* page = número da página
* per_page = quantidade de registros por página

Obs.: Caso não seja informado os parâmetros acima, o sistema irá utilizar como valores default: page=1 e per_page=10