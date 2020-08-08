import React from 'react';
import { connect } from 'react-redux';

import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
	const handleChange = (event) => {
		props.setFilter(event.target.value);
	};

	return (
		<div>
			Filter: <input onChange={handleChange} />
		</div>
	);
};

const mapStateToProps = (state) => {
	return {
		filter: state.filters
	};
};

const mapDispatchToProps = {
	setFilter
};

export default connect(mapStateToProps, mapDispatchToProps)(Filter);
