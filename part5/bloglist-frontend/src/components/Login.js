import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ handleLogin }) => {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');

	const loginFunc = (event) => {
		event.preventDefault();
		handleLogin(username, password);
		setUsername('');
		setPassword('');
	};

	return (
		<div>
			<h2>Log in</h2>
			<form className="form" onSubmit={loginFunc}>
				<div className="form-input">
					username:{' '}
					<input
						type="text"
						value={username}
						onChange={({ target }) => setUsername(target.value)}
					/>
				</div>
				<div className="form-input">
					password:{' '}
					<input
						type="password"
						value={password}
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<button type="submit">Log in</button>
			</form>
		</div>
	);
};

Login.propTypes = {
	handleLogin: PropTypes.func.isRequired
};

export default Login;
