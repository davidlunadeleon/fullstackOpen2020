import usersService from '../services/users';

const userListReducer = (state = [], action) => {
	switch (action.type) {
		case 'INIT_USERLIST':
			return action.data.userList;
		case 'UPDATE_USER':
			return state.map((u) =>
				u.id !== action.data.id ? u : action.data.user
			);
		default:
			break;
	}
	return state;
};

export const initUserList = () => {
	return async (dispatch) => {
		const userList = await usersService.getAll();
		dispatch({
			type: 'INIT_USERLIST',
			data: { userList }
		});
	};
};

export const addBlogToUser = (newBlog) => {
	return async (dispatch, getState) => {
		const state = getState();
		if (state.user) {
			const savedUser = state.userList.find(
				(u) => u.id === state.user.id
			);
			const user = {
				...savedUser,
				blogs: [
					...savedUser.blogs,
					{
						title: newBlog.title,
						author: newBlog.author,
						url: newBlog.url,
						id: newBlog.id
					}
				]
			};
			dispatch({
				type: 'UPDATE_USER',
				data: { user, id: user.id }
			});
		}
	};
};

export const removeBlogFromUser = (blogId) => {
	return async (dispatch, getState) => {
		const state = getState();
		if (state.user) {
			const savedUser = state.userList.find(
				(u) => u.id === state.user.id
			);
			savedUser.blogs = savedUser.blogs.filter((b) => b.id !== blogId);
			dispatch({
				type: 'UPDATE_USER',
				data: { user: savedUser, id: savedUser.id }
			});
		}
	};
};

export default userListReducer;
