import React from 'react';
import ShowCountryButton from './ShowCountryButton';

const DisplayList = ({ list, buttonAction }) => {
	return (
		<div>
			<ul>
				{list.map((listElement) => (
					<li key={listElement.name}>
						{listElement.name}
						<ShowCountryButton
							buttonAction={buttonAction}
							countryName={listElement.name}
						/>
					</li>
				))}
			</ul>
		</div>
	);
};

export default DisplayList;
