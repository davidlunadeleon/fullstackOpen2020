import React, { useState, useImperativeHandle } from 'react';
import { Button } from 'react-bootstrap';

const Togglable = React.forwardRef((props, ref) => {
	const [visible, setVisible] = useState(false);

	const toggleVisibility = () => {
		setVisible(!visible);
	};

	const showWhenVisible = () => {
		return (
			<div>
				{props.children}
				<Button
					variant="danger"
					onClick={toggleVisibility}
					type="button"
				>
					{props.hideButtonLabel}
				</Button>
			</div>
		);
	};

	const hiddenWhenVisible = () => (
		<Button variant="primary" onClick={toggleVisibility} type="button">
			{props.showButtonLabel}
		</Button>
	);

	useImperativeHandle(ref, () => {
		return {
			toggleVisibility
		};
	});

	return <div>{visible ? showWhenVisible() : hiddenWhenVisible()}</div>;
});

Togglable.displayName = 'Togglable';

export default Togglable;
