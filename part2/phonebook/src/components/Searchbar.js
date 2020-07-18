import React from 'react';
import FormInput from './FormInput';

const SearchBar = (props) => {
	return (
		<form onSubmit={(event) => event.preventDefault()}>
			<FormInput
				text="search"
				inputValue={props.newQuery}
				inputOnChange={props.handleNewQuery}
			/>
		</form>
	);
};

export default SearchBar;
