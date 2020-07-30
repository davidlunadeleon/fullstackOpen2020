import React from 'react';

const Login = (props) => {
	return (
		<div>
			<h2>Log in</h2>
			<form className="form" onSubmit={props.handleLogin}>
				<div className="form-input">
					username:{' '}
					<input
						type="text"
						value={props.username}
						onChange={({ target }) =>
							props.setUsername(target.value)
						}
					/>
				</div>
				<div className="form-input">
					password:{' '}
					<input
						type="password"
						value={props.password}
						onChange={({ target }) =>
							props.setPassword(target.value)
						}
					/>
				</div>
				<button type="submit">Log in</button>
			</form>
		</div>
	);
};

export default Login;
