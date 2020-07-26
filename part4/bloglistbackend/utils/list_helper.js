const _ = require('lodash');

const totalLikes = (blogs) => {
	return blogs.reduce((total, blog) => {
		return total + blog.likes;
	}, 0);
};

const favoriteBlog = (blogs) => {
	const mostLikedBlog = blogs.reduce(
		(mostLiked, blog) => {
			if (blog.likes > mostLiked.likes) {
				mostLiked = blog;
			}
			return mostLiked;
		},
		{ likes: 0 }
	);
	if ('author' in mostLikedBlog) {
		return {
			title: mostLikedBlog.title,
			author: mostLikedBlog.author,
			likes: mostLikedBlog.likes
		};
	} else {
		return {};
	}
};

const dummy = () => {
	return 1;
};

const mostBlogs = (blogs) => {
	const authors = _.groupBy(blogs, 'author');
	const author = {
		blogs: 0
	};
	_.forIn(authors, (value, key) => {
		if (value.length > author.blogs) {
			author['blogs'] = value.length;
			author['author'] = key;
		}
	});
	if ('author' in author) {
		return {
			author: author.author,
			blogs: author.blogs
		};
	} else {
		return {};
	}
};

module.exports = {
	totalLikes,
	dummy,
	favoriteBlog,
	mostBlogs
};
