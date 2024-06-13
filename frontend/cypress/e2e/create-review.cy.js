describe('Create Review Page Tests', () => {
    beforeEach(() => {
        cy.manualSignIn('cypress1', '1');
        cy.visit('/new-review');

        cy.intercept('POST', 'https://foodjournal20-production.up.railway.app/api/v1/post_review/create_post_review*', (req) => {
            req.reply({
            statusCode: 200,
            body: { message: 'Review created successfully' },
            });
        }).as('createReviewRequest');
    });
  
    it('should display an error if meal name is empty', () => {
        cy.get('#mealName').focus().blur();
        cy.get('#mealName').then($input => {
            expect($input[0].validationMessage).to.eq('Please fill out this field.');
        });
    });
  
    it('should display an error if rating is not selected', () => {
        cy.get('#mealName').type('Pizza');
        cy.get('#comments').type('Delicious!');
        cy.get('.submit').click();
        cy.get('.rating').should('contain', 'Please select a rating.');
    });
  
    it('should submit the form with all required fields filled', () => {
        cy.wait(100);
        cy.get('#mealName').type('Pizza');
        cy.get('#restaurant').type('Pizza Place');
        cy.get('#meal-pic').attachFile('pizza.jpeg');
        cy.get('.star-rating label').last().click();
        cy.get('#comments').type('Delicious!');
        cy.get('#tag').type('Italian');
        cy.get('.submit').click();
        cy.wait('@createReviewRequest').its('response.statusCode').should('eq', 200);
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  
    it('should cancel and navigate to the home page', () => {
        cy.get('.cancel').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/`);
    });
  
    it.only('should handle camera mode and take a photo', () => {
        cy.wait(100);
        cy.get('select').focus().select('camera');
        cy.get('select').should('have.value', 'camera');
        cy.get('.camera-preview video').should('exist');
        cy.get('.left-inputs').contains('Take Photo').click();
        cy.get('.camera-preview img').should('exist');
    });
  });
  