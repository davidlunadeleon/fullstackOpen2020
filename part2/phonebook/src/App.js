import React, { useState } from 'react';

const App = () => {
	const [person, setPerson] = useState([
		{ name: 'Arto Hellas', number: '1234567890' }
	]);
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');

	const handleNewName = (event) => {
		setNewName(event.target.value);
	};

	const handleNewPhone = (event) => {
		setNewPhone(event.target.value);
	};

	const addPerson = (event) => {
		event.preventDefault();
		const newPerson = {
			name: newName,
			number: newPhone
		};
		if (person.some((person) => person.name === newName)) {
			alert(`${newPerson.name} is already on the phonebook`);
		} else if (person.some((person) => person.number === newPhone)) {
			alert(`The number ${newPerson.number} is already on the phonebook`);
		} else {
			setPerson(person.concat(newPerson));
		}
		setNewName('');
		setNewPhone('');
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form>
				<div>
					name: <input value={newName} onChange={handleNewName} />
				</div>
				<div>
					number: <input value={newPhone} onChange={handleNewPhone} />
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
					<li key={person.name}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
