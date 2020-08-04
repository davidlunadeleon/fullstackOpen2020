const baseUrlBack = 'http://localhost:3001';
const baseUrlFront = 'http://localhost:3000';

describe('Blog app', () => {
	beforeEach(() => {
		cy.request('POST', `${baseUrlBack}/api/testing/reset`);
		let user = {
			name: 'Root User',
			username: 'root',
			password: '12345'
		};
		cy.request('POST', `${baseUrlBack}/api/users`, user);
		user = {
			name: 'Not root',
			username: 'notRoot',
			password: '54321'
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

	describe('When logged in', () => {
		beforeEach(() => {
			cy.login({ username: 'root', password: '12345' });
		});

		it('A blog can be created', () => {
			cy.contains('Create new blog').click();
			cy.get('#inputTitle').type('This is a new blog');
			cy.get('#inputAuthor').type('Cypress');
			cy.get('#inputUrl').type('http://www.cypres.io');
			cy.get('#createBlogButton').click();
			cy.contains('This is a new blog by Cypress');
			cy.get('.info').should('have.css', 'color', 'rgb(0, 128, 0)');
			cy.contains('Blog created.');
		});

		describe('Modifying blogs', () => {
			beforeEach(() => {
				cy.createBlog({
					title: 'This is a new blog',
					url: 'http://www.cypress.io',
					author: 'Cypress'
				});
			});

			it('A user can like a blog', () => {
				cy.contains('View').click();
				cy.contains('Likes').contains('Like').click();
				cy.contains('Likes: 1');
			});

			it('A user can delete a blog', () => {
				cy.contains('View').click();
				cy.get('.remove-blog-button').click();
				cy.get('.blog-element').should('not.exist');
				cy.get('.info').should('have.css', 'color', 'rgb(0, 128, 0)');
				cy.contains('Blog deleted');
			});

			it('A user cannot delete a blog if it dit not create it', () => {
				cy.login({ username: 'notRoot', password: '54321' });
				cy.contains('View').click();
				cy.get('.remove-blog-button').should('not.exist');
			});
		});
	});
});
