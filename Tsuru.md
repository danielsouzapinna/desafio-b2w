# TSURU

Documentação resumida para uso do Tsuru, para informações mais detalhadas acesse [a documentação do Tsuru](https://tsuru.io/).

## Instalação

Tsuru é um Plataform as a Service (PaaS), onde podemos instânciar servidores de aplicação e de banco de dados na nuvem.
Para realizar a instalação do client do Tsuru, basta executar o comando abaixo:

```
curl -s https://packagecloud.io/install/repositories/tsuru/stable/script.deb.sh | sudo bash
sudo apt-get install tsuru-client
```

Após realizar a instalação do client, é necessário efetuar o login no Tsuru para que seja possível criar seus servidores (aplicação/banco de dados). Adicione o repositório padrão de sua organização e efetue o login.


* Adicionando repositório padrão
```
tsuru target-add default tsuru.globoi.com -s
tsuru target add secure https://tsuru.globoi.com -s
```

* Login
```
tsuru login
```
> Caso esteja logado no backstage, o login será efetuado automaticamente.


## Servidor de Aplicação (PaaS)

* Criação:

A criação de um servidor de aplicação com o Tsuru é bem simples, basta executar um comando contendo alguns parâmetros de configuração para definir quem é o time responsável, nome da aplicação, quantidade memória e cpu. Veja abaixo as opções de configuração disponível e exemplo de criação:

```
tsuru app-create <NOME-APLICACAO> <TIPO-PLATAFORMA> --plan <NOME-PLANO> --team <NOME-TIME> --pool <TIPO-FILA> --router <TIPO-DE-ROTA>

tsuru app-create purchase-flow-api-dev nodejs --plan small --team gg_infoedg_consumidor --pool dev --router hipache_dev
```

* Tipos de Plataformas (tsuru platform-list)
-> elixir-paulo
- go
- java
- nodejs
- perl
- php
- pypy
- python
- ruby
- static

#### Opções de Planos
O tipo de plano de escolhido irá definir a quantidade de memória, cpu e hd que seu servidor terpa. Para visualizar as opções de planos disponíveis, execute o seguinte comando:
```
tsuru plan-list
```

* Tipo de Fila (tsuru pool-list)
 > galeb_dev, galeb_prod, hipache_dev, hipache_prod, kube_router_dev, rpaas_be_rjdev

## Banco de Dados (DBaaS)
