# Linha Verde App

Este e um projecto de desenvolvimento de um plataforma de gestao de callcenter

## Criando ambiente virtual

Para correr o projecto django primeiro e nescessario criar o ambiente virtual

### Criando ambiente virtual em linux

    python3 -m venv venv

### Criando ambiente virtual no windows

    py -3 -m venv venv

Se você precisou instalar o virtualenv porque está em uma versão mais antiga do Python, use o seguinte comando:

    virtualenv venv
No Windows:

    \Python27\Scripts\virtualenv.exe venv

## Activar o ambiente virtual

Antes de trabalhar em seu projeto, ative o ambiente correspondente:

    source venv/bin/activate
No Windows:

    ./venv/Scripts/activate.bat

## Instalando dependencias do projecto

Uma vez dentro do ambiente virtual do projecto django na raiz
do projecto corra o comando para install as dependecias django:

    pip install  -r requirements.txt

## Configuracao do settings_local.py

Apos instalar todas as dependecias devemos configurar o nosso settings local para conseguirmos correr o projecto com sucesso,
na raiz do projecto veremos o ficheiro __settings_local.template__. Faca uma copia deste ficheiro para a pasta __callcenter__ e renomei a extensao para __.py__ preencha os campos nescessarios de variaveis do ambiente de forma a finalizar as configuracoes e o projecto estara pronto para correr o mesmo.

## Configuracao do projecto com Docker

Caso nao queira fazer as configuracoes nescessarias no seu computador tambem podera correr a aplicacao utilizando o __Docker__.

### Requisitos para correr a aplicacao com o Docker
 - [Docker](https://docs.docker.com/get-docker/)
 - [Docker Compose](https://docs.docker.com/compose/install/)

Apos ter o __docker__ e o __docker-compose__ instalado e a correr no seu
sistema operativo, na raiz do projecto atraves do terminal digite o seguinte comando:

    docker-compose up

Ou

    sudo docker-compose up


## Criando as tabelas nescessarias para o projecto

Apos configurar __settings_local.py__ sera nescessario fazer o __migrate__ das tabelas da projecto,
de forma que possa prosseguir com os proximos passos da aplicacao, para isso digite os comandos abaixo:

    ./manage.py migrate

Apos fazer o migrate das tabelas sera nescessario carregar os dados inicias da aplicacao que estao na
pasta __fixtures__ atraves do comando:
    >./scripts/setup.sh

## Correndo o projecto django

Para correr o projecto django digite o comando
`python manage.py runserver` ou `python manage.py runserver localhost:port` para uma porta em especifica.

## Regras de formatacao de codigo python

Para uma melhor organizacao e padronizacao de codigo aconselha-se
as seguir as normas da PEP8 ao escrever o codigo python.

### Regras de numeclatura de variaves

Nomes de __variaveis__, __classes__ e __funcoes__ devem estar sempre em __ingles__

### Regras de importacoes de modulos

A ordem da importacoes devem seguir o seguinte padrao:

+ Built-in libraries
+ Django framework libraries
+ Third Party libraries
+ My libraries

Ainda falando na ordem de importacoes, sigam a ordem alfabetica de importacoes por modulo para melhor ajudar a entender as importacoes e nunca importem mais de um __Modulo__ o __Classe__ por linha.
Exemplo:

    from django.core.exceptions import ObjectDoesNotExist
    from rest_framework import permissions
    from .serializers import JobOpportunitySerializer

### Regras de organizacao de api

Os API devem ser criados dentro da pasta _api_ de cada __app__
onde devemos serparar os ficheiros por serializer.py, views.py, filters.py, endpoints.py e outros caso hajam a nescessidade

Os endpoints deve estar no caminhho __baseUrl/api/v1/__ onde em development mode devemos ver a lista de api.