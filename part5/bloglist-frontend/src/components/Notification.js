import React from 'react';
import PropTypes from 'prop-types';

const Notification = ({ notification }) => {
	if (notification) {
		return <h2 className={notification.type}>{notification.text}</h2>;
	}
	return <div></div>;
};

Notification.propTypes = {
	notification: PropTypes.object
};

export default Notification;
