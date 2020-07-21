import React from 'react';
import Searchbar from './Searchbar';

const Numbers = (props) => {
	return (
		<div>
			<h2>Numbers</h2>
			<h3>Filter by name or number</h3>
			<Searchbar
				newQuery={props.newQuery}
				handleNewQuery={props.handleNewQuery}
			/>
			<ul>
				{props.personList.map((person) => (
					<li key={person.name}>
						{person.name} {person.number}
						<button onClick={() => props.deletePerson(person.id)}>
							delete
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default Numbers;
