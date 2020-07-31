import React, { useState, useImperativeHandle } from 'react';

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const showWhenVisible = () => {
		return (
			<div>
				{props.children}
				<button onClick={toggleVisibility}>cancel</button>
			</div>
		);
	};

	const hiddenWhenVisible = () => {
		return (
			<div>
				<button onClick={toggleVisibility}>{props.buttonLabel}</button>
			</div>
		);
	};

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		};
	});

	return <div>{visible ? showWhenVisible() : hiddenWhenVisible()}</div>;
});

export default Togglable;
