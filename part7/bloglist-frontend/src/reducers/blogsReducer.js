import blogsService from '../services/blogs';

const blogsReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_BLOG':
			return state.concat(action.data);
		case 'DELETE_BLOG':
			return state
				.filter((b) => b.id !== action.data.id)
				.sort((a, b) => b.likes - a.likes);
		case 'INIT_BLOGS':
			return action.data.sort((a, b) => b.likes - a.likes);
		default:
			break;
	}
	return state;
};

export const addBlog = (blog) => {
	return async (dispatch) => {
		const newBlog = await blogsService.postBlog(blog);
		dispatch({
			type: 'ADD_BLOG',
			data: newBlog
		});
	};
};

export const initialBlogs = () => {
	return async (dispatch) => {
		const blogs = await blogsService.getAll();
		dispatch({
			type: 'INIT_BLOGS',
			data: blogs
		});
	};
};

export const deleteBlog = (id) => {
	return async (dispatch) => {
		await blogsService.deleteBlog(id);
		dispatch({
			type: 'DELETE_BLOG',
			data: { id }
		});
	};
};

export default blogsReducer;
