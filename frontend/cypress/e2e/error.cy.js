describe('Error Page Routing Tests', () => {
    describe('Guest User Scenarios', () => {
        it('should be routed to 403 page if trying to access /mypage', () => {
            cy.visit('/mypage');
            cy.get('.error-page-message').should('contain', '403');
        });
        it('should be routed to 403 page if trying to access /userpage', () => {
            cy.visit('/userpage');
            cy.get('.error-page-message').should('contain', '403');
        });
        it('should be routed to 403 page if trying to access /new-review', () => {
            cy.visit('/new-review');
            cy.get('.error-page-message').should('contain', '403');
        });
        it('should be routed to 403 page if trying to access /settings', () => {
            cy.visit('/settings');
            cy.get('.error-page-message').should('contain', '403');
        });
        it('should be routed to 404 page if trying to access /thisdoesntexist', () => {
            cy.visit('/thisdoesntexist');
            cy.get('.error-page-message').should('contain', '404');
        });
    });
    describe('Authorized User Scenarios', () => {
        // beforeEach(() => {
        //     cy.manualSignIn('cypress1', '1');
        //   });
        it.only('should access /mypage without being routed to 403', () => {
            cy.manualSignIn('cypress1', '1');
            cy.visit('/mypage');
            // cy.get('.post-container').should('exist');
        });
    });
});