import React from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-bootstrap';

const Notification = () => {
	const notification = useSelector((state) => state.notification);

	if (notification) {
		return (
			<Alert variant={notification.type} className="notification">
				{notification.text}
			</Alert>
		);
	}
	return <div></div>;
};

export default Notification;
