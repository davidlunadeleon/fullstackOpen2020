import blogsService from '../services/blogs';

const blogsReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_BLOG':
			return state.concat(action.data);
		case 'DELETE_BLOG':
			break;
		case 'INIT_BLOGS':
			break;
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
			data: { newBlog }
		});
	};
};

export default blogsReducer;
