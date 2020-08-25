context('Form Inputs', () => {
    beforeEach( () => {
        cy.visit('http://localhost:3000/order_form')
    });

    it('adding text to inputs and submit form', () => {
        cy.get("[data-cy=name-input]")
            .type('Laughn')
            .should('have.value', 'Laughn')

        const email = 'example@example.com'
        cy.get("[data-cy=email-input]")
            .type(email)
            .should('have.value', email)

        const instructionsText = 'to catch them all'
        cy.get("[data-cy=instructions-input]")
            .type(instructionsText)
            .should('have.value', instructionsText)

        cy.get('[data-cy=size]')
            .select('Medium')
            .should('have.value', 'Medium')

        cy.get('[data-cy=Sausage]')
            .check()
            .should('be.checked')

        cy.get('[data-cy=submit-button]')
            .click()
    });

    // it('', () => {
        
    // });
})