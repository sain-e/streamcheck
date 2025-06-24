describe('API tests for /graphql', () => {
    it('check status request on graphql endpoint', () => {
        cy.request('http://localhost:5000/graphql')
        .its('status')
        .should('eq', 200);
    });
});