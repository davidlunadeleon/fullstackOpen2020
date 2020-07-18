import React from 'react';

const Search = ({ filter, setFilter, text }) => {
	return (
		<div>
			<form
				onSubmit={(event) => {
					event.preventDefault();
				}}
			>
				<div>
					{text}: <input onChange={setFilter} value={filter} />
				</div>
			</form>
		</div>
	);
};

export default Search;
