describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit ('./src/index.html')
  })
  it('Verifica o título da aplicação', () => {
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName').type('Rick')
    cy.get('#lastName').type('Jay')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', {delay:0})
    cy.contains('button','Enviar').click() 
    
    cy.get('.success').should('be.visible')  
  })

  it('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Rick')
    cy.get('#lastName').type('Jay')
    cy.get('#email').type('@gmail.com')
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', {delay:0})
    cy.contains('button','Enviar').click() 

    cy.get('.error').should('be.visible')
  })

  it('Campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone')
      .type('Teste@01')
      .should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').type('Rick')
    cy.get('#lastName').type('Jay')
    cy.get('#email').type('teste@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', {delay:0})
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Rick')
      .should('have.value','Rick')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Jay')
      .should('have.value','Jay')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@gmail.com')
      .should('have.value','teste@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#phone')
      .type('1599999999')
      .should('have.value','1599999999')
      .clear()
      .should('have.value', '')
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')
    
  })

  it('Envia o formuário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFiledsAndSubmit () //comando customizado configurado no arquivo /support/commands.js

    cy.get('.success').should('be.visible')
    
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
      .should('have.value','blog')
  })

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]') //aqui eu filtrei melhor, se tivesse colocado somente o input type radio, o cypress nao saberia qual dos input type radio já que tinha 3. 
      .check()
      .should('be.checked')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(typeOfService => { //pra cada tipo de serviço
        cy.wrap(typeOfService) //empacota o elemento
          .check()
          .should('be.checked')
      })
  })

  it('Marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]') // tinha colocado dois comandos pro mesmo input. é melhor encadear os comandos nessa última ação. Outra coisa, o seletor type checkbox é mais genérico porque quero checar todos os checkboxes mas se fosse pra pegar um só, ai faria os elementos separados.
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')    
  })

  it('Seleciona um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/pinguim.jpg')
      .should(input => { //funçao callback
        expect(input [0].files [0].name).to.equal('pinguim.jpg')        
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/pinguim.jpg',{action: 'drag-drop'}) //passei o primeiro argunmento o caminho do anexo e como segundo argumento o drag drop
      .should(input => { //funçao callback
        expect(input [0].files [0].name).to.equal('pinguim.jpg')    
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('pinguim.jpg').as('sampleFile')//quando utilizo o cy fixture, o cypess já sabe que esse arquivo está dentro da pasta fixture, não senod necessário passar o caminho
    cy.get('#file-upload')
      .selectFile('@sampleFile')
      .should(input => { //funçao callback
        expect(input [0].files [0].name).to.equal('pinguim.jpg') 
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('Acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()
    
    cy.contains('h1','CAC TAT - Política de Privacidade').should('be.visible')
  })
});























