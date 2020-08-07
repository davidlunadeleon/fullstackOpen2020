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

export const clearNotification = () => {
	return {
		type: 'CLEAR_NOTIFICATION'
	};
};

export const showNotification = (message) => {
	return {
		type: 'SHOW_NOTIFICATION',
		data: {
			message
		}
	};
};

export default notificationReducer;
