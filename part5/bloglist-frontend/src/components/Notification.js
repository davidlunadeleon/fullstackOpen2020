import React from 'react';

const Notification = ({ notification }) => {
	if (notification) {
		return <h2 className={notification.type}>{notification.text}</h2>;
	}
	return <div></div>;
};

export default Notification;
