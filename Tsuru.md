# TSURU

Documentação resumida para uso do Tsuru, para informações mais detalhadas acesse [a documentação do Tsuru](https://tsuru.io/).

## Instalação

Tsuru é um Plataform as a Service (PaaS), onde podemos instânciar servidores de aplicação e de banco de dados na nuvem.
Para realizar a instalação do client do Tsuru, basta executar o comando abaixo:

```
curl -s https://packagecloud.io/install/repositories/tsuru/stable/script.deb.sh | sudo bash
sudo apt-get install tsuru-client
```

> Após realizar a instalação do client, é necessário efetuar o login no Tsuru para que seja possível criar seus servidores (aplicação/banco de dados). Adicione o repositório padrão de sua organização e efetue o login.


#### Adicionando repositório padrão
```
tsuru target-add default tsuru.globoi.com -s

tsuru target add secure https://tsuru.globoi.com -s
```

#### Login
```
tsuru login
```
> Caso esteja logado no backstage, o login será efetuado automaticamente.


## Servidor de Aplicação (PaaS)

#### Criação:

```
tsuru app-create <NOME-APLICACAO> <TIPO-PLATAFORMA> --plan <NOME-PLANO> --team <NOME-TIME> --pool <TIPO-FILA> --router <TIPO-DE-ROTA>

tsuru app-create purchase-flow-api-dev nodejs --plan small --team gg_infoedg_consumidor --pool dev --router hipache_dev
```

#### Remoção:

```
tsuru app-remove -a <NOME-APLICACAO>

tsuru app-remove -a purchase-flow-api-dev
```

## Banco de Dados (DBaaS)

#### Criação:

```
tsuru service-instance-add <TIPO-SERVICO> <NOME-SERVICO> <BANCO-DADOS> -t <NOME-TIME> -d <DESCRICAO>

tsuru service-instance-add tsuru-dbaas-dev mysql_purchase_flow_api_dev mysql-5-7-25-small-single-node-rjdev-dev -t gg_infoedg_consumidor -d "MySQL for Purchase Flow Dev API"
```

## Comandos Úteis

#### Deploy de aplicação (NodeJS)
Para realizar o deploy de uma aplicação no Tsuru, basta entrar no diretório raz da aplicação em seu ambiente de desenvolvimento (máquina local) e executar o comando abaixo:
```
tsuru app-deploy -a <NOME-APLICACAO> .

tsuru app-deploy -a purchase-flow-api-dev .
```
> Exemplo feito em uma aplicação NodeJS

#### Consultar Log

```
tsuru app-log -l <NUMERO-LINHAS> -a <NOME-APLICACAO>
tsuru app-log -l 500 -a purchase-flow-api-dev
```

#### Tipos de Plataformas
O tipo de plataforma irá definir para qual linguagem de programação o servidor será configurado (Go, Java, NodeJS, etc).

```
tsuru platform-list
```

#### Opções de Planos
O tipo de plano de escolhido irá definir a quantidade de memória, cpu e hd que seu servidor terá. Para visualizar as opções de planos disponíveis, execute o seguinte comando:

```
tsuru plan-list
```

#### Tipo de Rota
Para listar as opções de rotas disponíveis, execute o comando:
```
tsuru pool-list
```
 > galeb_dev, galeb_prod, hipache_dev, hipache_prod, kube_router_dev, rpaas_be_rjdev
 
#### Criar variável de ambiente

* Variável pública
```
tsuru env-set -a <NOME-APLICACAO> <NOME-VARIAVEL>=<VALOR>

tsuru env-set -a purchase_flow_api_dev DBAAS_MYSQL_ENDPOINT=teste
```

* Variável privada
```
tsuru env-set -a <NOME-APLICACAO> <NOME-VARIAVEL>=<VALOR> -p

tsuru env-set -a purchase_flow_api_dev DBAAS_MYSQL_ENDPOINT=teste -p
```

#### Listar informações de um serviço

```
tsuru service-instance-info <TIPO-SERVICO> <NOME-SERVICO>

tsuru service-instance-info tsuru-dbaas-dev mysql_purchase_flow_api_dev
```

#### Realizar o BIND entre um servidor de aplicação e um banco de dados

```
tsuru service-instance-bind <TIPO-SERVICO> <NOME-SERVICO> -a <NOME-APLICACAO>

tsuru service-instance-bind tsuru-dbaas-dev mysql_purchase_flow_api_dev -a purchase-flow-api-dev
```

#### Entrar no shell de um servidor

```
tsuru app-shell -a <NOME-APLICACAO>

tsuru app-shell -a purchase-flow-api-dev
```
 
 #### Listar variáveis de ambiente
Uma vez que você tenha entrado no shell de um servidor

* Listar todas as variáveis de ambiente
```
printenv
```

* Listar variáveis de ambiente "filtradas"
```
printenv | grep MYSQL
```
