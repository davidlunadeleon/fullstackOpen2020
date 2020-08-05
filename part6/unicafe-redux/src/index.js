import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducer from './reducer';

const store = createStore(reducer);

const App = () => {
	const good = () => {
		store.dispatch({
			type: 'GOOD'
		});
	};

	const neutral = () => {
		store.dispatch({
			type: 'OK'
		});
	};

	const bad = () => {
		store.dispatch({
			type: 'BAD'
		});
	};

	const zero = () => {
		store.dispatch({
			type: 'ZERO'
		});
	};

	return (
		<div>
			<button onClick={good}>good</button>
			<button onClick={neutral}>neutral</button>
			<button onClick={bad}>bad</button>
			<button onClick={zero}>reset stats</button>
			<ul>
				<li>good {store.getState().good}</li>
				<li>neutral {store.getState().ok}</li>
				<li>bad {store.getState().bad}</li>
			</ul>
		</div>
	);
};

const renderApp = () => {
	ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();
store.subscribe(renderApp);
