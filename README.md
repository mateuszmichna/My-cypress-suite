# My Small Cypress Suite

## About

This is my look at the Cypress testing suite. It is very simple, but dockerized. This is living example based on Condiut app(React)

This suite will not automatically record tests but it will make screenshots when assertions would fail. Moreover, folders `screenshots` and `videos` are git ignored.

Manually added `data-cy` params to the elements used in test-cases to provide scalability.

## Prerequisites

The only requirement for this project is to have Node.js version 14 installed on your machine.

## Commands to run the tests without docker
- `npm install` - to install dateformat library
- `npm start` - to start Conduit app locally
- `npm run cy:open` - opens Cypress UI
- `npm run cy:test` - runs tests in terminal
- `npm run cy:test:record` - runs test in terminal and creates the report at Cypress Dashboard service 


## Commands to run test by creating docker image and run them inside this image
- `docker build -t my_cypress_image:1.0.0 .` - to create the docker image
- `docker run -it -v $PWD:/My-Cypress-Suite -t my_cypress_image:1.0.0` - to run the node app 
- `docker ps` - to get the docker id
- `docker exec -it <container id> /bin/bash` - it will open the terminal inside the docker, now you could run `npm run cy:test:record`