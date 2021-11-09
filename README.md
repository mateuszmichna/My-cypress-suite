# My Small Cypress Suite

This is my look at the Cypress testing suite. It is very simple, but dockerized. To make this work you should:
- edit `cypress.json` file by replacing `projectId` to your ID
- edit package.json file by replacing `<browser>` with desired browser and `<your_key>` with your Cypress Dashboard Id
- write your first test case using tips inside `test_page_selectors.js`,  `test_page_utils.js`, and `example_test_case.js` 
- insert the written (by you) 'spec.js' files to `cypress.json` in the `testFiles` dict in the queue that you want

This suite will not automatically record tests but it will make screenshots when assertions would fail. Moreover, folders `screenshots` and `videos` are git ignored.

## Prerequisites

The only requirement for this project is to have Node.js version 14 installed on your machine.

## Commands to run the tests without docker
- `npm install` - to install dateformat library
- `npm run cy:open` - opens Cypress UI
- `npm run cy:test` - runs tests in terminal
- `npm run cy:test:record` - runs test in terminal and creates the report at Cypress Dashboard service 


## Commands to run test by creating docker image and run them inside this image
- `docker build -t my_cypress_image:1.0.0 .` - to create the docker image
- `docker run -it -v $PWD:/My-Cypress-Suite -t my_cypress_image:1.0.0` - to run the tests based on builded image, recording and sending report to the dashboard enabled by default