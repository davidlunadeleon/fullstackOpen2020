import blogsService from '../services/blogs';

import { addBlogToUser, removeBlogFromUser } from './userListReducer';

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
		case 'LIKE_BLOG':
			return state
				.map((b) =>
					b.id === action.data.id ? { ...b, likes: b.likes + 1 } : b
				)
				.sort((a, b) => b.likes - a.likes);
		case 'ADD_COMMENT':
			return state.map((b) =>
				b.id === action.data.id ? action.data.newBlog : b
			);
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
		dispatch(addBlogToUser(newBlog));
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
		dispatch(removeBlogFromUser(id));
	};
};

export const likeBlog = (id) => {
	return async (dispatch) => {
		dispatch({
			type: 'LIKE_BLOG',
			data: { id }
		});
		const blog = await blogsService.getBlog(id);
		await blogsService.putBlog(
			{
				...blog,
				likes: blog.likes + 1,
				user: blog.user.id
			},
			blog.id
		);
	};
};

export const commentBlog = (id, comment) => {
	return async (dispatch) => {
		const newBlog = await blogsService.commentBlog(id, { comment });
		dispatch({
			type: 'ADD_COMMENT',
			data: { id, newBlog }
		});
	};
};

export default blogsReducer;
