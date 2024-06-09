describe('Sign In Page Tests', () => {
  const baseUrl = Cypress.config('baseUrl');

  beforeEach(() => {
    cy.visit('/signin');
  });

  describe('Fail scenarios', () => {    
    it('sign in should fail if wrong username & display error message', () => {
        cy.get('#username').type('cypress');
        cy.get('#password').type('12345');
        cy.get('.submit1').click();
        cy.get('.error-message').should('exist');
    });

    it('sign in should fail if wrong password & display error message', () => {
        cy.get('#username').type('cypress1');
        cy.get('#password').type('12345');
        cy.get('.submit1').click();
        cy.get('.error-message').should('exist');
    });
  });

  describe('Success scenarios', () => {    
    it('sign in should succeed if right information inputted & route to home', () => {
        cy.get('#username').type('cypress1');
        cy.get('#password').type('1');
        cy.get('.submit1').click();
        cy.url().should('eq', `${baseUrl}/`);
    });

    it('sign up link should route to sign up url', () => {
      cy.get('.sign-up-link').click();
      cy.url().should('include', '/signup');
    });

    it('forgot password link should link to YouTube url', () => {
      // Mock the click event
      cy.get('.forgot').then(($a) => {
        const href = $a.prop('href');
        expect(href).to.include('/b3rNUhDqciM');

        $a.on('click', (e) => {
          e.preventDefault();
        });

        $a.trigger('click');
      });
    });
  });
});
  