import { createArticlePage } from '../fixtures/pages/create_article_page_selectors'
import { createArticlePageUtils } from '../fixtures/utils/create_article_page_utils'
import { naviBarPage } from '../fixtures/pages/navibar_page_selectors'
import { userPreviewPage } from '../fixtures/pages/user_preview_page_selectors'
import { naviBarUtils } from '../fixtures/utils/navibar_page_utils'


describe('This is some dummy suite with logged in user', () => {
    
    before('Generate user', () => {
        cy.generateUser().then(() =>{ 
            cy.readFile(Cypress.env('userDataFilepath')).then((user) => {
                cy.task('log', `\nI am using user with these specs:\n\n username: ${user.login} \n email: ${user.email} \n password: ${user.password}\n\n`)
                cy.createUser(user.login, user.email, user.password)})
        })
    })

    beforeEach('Login via API', () => {
        cy.wrapUser()
        cy.get('@User').then((user) => {
            cy.login(user.email, user.password)})
        cy.visit('/')
})

    it('Test if user is logged in after beforeEach hook', () => {
        cy.getLocalStorage('jwt').should('not.be.empty')
        cy.get(naviBarPage.create_post_button).invoke('text').should('contain', naviBarUtils.create_post_button_copy)
        cy.get(naviBarPage.settings_button).invoke('text').should('contain', naviBarUtils.settings_button_copy)
        cy.get('@User').then((user) => {
            cy.get(naviBarPage.user_bar_button).invoke('text').should('eq', user.login)
        })
    })

    it('Test if user bar is appearing after clicking the User Name button', () => {
        cy.get(naviBarPage.user_bar_button).click()
        cy.get(userPreviewPage.avatar).should('be.visible')
        cy.get('@User').then((user) => {
            cy.get(userPreviewPage.username).invoke('text').should('eq', user.login)
        })
    })

    it('Test if post creation page is opening after clicking the New Post button', () =>{
        cy.get(naviBarPage.create_post_button).click()
        cy.url().should('contain', Cypress.env('createPostUrl'))
    })

    it('Test if post creation page has proper fields', () =>{
        cy.visit(Cypress.env('createPostUrl'))
        cy.get(createArticlePage.article_title_field).should('be.visible')
        .invoke('attr', 'placeholder').should('eq', createArticlePageUtils.article_title_field_copy)
        cy.get(createArticlePage.article_description_field).should('be.visible')
        .invoke('attr', 'placeholder').should('eq', createArticlePageUtils.article_description_field_copy)
        cy.get(createArticlePage.article_body_field).should('be.visible')
        .invoke('attr', 'placeholder').should('eq', createArticlePageUtils.article_body_field_copy)
        cy.get(createArticlePage.article_tags_field).should('be.visible')
        .invoke('attr', 'placeholder').should('eq', createArticlePageUtils.article_tags_field_copy)
        cy.get(createArticlePage.publish_button).should('be.visible').should('be.enabled')
        .invoke('text').should('eq', createArticlePageUtils.publish_button_copy)
    })


    afterEach('Describe what is happening after each test case', () => {
        //Every task that should be run after each test
    })

    after('Clear user data', () => {
        //Unfortunately Conduit app does not provide deleting the account via API. Otherwise it should be here
        cy.clearUserFile()
        cy.removeLocalStorage('jwt')
    })
})