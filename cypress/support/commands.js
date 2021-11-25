import {baseApiUrl} from '../../cypress.json'
import faker from 'faker';
import "cypress-localstorage-commands"
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('generateUser', () => {
    let firstname = faker.name.firstName();
    let secondname = faker.name.lastName();
    const fullname = firstname + secondname;
    const password = 'p@ssw0rd';
    const email = faker.internet.email();

    const user = {
        "login": fullname,
        "email": email,
        "password": password
    }
    cy.writeFile('../../fixtures/utils/user.json', user)
})


Cypress.Commands.add('createUser', (login, email, password) => {
    cy.request({
        method: 'POST',
        url: baseApiUrl + '/users',
        body: {user:
        {username: login,
         email: email,
         password: password}}
    }
    )
})

Cypress.Commands.add('login', (email, password) => {
    cy.request({
        method: 'POST',
        url: baseApiUrl + '/users/login',
        body: {user:
        {email: email,
         password: password}}
        }).then(($res) => {
            cy.setLocalStorage('jwt', $res.body.user.token)
        })
 })
