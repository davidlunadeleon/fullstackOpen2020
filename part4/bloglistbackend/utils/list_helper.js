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

module.exports = {
	totalLikes,
	dummy,
	favoriteBlog
};
