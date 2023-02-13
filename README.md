# Notifications service

Serviço de notificações criado com NestJs e kafka. A aplicação é responsável por enviar notificações para os usuários através de eventos produzidos por outros serviços.

A aplicação foi desenvolvida utilizando o framework NestJs, Kafka como sistema de mensageria e SQLite como banco de dados, juntamente com Prisma. Ela conta com algumas funcionalidades para notificações, como: envio, cancelamento, listagem para um usuário específico, leitura e contagem.

## Tecnologias utilizadas

- [NestJs](https://nestjs.com/)
- [Kafka](https://kafka.apache.org/)
- [SQLite](https://www.sqlite.org/index.html)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)

## Pré-requisitos

- [Docker](https://www.docker.com/)

## Configuração

Antes de começar a utilizar a aplicação, é necessário configurar o arquivo .env com as variáveis de ambiente.

## Configuração do Kafka

A aplicação utiliza o Kafka como sistema de mensageria. Para utilizá-lo, é necessário que o servidor esteja rodando localmente. Para isso, é possível utilizar o docker-compose.yml na raiz do projeto, que irá subir o servidor do kafka localmente.

## Rodando localmente

- Clone o repositório
- Instale as dependências
```
npm install
```
- Suba o Kafka
```
docker-compose up -d
```
- Suba a aplicação
```
npm run start:dev
```
=======
English version 
=======

Notifications service created with NestJs and kafka. The application is responsible for sending notifications to users through events produced by other services.

The application was developed using the NestJs framework, Kafka as a messaging system and SQLite as a database, along with Prisma. It has some features for notifications, such as: sending, cancellation, listing for a specific user, reading and counting.

## Technologies used

- [NestJs](https://nestjs.com/)
- [Kafka](https://kafka.apache.org/)
- [SQLite](https://www.sqlite.org/index.html)
- [Prisma](https://www.prisma.io/)
- [Docker](https://www.docker.com/)

## Prerequisites

- [Docker](https://www.docker.com/)

## Configuration

Before starting to use the application, it is necessary to configure the .env file with the environment variables.

## Kafka configuration

The application uses Kafka as a messaging system. To use it, the server must be running locally. For this, it is possible to use the docker-compose.yml at the root of the project, which will start the kafka server locally.

## Running locally

- Clone the repository
- Install dependencies
```
npm install
```
- start Kafka
```
docker-compose up -d
```
- Run the application
```
npm run start:dev
```