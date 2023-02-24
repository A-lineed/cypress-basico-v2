
Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (name, lastName, email, textarea) => {
    cy.get('#firstName').type(name)
        cy.get('#lastName').type(lastName)
        cy.get('#email').type(email)
        cy.get('#open-text-area').type(textarea)
        cy.get('.button[type="submit"]').click()
})
