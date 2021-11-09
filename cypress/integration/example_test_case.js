import { someKindOfPageSelectors } from "../fixtures/test_page_selectors"
import { someKindOfPageUtils } from '../fixtures/test_page_utils'

//store here global variables that could be used between the tests and could be overwritten for time of the test case
var message_id = null

describe('Suite Description here', () => {
    
    beforeEach('Describe what is happening before each test case', () => {
        
        //Write here everyting you need to do before each of the test, ex empty the email inbox 
        
    })

    it('tests if something is happening or not - you decide', () => {
        //Write here test case code - example code below, it would fail of course
        cy.visit('/')
        cy.get(someKindOfPageSelectors.example_selector_descrtiption).should('eq', someKindOfPageUtils.example_element_copy_description)
    })

    afterEach('Describe what is happening after each test case', () => {
        //Write here everyting you need to do before after of the test, but remember that using before hook is the best practice
    })
})