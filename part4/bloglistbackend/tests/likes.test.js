const listHelper = require('../utils/list_helper');

describe('Total likes', () => {
	test('No blogs', () => {
		const blogs = [];
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(0);
	});

	test('One blog', () => {
		const blogs = [
			{
				id: '5f1c94478e0bae23da5ff120',
				title: 'How to create a Node.js application',
				author: 'David Luna',
				url: 'example.com',
				likes: 10
			}
		];
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(blogs[0].likes);
	});

	test('Multiple blogs', () => {
		const blogs = [
			{
				id: '5f1c94478e0bae23da5ff120',
				title: 'How to create a Node.js application',
				author: 'David Luna',
				url: 'example.com',
				likes: 10
			},
			{
				id: '5f1c94478e0bae23da5ff121',
				title: 'How to create a React.js application',
				author: 'David Luna',
				url: 'example.com/tutorial',
				likes: 0
			}
		];
		const result = listHelper.totalLikes(blogs);
		expect(result).toBe(10);
	});
});
