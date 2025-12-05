Cypress.Commands.add('fillMandatoryFiledsAndSubmit', (data = {
    firstName: 'Rick',
    lastName: 'Jay',
    email: 'teste@gmail.com',
    text: 'Teste.'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text, {delay:0})
    cy.contains('button','Enviar').click()
})