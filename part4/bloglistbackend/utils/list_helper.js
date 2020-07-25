const totalLikes = (blogs) => {
	return blogs.reduce((total, blog) => {
		return total + blog.likes;
	}, 0);
};

const dummy = () => {
	return 1;
};

module.exports = {
	totalLikes,
	dummy
};
