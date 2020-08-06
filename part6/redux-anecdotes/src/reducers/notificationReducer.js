const notificationReducer = (state = 'A', action) => {
	switch (action.type) {
		case 'SHOW_NOTIFICATION':
			return "You've got mail";
		default:
			break;
	}
	return state;
};

export default notificationReducer;
