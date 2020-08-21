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

export const updateUser = (id) => {
	return async (dispatch) => {
		const user = await usersService.getUser(id);
		dispatch({
			type: 'UPDATE_USER',
			data: { user, id }
		});
	};
};

export default userListReducer;
