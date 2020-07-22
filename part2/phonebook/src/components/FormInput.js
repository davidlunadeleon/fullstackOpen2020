import React from 'react';

const FormInput = ({ inputValue, inputOnChange, text }) => {
	return (
		<div>
			{text}:{' '}
			<input
				value={inputValue}
				onChange={inputOnChange}
				className="inputField"
			/>
		</div>
	);
};

export default FormInput;
