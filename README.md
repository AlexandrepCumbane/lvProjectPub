# Linha Verde App

This is a project to develop a call center management platform

## Create a virtual environment

To run the django project first you need to create the virtual environment or run the project using docker-compose

### Creating virtual environment in linux

    python3 -m venv venv

### Creating virtual environment in windows

    py -3 -m venv venv

If you had to install virtualenv because you use and older version of Python < 3.5, use the following command in linux:

    virtualenv venv
In Windows:

    \Python27\Scripts\virtualenv.exe venv

## Activate a virtual environment

Before working on your project, activate the corresponding environment with the following command in linux:

    source venv/bin/activate
In Windows:

    ./venv/Scripts/activate.bat

## Install project dependencies

Once inside the virtual environment of the django project at the root folder
of your project run the following command to install the dependencies django:

    pip install  -r requirements.txt

## Configuracao do settings_local.py

After installing all the dependencies we must configure our local settings to be able to run the project successfully,
at the root of the project you will see a file named __settings_local.template__. Make a copy of this file and move the copy to the __callcenter__ folder, after that change the file extension to __.py__ fill the necessary environment variables in order to run the project locally.

## Run project with Docker

If you don't want to configure the python stack on you local computer, you can run the project using docker and docker-compose __Docker__.

### Install docker in local machine

 - [Docker](https://docs.docker.com/get-docker/)
 - [Docker Compose](https://docs.docker.com/compose/install/)

After you have __docker__ and __docker-compose__ instaled in your computer, run the following command:

    docker-compose up

Or

    sudo docker-compose up

## Creating the necessary tables for the project

After configuring __settings_local.py__ you need to __migrate__ the project tables to the database,
so that you can proceed with the next steps of the application, for that type the commands below:

    ./manage.py migrate

After migrating the tables, it will be necessary to load the initial data of the application that is in the __fixtures__  folder with the following command:
    >./scripts/setup.sh

## Correndo o projecto django

To run the django project type the command:
`python manage.py runserver` or `python manage.py runserver localhost:port` to run in a specific port.

## Code Formating Rules

For a better code organization and standardization it is recommend to
follow the PEP8 rules when writing the python code.

### Naming variable rules

Nomes de __variaveis__, __classes__ e __funcoes__ devem estar sempre em __ingles__

### Module import rules

The order of imports must follow the following pattern:

+ Built-in libraries
+ Django framework libraries
+ Third Party libraries
+ My libraries

### API organization rules

The apis are configured in the _api_ folder of each app __app__
where the files are separate in serializer.py, views.py, filters.py, endpoints.py.

The endpoints are located in the __baseUrl/api/v1/__ where in development mode whe can se all the aplication APIS. Or you can go to __baseURL/docs__ to a friendly api documentation and view.