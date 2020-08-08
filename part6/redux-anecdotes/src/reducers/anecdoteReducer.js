const anecdoteReducer = (state = [], action) => {
	switch (action.type) {
		case 'ADD_VOTE':
			const id = action.data.id;
			const anecdoteToModify = state.find((a) => a.id === id);
			const changedAnecdote = {
				...anecdoteToModify,
				votes: anecdoteToModify.votes + 1
			};
			return state
				.map((a) => (a.id === id ? changedAnecdote : a))
				.sort((a, b) => b.votes - a.votes);
		case 'CREATE_ANECDOTE':
			return state.concat(action.data);
		case 'INIT_ANECDOTES':
			return action.data;
		default:
			break;
	}
	return state;
};

export const addVote = (id) => {
	return {
		type: 'ADD_VOTE',
		data: {
			id
		}
	};
};

export const createAnecdote = (data) => {
	return {
		type: 'CREATE_ANECDOTE',
		data
	};
};

export const initialAnecdotes = (anecdotes) => {
	return {
		type: 'INIT_ANECDOTES',
		data: anecdotes
	};
};

export default anecdoteReducer;
