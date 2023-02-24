/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Oi, sou Aline e estou digitando um texto longo para realizar o testar o delay, Oi, sou Aline e estou digitando um texto longo para realizar o testar o delay,Oi, sou Aline e estou digitando um texto longo para realizar o testar o delay'
        cy.get('#firstName').type('Aline')
        cy.get('#lastName').type('França')
        cy.get('#email').type('aline@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        cy.get('.button[type="submit"]').click()
        cy.get('.success').should('be.visible')

    })
})