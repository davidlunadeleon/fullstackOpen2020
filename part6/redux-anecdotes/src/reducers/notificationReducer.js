const notificationReducer = (state = '', action) => {
	switch (action.type) {
		case 'SHOW_NOTIFICATION':
			return action.data.message;
		case 'CLEAR_NOTIFICATION':
			return '';
		default:
			break;
	}
	return state;
};

export const setNotification = (message, time) => {
	return async (dispatch) => {
		dispatch({
			type: 'SHOW_NOTIFICATION',
			data: { message }
		});
		setTimeout(() => {
			dispatch({
				type: 'CLEAR_NOTIFICATION'
			});
		}, Number(time) * 1000);
	};
};

export default notificationReducer;
