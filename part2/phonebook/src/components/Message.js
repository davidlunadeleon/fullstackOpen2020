import React from 'react';

const Message = ({ type, text }) => {
	if (text === null) {
		return null;
	}
	const classes = type === 'success' ? 'success' : 'error';
	return <div className={classes}>{text}</div>;
};

export default Message;
