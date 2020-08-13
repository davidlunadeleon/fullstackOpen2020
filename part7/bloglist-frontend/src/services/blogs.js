import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
	token = `bearer ${newToken}`;
};

const getAll = async () => {
	const request = await axios.get(baseUrl);
	return request.data;
};

const postBlog = async (blog) => {
	const config = {
		headers: { Authorization: token }
	};
	const request = await axios.post(baseUrl, blog, config);
	return request.data;
};

const putBlog = async (blog, blogId) => {
	const config = {
		headers: { Authorization: token }
	};
	const request = await axios.put(`${baseUrl}/${blogId}`, blog, config);
	return request.data;
};

const deleteBlog = async (blogId) => {
	const config = {
		headers: { Authorization: token }
	};
	const request = await axios.delete(`${baseUrl}/${blogId}`, config);
	return request.data;
};

export default { getAll, postBlog, setToken, putBlog, deleteBlog };
