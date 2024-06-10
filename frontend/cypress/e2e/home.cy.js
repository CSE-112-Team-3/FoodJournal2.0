describe('Home Page Tests', () => {
    const baseUrl = Cypress.config('baseUrl');
    beforeEach(() => {
      cy.visit('/');
    });
  
    describe('Global scenarios', () => {    

        describe('Review details tests', () => {
            it('the current selected page on the navbar should be home', () => {
                cy.get('.selected-page').should('contain', 'HOME');
            });

            it('there should be a recipes page on the navbar', () => {
                cy.get('.nav-bar').should('contain', 'RECIPE');
            });

            describe('Tests with posts', () => {
                beforeEach(() => {
                    cy.get('.post-link').contains('just ate pho!').click();
                    cy.get('.wide-popup').should('exist');
                });

                it('you should be able to scroll to the bottom of the modal', () => {
                    cy.get('.review-detail-container')
                    .scrollTo('bottom')
                    .then($modal => {
                      const scrollHeight = $modal[0].scrollHeight;
                      const clientHeight = $modal[0].clientHeight;
                      const scrollTop = $modal[0].scrollTop;
              
                      expect(scrollTop + clientHeight).to.equal(scrollHeight);
                    });
                });

                it('there should be at least a username, profile picture, food name, rating, review', () => {
                    cy.get('.review-detail-header .username').should('exist');
                    cy.get('.review-detail-header .profile-pic').should('exist');
                    cy.get('.review-detail-container .food-name').should('exist');
                    cy.get('.review-detail-container .star-rating').should('exist');
                    cy.get('.review-detail-container .detail-text').should('exist');
                });

                it('clicking x closes the modal', () => {
                    cy.get('.close').click();
                    cy.get('.wide-popup').should('not.be.visible');
                });
            });

            describe('Tests without posts', () => {
                it('should display a message indicating no posts available', () => {
                    cy.contains('No posts available.').should('exist');
                });
            });
        });
    });

    describe('Authorized user scenarios', () => {    
        it('there should be a create post button on the navbar & routes to /new-review upon click', () => {
            cy.manualSignIn('cypress1', '1');
            cy.get('.create-post-container .circle-btn').should('exist');
            cy.get('.create-post-container .circle-btn').click();
            cy.url().should('contain', '/new-review');
        });

        it('there should be a settings link on the navbar & routes to /settings upon click', () => {
            cy.manualSignIn('cypress1', '1');
            cy.get('.nav-bar').should('contain', 'SETTINGS');
            cy.get('.nav-bar').contains('SETTINGS').click();
            cy.url().should('contain', '/settings');
        });

        it('there should be a profile pic on the navbar & routes to /mypage upon click', () => {
            cy.manualSignIn('cypress1', '1');
            cy.get('.nav-bar .profile-pic').should('exist');
            cy.get('.nav-bar .profile-pic').click();
            cy.url().should('contain', '/mypage');
        });

        it('there should be a button on the navbar that says Log out?', () => {
            cy.manualSignIn('cypress1', '1');
            cy.get('.nav-bar .sign-in').contains('Log out?').should('exist');
        });

        it('there should be no link on the navbar that says Sign in?', () => {
            cy.manualSignIn('cypress1', '1');
            cy.get('.nav-bar .sign-in').contains('Sign in?').should('not.exist');
        });
    });

    describe('Guest user scenarios', () => {
        it('there should not be a create post button on the navbar', () => {
            cy.get('.create-post-container .circle-btn').should('not.exist');
        });

        it('there should not be a settings link on the navbar', () => {
            cy.get('.nav-bar').contains('SETTINGS').should('not.exist');
        });

        it('there should not be a profile pic on the navbar', () => {
            cy.get('.nav-bar .profile-pic').should('not.exist');
        });

        it('there should not be a button on the navbar that says Log out?', () => {
            cy.get('.nav-bar .sign-in').contains('Log out?').should('not.exist');
        });

        it('there should be a link on the navbar that says Sign in?', () => {
            cy.get('.nav-bar .sign-in').contains('Sign in?').should('exist');
        });
    });
  });