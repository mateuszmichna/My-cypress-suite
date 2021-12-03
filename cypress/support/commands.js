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

    const user = {
        "login": faker.name.firstName()+faker.name.lastName(),
        "email": faker.internet.email(),
        "password": 'p@ssw0rd'
    }
    cy.writeFile(Cypress.env('userDataFilepath'), user)
})

Cypress.Commands.add('clearUserFile', () => {
    cy.writeFile(Cypress.env('userDataFilepath'), '')
})

Cypress.Commands.add('wrapUser', () => {
    cy.readFile(Cypress.env('userDataFilepath')).then((user) => {
    cy.wrap(user).as('User')})})

Cypress.Commands.add('createUser', (login, email, password) => {
    cy.request({
        method: 'POST',
        url: baseApiUrl + '/users',
        body: {user:
        {username: login,
         email: email,
         password: password}}
        })}
    )

Cypress.Commands.add('login', (email, password) => {
    cy.request({
        method: 'POST',
        url: baseApiUrl + '/users/login',
        body: {user:
        {email: email,
         password: password}}
        }).then(($res) => {
            cy.setLocalStorage('jwt', $res.body.user.token)
        })}
    )
