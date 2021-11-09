# TSH Small Cypress Suite

This is the TSH.io home task. Made to test newsletter UI and mailing. It connects to Mailsac API to get Inbox.
It consist of some tiny tests, one `_utils.js` file with needed text variables, one `_selectors.js` file with
selectors to this page (but I am not using Page Object Pattern - there are not actions based on them, just selectors)
and `dates_serializer.js` with functions that changes date format, because there are three of them at this page.

What is worth to say - backend of this app will serve dates in UTC format when we are using app in GMT +2 :(
So there is a 2 hours gap and these tests are useless when performed in GMT +2 from 00:00 to 02:00. 

This suite will automatically record tests and make screenshots when assertions would fail. Folders `screenshots` and
`videos` are git ignored.

## Prerequisites

The only requirement for this project is to have Node.js version 14 installed on your machine.

## Commands to run the tests without docker
- `npm install` - to install dateformat library
- `npm run cy:open` - opens Cypress UI
- `npm run cy:test` - runs tests in terminal


## Commands to run test by creating docker image and run them inside this image
- `docker build -t my_cypress_image:1.0.0 .` - to create the docker image
- `docker run -it -v $PWD:/TSH-Cypress-Suite -t my_cypress_image:1.0.0` - to run the tests based on builded image