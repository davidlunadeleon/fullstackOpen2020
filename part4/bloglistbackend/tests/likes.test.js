const listHelper = require('../utils/list_helper');

const noBlogs = [];
const oneBlog = [
	{
		id: '5f1c94478e0bae23da5ff120',
		title: 'How to create a Node.js application',
		author: 'David Luna',
		url: 'example.com',
		likes: 10
	}
];
const multipleBlogs = [
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
	},
	{
		id: '5f1c94478e0bae23da5fd121',
		title: 'How to create a Vue.js application',
		author: 'David Luna',
		url: 'example.com/tutorial/vue',
		likes: 30
	}
];

describe('Total likes', () => {
	test('No blogs', () => {
		const result = listHelper.totalLikes(noBlogs);
		expect(result).toBe(0);
	});

	test('One blog', () => {
		const result = listHelper.totalLikes(oneBlog);
		expect(result).toBe(oneBlog[0].likes);
	});

	test('Multiple blogs', () => {
		const result = listHelper.totalLikes(multipleBlogs);
		expect(result).toBe(40);
	});
});

describe('Favorite Blog', () => {
	test('No blogs', () => {
		const result = listHelper.favoriteBlog(noBlogs);
		expect(result).toEqual({});
	});

	test('One blog', () => {
		const result = listHelper.favoriteBlog(oneBlog);
		expect(result).toEqual({
			title: oneBlog[0].title,
			author: oneBlog[0].author,
			likes: oneBlog[0].likes
		});
	});

	test('Multiple blogs', () => {
		const result = listHelper.favoriteBlog(multipleBlogs);
		expect(result).toEqual({
			title: multipleBlogs[2].title,
			author: multipleBlogs[2].author,
			likes: multipleBlogs[2].likes
		});
	});
});
