import { baseApiUrl, apiKey, mainEmail} from '../../cypress.json'
import { emailSendingPageSelectors } from "../fixtures/email_sending_page_selectors"
import { today_date } from "../fixtures/date_serializer";

var message_id = null

describe('Landing tests', () => {
    //beforeEach('Delete all the messages in the inbox', () => {
        
        //it would work only if the Mailsac pricing will be non-free, there are no private emails at free plan
        //and you can't delete messages from public inbox, leaving this commented as a example what
        //should be done in beforeEach hook
        
        //cy.request({
            //method: 'DELETE',
            //url: baseApiUrl + 'addresses/' + mainEmail + '/messages/',
            //headers: {
                //'Mailsac-Key': apiKey
            //}})
    //})
  
    it.skip('gets the inbox', () => {
        cy.request({
            method: 'GET',
            url: baseApiUrl + 'addresses/' + mainEmail + '/messages/',
            headers: {
                'Mailsac-Key': apiKey
            }})
        })   

    it('Checks if the First Name and Surname are proper', () => {
        var today_cell_selector = emailSendingPageSelectors.starting_date_day_cell_1 + today_date + emailSendingPageSelectors.starting_date_day_cell_2
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
        .then(() => {
            cy.request({
                method: 'GET',
                url: baseApiUrl + 'addresses/' + mainEmail + '/messages/',
                headers: {
                    'Mailsac-Key': apiKey
                }})
                    .then(($response) => {
                        message_id = $response.body[0]._id;
                        cy.wrap(message_id).as('mes_id')
                        cy.request({
                        method: 'GET',
                        url: baseApiUrl + 'text/'+ mainEmail + '/' + message_id,
                        headers: {
                         'Mailsac-Key': apiKey
                }})
          })
        })
    })
})