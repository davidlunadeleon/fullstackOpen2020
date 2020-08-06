import React from 'react';

import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import Notification from './components/Notification';

import './App.css';

const App = () => {
	return (
		<div>
			<Notification />
			<h2>Anecdotes</h2>
			<AnecdoteList />
			<AnecdoteForm />
		</div>
	);
};

export default App;
