import { emailSendingPageSelectors } from "../fixtures/email_sending_page_selectors"
import { emailSendingPageUtils } from "../fixtures/email_sending_page_utils"

describe('Fields errors tests', () => {
    beforeEach(() => {
      cy.visit('/')
    })
  
    it('tests if the blank form could be sent', () => {
      cy.get(emailSendingPageSelectors.submit_button).click()
      cy.get(emailSendingPageSelectors.email_field).should('have.css', 'border-color', emailSendingPageUtils.error_color)
      cy.contains(emailSendingPageUtils.email_field_error).should('have.css', 'color', emailSendingPageUtils.error_color)
      cy.get(emailSendingPageSelectors.first_name_field).should('have.css', 'border-color', emailSendingPageUtils.error_color)
      cy.contains(emailSendingPageUtils.first_name_field_error).should('have.css', 'color', emailSendingPageUtils.error_color)
      cy.get(emailSendingPageSelectors.surname_field).should('have.css', 'border-color', emailSendingPageUtils.error_color)
      cy.contains(emailSendingPageUtils.surname_field_error).should('have.css', 'color', emailSendingPageUtils.error_color)
      cy.get(emailSendingPageSelectors.newsletter_type_field + ' > div').should('have.css', 'border-color', emailSendingPageUtils.error_color)
      cy.contains(emailSendingPageUtils.newsletter_type_field_error).should('have.css', 'color', emailSendingPageUtils.error_color)
      cy.get(emailSendingPageSelectors.starting_date_field + ' > div > input').should('have.css', 'border-color', emailSendingPageUtils.error_color)
      cy.contains(emailSendingPageUtils.starting_date_field_error).should('have.css', 'color', emailSendingPageUtils.error_color)
      cy.get(emailSendingPageSelectors.ending_date_field).should('not.have.css', 'border-color', emailSendingPageUtils.error_color)
      cy.contains(emailSendingPageSelectors.agreement_error).should('be.visible').should('have.css', 'color', emailSendingPageUtils.error_color)
    })

    it('tests validation of the email field', () => {
      cy.contains(emailSendingPageUtils.email_field_error).should('not.exist')
      cy.get(emailSendingPageSelectors.email_field).type('thisisnotvalid@')
      cy.contains(emailSendingPageUtils.email_field_error).should('have.css', 'color', emailSendingPageUtils.error_color)
      cy.get(emailSendingPageSelectors.email_field).clear().type('thisis@valid.com')
      cy.contains(emailSendingPageUtils.email_field_error).should('not.exist')
    })

    it('tests the newsletter type field and options copy', () => {
      cy.get(emailSendingPageSelectors.newsletter_type_field).click()
      cy.get(emailSendingPageSelectors.newsletter_option_1).invoke('text').should('eq', emailSendingPageUtils.newsletter_option_1_copy)  
      cy.get(emailSendingPageSelectors.newsletter_option_2).invoke('text').should('eq', emailSendingPageUtils.newsletter_option_2_copy)  
      cy.get(emailSendingPageSelectors.newsletter_option_3).invoke('text').should('eq', emailSendingPageUtils.newsletter_option_3_copy)  
      cy.get(emailSendingPageSelectors.newsletter_option_1).click().then(() => {
        cy.get(emailSendingPageSelectors.newsletter_selected_option).invoke('text').should('eq', emailSendingPageUtils.newsletter_option_1_copy)
      })
      cy.get(emailSendingPageSelectors.newsletter_type_field).click()
      cy.get(emailSendingPageSelectors.newsletter_option_2).click().then(() => {
        cy.get(emailSendingPageSelectors.newsletter_selected_option).invoke('text').should('eq', emailSendingPageUtils.newsletter_option_2_copy)
      })
      cy.get(emailSendingPageSelectors.newsletter_type_field).click()
      cy.get(emailSendingPageSelectors.newsletter_option_3).click().then(() => {
        cy.get(emailSendingPageSelectors.newsletter_selected_option).invoke('text').should('eq', emailSendingPageUtils.newsletter_option_3_copy)
      })
    })
  })