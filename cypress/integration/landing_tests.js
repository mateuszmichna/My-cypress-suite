import { emailSendingPageSelectors } from "../fixtures/email_sending_page_selectors"
import { emailSendingPageUtils } from "../fixtures/email_sending_page_utils"

describe('Landing tests', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('tests if the URL and landing page is valid', () => {
        cy.url().should('include', emailSendingPageUtils.proper_url);
        cy.get(emailSendingPageSelectors.footer).contains(emailSendingPageUtils.footer_copy).should('be.visible')
    })
  
    it('tests if all fields are visible and enabled, tests if all titles are proper', () => {
        cy.get(emailSendingPageSelectors.email_field_title).should('be.visible').invoke('text').should('eq', emailSendingPageUtils.email_field_copy)  
        cy.get(emailSendingPageSelectors.email_field).should('be.visible').should('not.to.be.disabled')
        cy.get(emailSendingPageSelectors.first_name_field_title).should('be.visible').invoke('text').should('eq', emailSendingPageUtils.first_name_field_copy)  
        cy.get(emailSendingPageSelectors.first_name_field_title).should('be.visible').should('not.to.be.disabled')
        cy.get(emailSendingPageSelectors.surname_field_title).should('be.visible').invoke('text').should('eq', emailSendingPageUtils.surname_field_copy)  
        cy.get(emailSendingPageSelectors.surname_field).should('be.visible').should('not.to.be.disabled')
        cy.get(emailSendingPageSelectors.newsletter_type_field_title).should('be.visible').invoke('text').should('eq', emailSendingPageUtils.newsletter_type_field_copy)  
        cy.get(emailSendingPageSelectors.newsletter_type_field).should('be.visible').should('not.to.be.disabled')
        cy.get(emailSendingPageSelectors.starting_date_field_title).should('be.visible').invoke('text').should('eq', emailSendingPageUtils.starting_date_field_copy)  
        cy.get(emailSendingPageSelectors.ending_date_field).should('be.visible').should('not.to.be.disabled')
        cy.get(emailSendingPageSelectors.sex_buttons_title).should('be.visible').invoke('text').should('eq', emailSendingPageUtils.sex_buttons_copy)
        cy.get(emailSendingPageSelectors.sex_buttons).should('be.visible').should('not.to.be.disabled')
        cy.get(emailSendingPageSelectors.agreement_checkmark).should('not.to.be.disabled').should('not.to.be.checked')
        cy.get(emailSendingPageSelectors.submit_button).should('be.visible').should('not.to.be.disabled')
          
    })

    it('tests if the agreement link directs to google.pl', () => {
        cy.get(emailSendingPageSelectors.agreement_link).should('have.attr', 'href', emailSendingPageUtils.agreement_link)
        .then(($a) => {
            const url = $a.prop('href')
            cy.request(url).its('body').should('include', '</html>')
    })
  })
})