import { emailSendingPageSelectors } from "../fixtures/email_sending_page_selectors"
import { emailSendingPageUtils } from "../fixtures/email_sending_page_utils"
import { today_date_locale_us, yesterday_date_locale_us } from "../fixtures/dates_serializer";


describe('Fields tests', () => {
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

    it('tests validation of the Email field', () => {
      cy.contains(emailSendingPageUtils.email_field_error).should('not.exist')
      cy.get(emailSendingPageSelectors.email_field).type('thisisnotvalid@')
      cy.contains(emailSendingPageUtils.email_field_error).should('have.css', 'color', emailSendingPageUtils.error_color)
      cy.get(emailSendingPageSelectors.email_field).clear().type('thisis@valid.com')
      cy.contains(emailSendingPageUtils.email_field_error).should('not.exist')
    })

    it('tests the Newsletter type field and options copy', () => {
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

    it('tests the Starting Date field and calendar', () => {
      var today_cell_selector = emailSendingPageSelectors.starting_date_day_cell_1 + today_date_locale_us + emailSendingPageSelectors.starting_date_day_cell_2
      var yesterday_cell_selector = emailSendingPageSelectors.starting_date_day_cell_1 + yesterday_date_locale_us + emailSendingPageSelectors.starting_date_day_cell_2
      cy.get(emailSendingPageSelectors.starting_date_field).click()
      cy.get(today_cell_selector).should('have.attr','aria-disabled','false')
      cy.get(yesterday_cell_selector).should('have.attr','aria-disabled','true')
      cy.get(emailSendingPageSelectors.calendar_input).type('1999-01-01')
      cy.get(emailSendingPageSelectors.header).click()
      cy.get(emailSendingPageSelectors.starting_date_field).invoke('text').should('eq', '')
    })

    it('tests the Ending Date field and calendar', () => {
      var today_cell_selector = emailSendingPageSelectors.starting_date_day_cell_1 + today_date_locale_us + emailSendingPageSelectors.starting_date_day_cell_2
      var yesterday_cell_selector = emailSendingPageSelectors.starting_date_day_cell_1 + yesterday_date_locale_us + emailSendingPageSelectors.starting_date_day_cell_2
      cy.get(emailSendingPageSelectors.ending_date_field).click()
      cy.get(today_cell_selector).should('have.attr','aria-disabled','false')
      cy.get(yesterday_cell_selector).should('have.attr','aria-disabled','true')
      cy.get(emailSendingPageSelectors.calendar_input).type('1999-01-01')
      cy.get(emailSendingPageSelectors.header).click()
      cy.get(emailSendingPageSelectors.ending_date_field).invoke('text').should('eq', '')
    })

    it('tests if the radio buttons and checkbox work properly', () => {
      cy.get(emailSendingPageSelectors.sex_button_male).click().should('be.checked')
      cy.get(emailSendingPageSelectors.sex_button_female).should('not.be.checked')
      cy.get(emailSendingPageSelectors.sex_button_female).click().should('be.checked')
      cy.get(emailSendingPageSelectors.sex_button_male).should('not.be.checked')
      cy.get(emailSendingPageSelectors.agreement_checkmark).click().should('be.checked').click().should('not.be.checked')
    })
  })