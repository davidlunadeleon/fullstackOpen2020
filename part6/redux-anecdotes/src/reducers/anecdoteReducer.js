import anecdotesService from '../services/anecdotesService';

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
			return action.data.sort((a, b) => b.votes - a.votes);
		default:
			break;
	}
	return state;
};

export const addVote = (id) => {
	return async (dispatch) => {
		await anecdotesService.addVote(id);
		dispatch({
			type: 'ADD_VOTE',
			data: { id }
		});
	};
};

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdotesService.createAnecdote(content);
		dispatch({
			type: 'CREATE_ANECDOTE',
			data: newAnecdote
		});
	};
};

export const initialAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdotesService.getAll();
		dispatch({
			type: 'INIT_ANECDOTES',
			data: anecdotes
		});
	};
};

export default anecdoteReducer;
