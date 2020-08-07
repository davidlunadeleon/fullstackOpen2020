const filterReducer = (state = '', action) => {
	switch (action.type) {
		case 'SET_FILTER':
			return action.data.filter;
		default:
			break;
	}
	return state;
};

export const setFilter = (filter) => {
	return {
		type: 'SET_FILTER',
		data: {
			filter
		}
	};
};

export default filterReducer;
