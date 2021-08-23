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
      cy.get(emailSendingPageSelectors.newsletter_type_field).should('have.css', 'border-color', emailSendingPageUtils.error_color)
      cy.contains(emailSendingPageUtils.newsletter_type_field_error).should('have.css', 'color', emailSendingPageUtils.error_color)
    })
  })