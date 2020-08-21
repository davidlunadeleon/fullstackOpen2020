import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { loginUser } from '../reducers/userReducer';
import { setNotification } from '../reducers/notificationReducer';

const Login = () => {
	const dispatch = useDispatch();
	const history = useHistory();

	const loginFunc = (event) => {
		event.preventDefault();
		const values = event.target;
		dispatch(
			loginUser(values.loginUsername.value, values.loginPassword.value)
		);
		dispatch(setNotification('info', 'Logged in'));
		history.push('/');
	};

	return (
		<div>
			<h2>Log in</h2>
			<form className="form" onSubmit={loginFunc} id="login-form">
				<div className="form-input">
					username: <input type="text" id="loginUsername" />
				</div>
				<div className="form-input">
					password: <input type="password" id="loginPassword" />
				</div>
				<button type="submit" id="submitLogin">
					Log in
				</button>
			</form>
		</div>
	);
};

export default Login;
