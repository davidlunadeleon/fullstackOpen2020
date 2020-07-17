import React, { useState } from 'react';

const App = () => {
	const [person, setPerson] = useState([{ name: 'Arto Hellas' }]);
	const [newName, setNewName] = useState('');

	const handleNewName = (event) => {
		setNewName(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();
		const newPerson = {
			name: newName
		};
		setPerson(person.concat(newPerson));
		setNewName('');
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					name: <input value={newName} onChange={handleNewName} />
				</div>
				<div>
					<button type="submit" onClick={addPerson}>
						add
					</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul>
				{person.map((person) => (
					<li key={person.name}>{person.name}</li>
				))}
			</ul>
		</div>
	);
};

export default App;
