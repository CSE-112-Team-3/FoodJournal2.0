describe('Sign Up Page Tests', () => {
  beforeEach(() => {
    cy.visit('/signup');

    cy.intercept('POST', 'https://foodjournal20-production.up.railway.app/api/v1/auth/create_user', (req) => {
      const { username, email, password, first_name, last_name } = req.body;

      if (!first_name) {
        req.reply({
          statusCode: 400,
          body: { detail: 'Please fill out this field.' },
        });
      } else if (!last_name) {
        req.reply({
          statusCode: 400,
          body: { detail: 'Please fill out this field.' },
        });
      } else if (username.length < 5 || !/\d/.test(username)) {
        req.reply({
          statusCode: 400,
          body: { detail: 'Username must be at least 5 characters long and contain at least 1 number.' },
        });
      } else if (username === 'existinguser1') {
        req.reply({
          statusCode: 400,
          body: { detail: 'Username already exists' },
        });
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        req.reply({
          statusCode: 400,
          body: { detail: 'Invalid email address' },
        });
      } else if (email === 'existing@example.com') {
        req.reply({
          statusCode: 400,
          body: { detail: 'Email already exists' },
        });
      } else if (!password) {
        req.reply({
          statusCode: 400,
          body: { detail: 'Password not inputted' },
        });
      } else {
        req.reply({
          statusCode: 200,
          body: { message: 'Congratulations' },
        });
      }
    }).as('signupRequest');
  });

  describe('Success Scenarios', () => {
    it('should display a success popup and route to /signin aftering closing popup', () => {
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#userName').type('newuser1');
      cy.get('#email').type('valid@example.com');
      cy.get('#password').type('password123');
      cy.get('#confirmPassword').type('password123');
      cy.get('.submit').click();
      cy.wait('@signupRequest').then((interception) => {
        if (interception.response.statusCode === 400) {
          cy.log('Response body:', interception.response.body);
        }
        expect(interception.response.statusCode).to.eq(200);
      });
      cy.get('.popup').should('exist');
      cy.get('.popup').get('.close').click();
      cy.url().should('include', '/signin');
    });

    it('should display a success popup and automatically route to /signin after a delay', () => {
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#userName').type('newuser2');
      cy.get('#email').type('valid2@example.com');
      cy.get('#password').type('password123');
      cy.get('#confirmPassword').type('password123');
      cy.get('.submit').click();
      cy.wait('@signupRequest').its('response.statusCode').should('eq', 200);
      cy.get('.popup').should('exist');
      cy.wait(3000);
      cy.url().should('include', '/signin');
    });
  });

  describe('Fail Scenarios',() => {
    it('should display an error if the first name is empty', () => {
      cy.get('#firstName').focus().blur();
      cy.get('#firstName').then($input => {
        expect($input[0].validationMessage).to.eq('Please fill out this field.');
      });
    });

    it('should display an error if the last name is empty', () => {
      cy.get('#lastName').focus().blur();
      cy.get('#lastName').then($input => {
        expect($input[0].validationMessage).to.eq('Please fill out this field.');
      });
    });

    it('should display an error if username is not at least 5 characters long & contains at least 1 number', () => {
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#userName').type('user');
      cy.get('.error-message').should('contain', 'Username must be at least 5 characters long and contain at least 1 number.');
    });

    it('should display an error if username already exists', () => {
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#userName').type('existinguser1');
      cy.get('#email').type('valid@example.com');
      cy.get('#password').type('password123');
      cy.get('#confirmPassword').type('password123');
      cy.get('.submit').click();
      cy.wait('@signupRequest').its('response.statusCode').should('eq', 400);
      cy.get('.error-message').should('contain', 'Username already exists');
    });

    it('should display an error if email is invalid', () => {
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#userName').type('validuser1');
      cy.get('#email').type('invalidemail');
      cy.get('#password').type('password123');
      cy.get('#confirmPassword').type('password123');
      cy.get('.error-message').should('contain', 'Invalid email address');
    });

    it('should display an error if email already exists', () => {
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#userName').type('validuser1');
      cy.get('#email').type('existing@example.com');
      cy.get('#password').type('password123');
      cy.get('#confirmPassword').type('password123');
      cy.get('.submit').click();
      cy.wait('@signupRequest').its('response.statusCode').should('eq', 400);
      cy.get('.error-message').should('contain', 'Email already exists');
    });

    it('should display an error if passwords do not match', () => {
      cy.get('#firstName').type('John');
      cy.get('#lastName').type('Doe');
      cy.get('#userName').type('validuser1');
      cy.get('#email').type('valid@example.com');
      cy.get('#password').type('password123');
      cy.get('#confirmPassword').type('password321');
      cy.get('.submit').click();
      cy.get('.error-message').should('contain', 'Passwords do not match');
    });
  });
});




  
  
  