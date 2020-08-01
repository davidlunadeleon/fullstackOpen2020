import React, { useState } from 'react';

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

export default Login;
