import { baseApiUrl, apiKey, mainEmail} from '../../cypress.json'
import { emailSendingPageSelectors } from "../fixtures/email_sending_page_selectors"
import { ConvertDates, month_later_date_iso, today_date_locale, end_of_subscription_date } from "../fixtures/dates_serializer";

var message_id = null

describe('Landing tests', () => {
    
    beforeEach('Delete all the messages in the inbox', () => {
        
        //commented request would work only if the Mailsac pricing will be non-free, 
        //there are no private emails at free plan :(
        //you can't delete messages from public inbox
        //I am leaving this commented as a example what should be done in beforeEach hook
        //Instead of that I decided to use the afterEach hook to delete 
        //the particular message and put checking in beforeEach if the inbox is empty
        //and the empty inbox is the entry condition 
        //I know that cleaning the state should be perfmormed in the before hook, but here I can't :(
        //cy.request({
            //method: 'DELETE',
            //url: baseApiUrl + 'addresses/' + mainEmail + '/messages/',
            //headers: {
                //'Mailsac-Key': apiKey
            //}})
        cy.request({
            method: 'GET',
            url: baseApiUrl + 'addresses/' + mainEmail + '/messages/',
            headers: {
                'Mailsac-Key': apiKey
            }}).its('body').should('be.empty')
            //check if the inbox is empty
    })

    it('Checks if the First Name and Surname are proper in the received email', () => {
        //fill the form 
        var today_cell_selector = emailSendingPageSelectors.starting_date_day_cell_1 + ConvertDates('today').locale_us + emailSendingPageSelectors.starting_date_day_cell_2
        cy.visit('/')
        cy.get(emailSendingPageSelectors.email_field).type(mainEmail)
        cy.get(emailSendingPageSelectors.first_name_field).type('Commander')
        cy.get(emailSendingPageSelectors.surname_field).type('Shepard')
        cy.get(emailSendingPageSelectors.newsletter_type_field + ' > div').click()
        cy.get(emailSendingPageSelectors.newsletter_option_1).click()
        cy.get(emailSendingPageSelectors.starting_date_field).click()
        cy.get(today_cell_selector).click()
        cy.get(emailSendingPageSelectors.agreement_checkmark).click()
        cy.get(emailSendingPageSelectors.submit_button).click()
        cy.contains('Successfully added to newsletter').should('be.visible')
        cy.contains('OK').click()
        cy.contains('Successfully added to newsletter').should('not.exist')
        //email should be sent
        .then(() => {
            //get the inbox
            cy.wait(4000) //wait just in case
            cy.request({
                method: 'GET',
                url: baseApiUrl + 'addresses/' + mainEmail + '/messages/',
                headers: {
                    'Mailsac-Key': apiKey
                }}).then(($response) => {
                        //store the id of the newest mail
                        cy.wrap($response.body).should('not.be.empty')
                        message_id = $response.body[0]._id;
                        //and get the text of the this message
                        cy.request({
                        method: 'GET',
                        url: baseApiUrl + 'text/'+ mainEmail + '/' + message_id,
                        headers: {
                         'Mailsac-Key': apiKey
                        }})
                            .then(($response) => {
                            //check if there is a proper name and surname in the email message
                            cy.wrap($response.body).should('include', 'Commander Shepard')
                        })
                 
          })
        })
    })

    it('Checks if the Newsletter Type is proper in the received email', () => {
        //fill the form
        var today_cell_selector = emailSendingPageSelectors.starting_date_day_cell_1 + ConvertDates('today').locale_us + emailSendingPageSelectors.starting_date_day_cell_2
        cy.visit('/')
        cy.get(emailSendingPageSelectors.email_field).type(mainEmail)
        cy.get(emailSendingPageSelectors.first_name_field).type('Commander')
        cy.get(emailSendingPageSelectors.surname_field).type('Shepard')
        cy.get(emailSendingPageSelectors.newsletter_type_field + ' > div').click()
        cy.get(emailSendingPageSelectors.newsletter_option_3).click()
        cy.get(emailSendingPageSelectors.starting_date_field).click()
        cy.get(today_cell_selector).click()
        cy.get(emailSendingPageSelectors.agreement_checkmark).click()
        cy.get(emailSendingPageSelectors.submit_button).click()
        cy.contains('Successfully added to newsletter').should('be.visible')
        cy.contains('OK').click()
        cy.contains('Successfully added to newsletter').should('not.exist')
        //email should be sent
        .then(() => {
            //get the inbox
            cy.wait(4000) //wait just in case
            cy.request({
                method: 'GET',
                url: baseApiUrl + 'addresses/' + mainEmail + '/messages/',
                headers: {
                    'Mailsac-Key': apiKey
                }}).then(($response) => {
                        //store the id of the newest mail
                        cy.wrap($response.body).should('not.be.empty')
                        message_id = $response.body[0]._id;
                        //and get the text of the this message
                        cy.request({
                        method: 'GET',
                        url: baseApiUrl + 'text/'+ mainEmail + '/' + message_id,
                        headers: {
                         'Mailsac-Key': apiKey
                        }})
                            .then(($response) => {
                            //check if there is a proper newsletter type in the email message
                            cy.wrap($response.body).should('include', 'medical')
                            //check if there are no ending date in the email message
                            cy.wrap($response.body).should('include', 'Your subscription will be activated until you cancel it!')
                        })
                 
          })
        })
    })

    it('Checks if the dates are proper in the received email', () => {
        //fill the form
        var today_cell_selector = emailSendingPageSelectors.starting_date_day_cell_1 + ConvertDates('today').locale_us + emailSendingPageSelectors.starting_date_day_cell_2
        cy.visit('/')
        cy.get(emailSendingPageSelectors.email_field).type(mainEmail)
        cy.get(emailSendingPageSelectors.first_name_field).type('Commander')
        cy.get(emailSendingPageSelectors.surname_field).type('Shepard')
        cy.get(emailSendingPageSelectors.newsletter_type_field + ' > div').click()
        cy.get(emailSendingPageSelectors.newsletter_option_3).click()
        cy.get(emailSendingPageSelectors.starting_date_field).click()
        cy.get(today_cell_selector).click()
        cy.get(emailSendingPageSelectors.ending_date_field).type(ConvertDates('month_later').ISO)
        cy.get(emailSendingPageSelectors.agreement_checkmark).click()
        cy.get(emailSendingPageSelectors.submit_button).click()
        cy.contains('Successfully added to newsletter').should('be.visible')
        cy.contains('OK').click()
        cy.contains('Successfully added to newsletter').should('not.exist')
        //email should be sent
        .then(() => {
            //get the inbox
            cy.wait(4000) //wait just in case
            cy.request({
                method: 'GET',
                url: baseApiUrl + 'addresses/' + mainEmail + '/messages/',
                headers: {
                    'Mailsac-Key': apiKey
                }}).then(($response) => {
                        //store the id of the newest mail
                        cy.wrap($response.body).should('not.be.empty')
                        message_id = $response.body[0]._id;
                        //and get the text of the this message
                        cy.request({
                        method: 'GET',
                        url: baseApiUrl + 'text/'+ mainEmail + '/' + message_id,
                        headers: {
                         'Mailsac-Key': apiKey
                        }})
                            .then(($response) => {
                            //check if there are a proper dates within the email message
                            cy.wrap($response.body)
                            .should('include', 'You will get your first newsletter beginning ' + ConvertDates('today').locale)
                            .should('include', 'Your subscription will be activated until ' + ConvertDates('subscription_end').locale)
                            
                        })
                 
          })
        })
    })

    afterEach('delete', () => {
        cy.request({
            method: 'DELETE',
            url: baseApiUrl + 'addresses/'+ mainEmail + '/messages/' + message_id,
            headers: {
             'Mailsac-Key': apiKey
            }})
    })
})