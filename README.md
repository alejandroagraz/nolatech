# Docker - Compose - Mongo - JWT - Express

## Features

#### Demo Api Nolatech

## Characteristic
* User login
* Token protected routes
* Role protected routes
* Generate a report in xlsx format
* Unit tests in jest
* All environments are created with docker and docker-compose

## Starting 🚀

*  These instructions will allow you to obtain a copy of the running project on your local machine for development and testing purposes.

## Usage
### Starter files
Clone the `develop` branch with the following command:

```bash
git clone https://github.com/alejandroagraz/nolatech.git
```

#### Directory Structure
```diff

+ ┌── workspace
+ | ├── projects
+ | | └── backend
+ | ├── docker-compose.debug
+ | ├── docker-compose.yml
+ | ├── README.md
+ └─└── example-env

```

## Prerequisites 📋

#### Docker Engine

##### Docker Installation On Linux
* [Docker For Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)

##### Docker Installation On Windows
* [Docker For Windows](https://docs.docker.com/docker-for-windows/install/)

#### Docker Compose

##### Docker Compose Installation
* [Docker Compose](https://docs.docker.com/compose/install/)

#### Enabling Non-root Users to Run Docker Commands (Optional)
```diff
sudo groupadd docker
sudo gpasswd -a $USER docker
newgrp docker

+ In the case of a virtual machine, it may be necessary to restart the virtual machine for the changes to take effect.

```

## Initialize (In the main directory run this /workspace)

```diff

+ Rename the file found in the root directory ./ example-env to .env

+ Go to directory the projects/backend directory and rename the file env-example to .env
    
+ Go to directory the /workspace and run the following commands from terminal
    docker-compose up --build -d
```

## Prerequisites for installation conventional ⚙️
```diff
+ Go to directory the projects/backend directory and rename the file env-example to .env
  Set up a mongodb database and modify the .env file with the connection parameters

+ Run the following commands from terminal

    1. Install the dependencies
       yarn install

    2. Compile the application
       yarn build

    3. Run the seeders to create the test data
       yarn start
```

#### Additional information 📖
```diff
+ Run tests unit
    To run unit tests you must run (yarn test) in the terminal
    Para ejecutar las pruebas unitarias debe ejecutar en el terminal (yarn test) 


 Un empleado al momento de registrarse queda asignado a un departamento, por ende los verificadores para las evaluaciones
 son los gerentes de cada departamento, un departamento solo puede tener asignado un gerente, pero un gerente puede tener asignado varios departamentos,
 existe un cron job que se ejecuta por razones de prueba cada 5 min para verificar si existe algun empleado que tenga alguna evaluacion pendiente por enviar,
 de ser este el caso se le envia un email notificandole que tiene una evaluacion pendiente, la url auth/register solo registra usuarios con un rol admin,
 la ruta /evaluations/:id/submit genera un registro en el documento evaluationCompleted donde se lleva un registro con los datos del empleado que envio la evaluacion,
 las preguntas y respuestas de la evaluacion enviada, este registro queda peendiente por verificar, al momento que el gerente verifica todas las respuestas,
 se llama un evento que marca como verifica la evaluacion y se calcula la puntuacion de la evaluacion.
 
 An employee at the time of registration is assigned to a department, therefore the verifiers for the evaluations are the managers of each department,
 a department can only have one manager assigned, but a manager can have several departments assigned, there is a cron job that runs for testing reasons every 5 min to check
 if there is any employee who has any pending evaluation to send, if this is the case an email is sent notifying him that he has a pending evaluation,
 the url auth/register only registers users with an admin role, the route /evaluations/:id/submit generates a record in the evaluationCompleted document
 where a record is kept with the data of the employee who sent the evaluation, the questions and answers of the sent evaluation, this record remains pending
 to be verified, when the manager verifies all the answers an event is called that marks how the evaluation is verified and the evaluation score is calculated.
```

#### Docker Containers
```diff
+ View containers running
    docker ps

+ View containers stopped and running
    docker docker ps -a

+ Enter a container
    docker exec -ti (containerName o el ContainerId) /bin/sh

+ Stop a container
    docker stop (containerName o el ContainerId)

+ Remove a container
    docker rm (containerName o el ContainerId)

+ Start all containers
    docker start $(docker ps -a -q)

+ Stop all containers
    docker stop $(docker ps -a -q)

+ Turn off all containers
    docker-compose down

+ Remove all containers
    docker rm $(docker ps -a -q)
```
## Built With 🛠️
```diff
+    MonogoDB
+    Express
+    JWT
+    Jest
+    Docker
+    Docker Compose
```

## Developed Container ✒️
```diff
+    Developed by: Jose Agraz 
+    Email: joseagraz29@gmail.com
```
