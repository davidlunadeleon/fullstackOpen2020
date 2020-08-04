const baseUrlBack = 'http://localhost:3001';
const baseUrlFront = 'http://localhost:3000';

describe('Blog app', () => {
	beforeEach(() => {
		cy.request('POST', `${baseUrlBack}/api/testing/reset`);
		const user = {
			name: 'Root User',
			username: 'root',
			password: '12345'
		};
		cy.request('POST', `${baseUrlBack}/api/users`, user);
		cy.visit(baseUrlFront);
	});

	it('Login form is shown', () => {
		cy.contains('Log in');
		cy.get('#login-form').should('exist');
	});

	describe('Login', () => {
		it('Succeeds with correct credentials', () => {
			cy.get('#loginUsername').type('root');
			cy.get('#loginPassword').type('12345');
			cy.get('#submitLogin').click();
			cy.contains('Log in successful');
			cy.get('.info').should('have.css', 'color', 'rgb(0, 128, 0)');
		});

		it('Fails with wrong credentials', () => {
			cy.get('#loginUsername').type('root');
			cy.get('#loginPassword').type('12344');
			cy.get('#submitLogin').click();
			cy.contains('Invalid credentials');
			cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
		});
	});
});
