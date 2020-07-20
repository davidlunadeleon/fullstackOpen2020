import React from 'react';

const ShowCountryButton = ({ buttonAction, countryName }) => {
	return (
		<button onClick={buttonAction} id={countryName}>
			show
		</button>
	);
};

export default ShowCountryButton;
