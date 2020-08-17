import React from 'react';
import { useSelector } from 'react-redux';

const Notification = () => {
	const notification = useSelector((state) => state.notification);

	if (notification) {
		return <h2 className={notification.type}>{notification.text}</h2>;
	}
	return <div></div>;
};

export default Notification;
