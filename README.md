# Desafio – Asksuite

![](https://img.shields.io/github/package-json/v/isaiasvallejos/asksuite-challenge.svg) ![](https://img.shields.io/github/license/isaiasvallejos/asksuite-challenge.svg) ![](https://img.shields.io/github/languages/top/isaiasvallejos/asksuite-challenge.svg?&color=yellow)

Em produção em: https://crawler.isaiasvallejos.dev

## Sumário

Esse repositório representa um desafio proposto pela empresa [Asksuite](https://asksuite.com/) e está sendo disponibilizado também como caso de estudo e portfolio.

## O que é?

Um projeto de webcrawler, especificos para hotéis da plataforma Omnibees, para consulta de quartos disponíveis baseados no _check in_ e _check out_ de um cliente. Pode-se também aplicar filtros de quantidade de adultos, crianças, idades das crianças e também de cupons.

#### Tecnologias

- [Node.js](https://nodejs.org)
  - [Express.js](https://expressjs.com) - framework web para API RESTs
  - [Puppeteer](https://github.com/GoogleChrome/puppeteer) - biblioteca de controle do Chromium para _web crawling_.
  - [Ramda](https://ramdajs.com) - biblioteca para orquestração e composição de código funcional
  - [Bluebird](http://bluebirdjs.com/docs/api-reference.html) - biblioteca para composição de códigos assíncronos
  - [Date-fns](https://date-fns.org/) - biblioteca para manipulação de datas
  - [Winston](https://github.com/winstonjs/winston) - biblioteca para gerenciamento de logs
  - [Babel](https://babeljs.io/) - compilador de Javascript
  - [Mocha](https://mochajs.org/) com [Chai](https://www.chaijs.com/) - frameworks para criação e execução de testes

#### Dependências

- [Docker](https://www.docker.com/) com [Docker Compose](https://docs.docker.com/compose/)
- Makefile

## Instalação e execução

Recomenda-se a instalação da aplicação em cima de um ambiente Docker.

```sh
$ git clone https://github.com/isaiasvallejos/asksuite-challenge
$ cd asksuite-challenge
$ mv .env.example .env # ren .env.example .env (Windows)
$ make dev # npm run docker:dev
```

A partir disso será possível acessar o serviço, por padrão, no endereço `localhost:8080`.

### Uso

Para utilizar a API de _web crawler_ basta realizar um `POST /api/search` com o seguinte corpo em JSON:

```
checkIn: string
checkOut: string
adults?: integer
childrens?: integer
childrensAge?: integer[]
```

Infelizmente, ainda o tempo de requisição **pode demorar até 35 segundos**.

**Atenção!** As datas de _check in_ e _check out_ devem estar no formato de ddMMyyyy (e.g. 01012019 = 01/01/2019).

## Comandos

É possível verificar todos os comandos dentro dos arquivos `Makefile` e `package.json`.

#### Testes

```sh
$ make tests # npm run docker:tests
```

#### Produção

```sh
$ make build # npm run docker:build
$ make start # npm run docker:start
```

#### Logs

```sh
$ make logs # npm run docker:logs
```
