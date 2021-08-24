import { baseApiUrl, apiKey, mainEmail} from '../../cypress.json'
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
  
    it('gets the inbox', () => {
        cy.request({
            method: 'GET',
            url: baseApiUrl + 'addresses/' + mainEmail + '/messages/',
            headers: {
                'Mailsac-Key': apiKey
            }})
        })   
})