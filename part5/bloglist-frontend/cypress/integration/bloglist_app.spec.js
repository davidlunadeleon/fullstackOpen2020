const baseUrlBack = 'http://localhost:3001';
const baseUrlFront = 'http://localhost:3000';

describe('Blog app', () => {
	beforeEach(() => {
		cy.request('POST', `${baseUrlBack}/api/testing/reset`);
		cy.visit(baseUrlFront);
	});

	it('Login form is shown', () => {
		cy.contains('Log in');
		cy.get('#login-form').should('exist');
	});
});
