import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

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
		dispatch(setNotification('success', 'Logged in'));
		history.push('/');
	};

	return (
		<div>
			<h2>Log in</h2>
			<Form onSubmit={loginFunc} id="login-form">
				<Form.Group controlId="formLoginUsername">
					<Form.Label>Username:</Form.Label>
					<Form.Control type="text" name="loginUsername" />
				</Form.Group>
				<Form.Group controlId="formLoginPassword">
					<Form.Label>Password:</Form.Label>
					<Form.Control type="password" name="loginPassword" />
				</Form.Group>
				<Button variant="primary" type="submit" id="submitLogin">
					Log in
				</Button>
			</Form>
		</div>
	);
};

export default Login;
