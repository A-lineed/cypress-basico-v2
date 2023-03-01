/// <reference types="Cypress" />

describe('Central de Atendimento ao Cliente TAT', function () {
    const THREE_SECONDS_IN_MS = 3000
    beforeEach(() => {
        cy.visit('./src/index.html')
    })
    it('verifica o título da aplicação', function () {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatórios e envia o formulário', () => {
        const longText = 'Oi, sou Aline e estou digitando um texto longo para realizar o testar o delay, Oi, sou Aline e estou digitando um texto longo para realizar o testar o delay,Oi, sou Aline e estou digitando um texto longo para realizar o testar o delay'
        cy.clock()
        cy.get('#firstName').type('Aline')
        cy.get('#lastName').type('França')
        cy.get('#email').type('aline@gmail.com')
        cy.get('#open-text-area').type(longText, { delay: 0 })
        //cy.get('.button[type="submit"]').click()
        cy.contains('button', 'Enviar').click()
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')

    })

    it('Exibe mensagem de erro ao submeter o formulário com formatação inválida ', () => {
        cy.clock()
        cy.get('#firstName').type('Aline')
        cy.get('#lastName').type('França')
        cy.get('#email').type('alinegmail.com')
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numérico', () => {
        cy.get('#phone')
            .type('Alfanumerico')
            .should('be.empty')

    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
        cy.clock()
        cy.get('#firstName').type('Aline')
        cy.get('#lastName').type('França')
        cy.get('#email').type('alinegmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('Teste')
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
        cy.get('#firstName')
            .type('Aline')
            .should('have.value', 'Aline')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('França')
            .should('have.value', 'França')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('alinegmail.com')
            .should('have.value', 'alinegmail.com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type(85850219)
            .should('have.value', 85850219)
            .clear()
            .should('have.value', '')
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios.', () => {
        cy.clock()
        cy.contains('button', 'Enviar').click()
        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.error').should('not.be.visible')
    })

    it('Envia o formuário com sucesso usando um comando customizado', () => {
        cy.clock()
        cy.fillMandatoryFieldsAndSubmit('Aline', 'França', 'aline@gmail.com', 'Teste')
        cy.get('.success').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')

    })

    it('Seleciona um produto (YouTube) por seu texto', () => {
        cy.get('#product')
            .select('YouTube')
            .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
        cy.get('#product')
            .select('mentoria')
            .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', () => {
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"', () => {
        cy.get('input[type="radio"][value="feedback"')
            .check()
            .should('have.value', 'feedback')
    })
    it('Marca cada tipo de atendimento"', () => {
        cy.get('input[type="radio"]')
            .should('have.length', 3)
            .each(($radio) => {
                cy.wrap($radio).check()
                cy.wrap($radio).should('be.checked')
            })
    })

    it('Marca ambos checkboxex, depois desmarca o último', () => {
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')

    })

    it('Seleciona um arquivo da pasta fixtures', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('seleciona um arquivo simulando um drag-and-drop', () => {
        cy.get('input[type="file"]')
            .should('not.have.value')
            .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(($input) => {
                expect($input[0].files[0].name).to.equal('example.json')
            })
    })

    it('Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
        cy.get('#privacy a')
            .invoke('removeAttr', 'target')
            .click()
        cy.contains('Talking About Testing').should('be.visible')
    })

    it.only('exibe e esconde as mensagens de sucesso e erro usando o .invoke', () => {
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Valide os campos obrigatórios!')
            .invoke('hide')
            .should('not.be.visible')
    })

})