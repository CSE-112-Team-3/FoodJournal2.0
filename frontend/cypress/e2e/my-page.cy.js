describe('MyPage', () => {
    beforeEach(() => {
      cy.setCookie('accessToken', 'validAccessToken');
      cy.intercept('GET', '**/api/v1/auth/get_user**', {
        statusCode: 200,
        body: {
          id: 1,
          username: 'testuser',
          userId: 1,
          profile_picture: 'path/to/profile_pic.jpg',
        },
      }).as('getUser');
    });
  
    it('redirects to login if not authenticated', () => {
      cy.clearCookies();
      cy.visit('/mypage');
      cy.url().should('include', '/error-403');
    });
  
    it('displays user information if authenticated', () => {
      cy.visit('/mypage');
      cy.wait('@getUser');
      cy.get('#username').should('contain', "testuser's Posts");
    });
  
    it('shows the create post button for the current user', () => {
      cy.visit('/mypage');
      cy.wait('@getUser');
      cy.get('.create-button').should('be.visible').and('contain', 'Create Post');
      cy.get('.create-button').click();
      cy.url().should('include', '/new-review');
    });
  
    context('with posts', () => {
      beforeEach(() => {
        cy.intercept('GET', '**/api/v1/post_review/get_posts_by_id**', {
          statusCode: 200,
          body: [
            {
              id: 1,
              post_id: 1,
              username: 'testuser',
              profile_pic: 'path/to/profile_pic.jpg',
              food_name: 'Pizza',
              rating: 4,
              review: 'Great pizza!',
              image: 'path/to/pizza.jpg',
              tags: 'Italian',
            },
          ],
        }).as('getPosts');
        cy.visit('/mypage');
        cy.wait('@getUser');
        cy.wait('@getPosts');
      });
  
      it('loads posts correctly', () => {
        cy.get('.post-link').should('have.length', 1);
        cy.get('.post-link').first().contains('Pizza');
      });
  
      it('opens and closes post detail popup correctly', () => {
        cy.get('.post-link').first().click();
        cy.get('.overlay').should('be.visible');
        cy.get('.close').click();
        cy.get('.overlay').should('not.be.visible');
      });
    });
  });
  
  

