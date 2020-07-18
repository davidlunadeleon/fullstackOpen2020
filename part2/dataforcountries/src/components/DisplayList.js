import React from 'react';

const DisplayList = ({ list }) => {
	return (
		<div>
			<ul>
				{list.map((listElement) => (
					<li key={listElement.name}>{listElement.name}</li>
				))}
			</ul>
		</div>
	);
};

export default DisplayList;
