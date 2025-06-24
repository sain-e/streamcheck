describe('UserList Integration Test', () => {
    it('loads users and displays them', () => {
        cy.intercept('POST', 'http://localhost:5000/graphql', (req) => {
            if (req.body.query.includes('users')) {
                req.reply({
                    body: {
                        data: {
                            users: [
                                { _id: "6851a96ede13259821d3e63f", name: "Luis" },
                                { _id: "6851b14d722f853c7b4dc99a", name: "Maria" },
                                { _id: "685307933d10664943725309", name: "Maria" }
                            ],
                        },
                    },
                });
            }
        }).as('getUsers');

        cy.visit('/'); // o la ruta que corresponda
        cy.wait('@getUsers');
        cy.contains('Luis').should('exist');
        cy.contains('Maria').should('exist');
    });
});