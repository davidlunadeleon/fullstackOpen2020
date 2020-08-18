import loginService from '../services/login';
import blogsService from '../services/blogs';

const userReducer = (state = null, action) => {
	switch (action.type) {
		case 'LOGIN':
			return action.data;
		case 'LOGOUT':
			return null;
		default:
			break;
	}
	return state;
};

export const loginUser = (username, password) => {
	return async (dispatch) => {
		const user = await loginService.login({ username, password });
		window.localStorage.setItem('loggedBlogUser', JSON.stringify(user));
		blogsService.setToken(user.token);
		dispatch({
			type: 'LOGIN',
			data: user
		});
	};
};

export const logoutUser = () => {
	return async (dispatch) => {
		window.localStorage.removeItem('loggedBlogUser');
		dispatch({
			type: 'LOGOUT'
		});
	};
};

export const loginPreviousSession = () => {
	return async (dispatch) => {
		const loggedBlogUser = window.localStorage.getItem('loggedBlogUser');
		if (loggedBlogUser) {
			const user = JSON.parse(loggedBlogUser);
			blogsService.setToken(user.token);
			dispatch({
				type: 'LOGIN',
				data: user
			});
		} else {
			dispatch({ type: 'LOGOUT' });
		}
	};
};

export default userReducer;
