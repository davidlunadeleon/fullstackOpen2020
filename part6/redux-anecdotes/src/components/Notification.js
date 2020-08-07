import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
	const notification = useSelector((state) => state.notifications);

	const style = {
		border: 'solid',
		padding: 10,
		borderWidth: 1
	};

	const showNotification = () => {
		if (notification === '') {
			return <div></div>;
		} else {
			return <div style={style}>{notification}</div>;
		}
	};

	return showNotification();
};

export default Notification;
