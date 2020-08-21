let notificationID = null;

const notificationReducer = (state = null, action) => {
	switch (action.type) {
		case 'SET_NOTIFICATION':
			return {
				text: action.data.text,
				type: action.data.type
			};
		case 'CLEAR_NOTIFICATION':
			return null;
		default:
			break;
	}
	return state;
};

export const setNotification = (type, text) => {
	return async (dispatch) => {
		dispatch({
			type: 'SET_NOTIFICATION',
			data: {
				text,
				type
			}
		});
		if (notificationID) {
			clearTimeout(notificationID);
			notificationID = null;
		}
		notificationID = setTimeout(() => {
			dispatch({ type: 'CLEAR_NOTIFICATION' });
		}, 5000);
	};
};

export default notificationReducer;
