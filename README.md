# SalaReuniao
# Projeto Laravel e React com Docker

Este projeto é uma API REST de reservas de salas, construída com Laravel Api, frontend com React e utilizando Docker para facilitar o setup do ambiente.

## Pré-requisitos

Certifique-se de ter os seguintes softwares instalados:

- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Passo a passo para rodar o projeto


```bash
### 1. Clonar o repositório
git clone https://github.com/seu-usuario/seu-repositorio.git
cd SalaReuniao/application
cp .env.example .env


### 3. Iniciar o container
cd .. # Volte ao diretório raiz onde está o arquivo docker-compose.yml
docker compose up --build

### 4. Instalar dependências e configurar a aplicação
docker compose exec app composer install
docker compose exec app php artisan migrate





