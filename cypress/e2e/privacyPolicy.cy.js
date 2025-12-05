describe('Testa a página da política de privacidade de forma independente', () => {
  beforeEach(() => {
   cy.visit ('./src/privacy.html')
  })
  it('Verificar o título da aba de privacidade', () => {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT - Política de Privacidade')
  })

  it('Verificar o conteúdo do h1', () => {
    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
  })

  it('Verificar o conteúdo do último parágrafo', () => {
    cy.contains('p','Talking About Testing').should('be.visible')
  });
});
