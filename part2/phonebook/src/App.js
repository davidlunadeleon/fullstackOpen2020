import React, { useState, useEffect } from 'react';
import NewNumber from './components/NewNumber';
import Numbers from './components/Numbers';

const App = () => {
	const [person, setPerson] = useState([
		{ name: 'Arto Hellas', number: '1234567890' },
		{ name: 'David', number: '83838383' },
		{ name: 'Luna', number: '84848484' },
		{ name: 'Ada', number: '912124142' },
		{ name: 'Diana', number: '124145151' },
		{ name: 'Sans', number: '12141451555' }
	]);
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');
	const [newQuery, setNewQuery] = useState('');
	const [personList, setNewPersonList] = useState(person);

	const handleNewName = (event) => {
		setNewName(event.target.value);
	};

	const handleNewPhone = (event) => {
		setNewPhone(event.target.value);
	};

	const handleNewQuery = (event) => {
		setNewQuery(event.target.value);
	};

	useEffect(() => {
		setNewPersonList(
			person.filter((person) => {
				return (
					person.name
						.toLowerCase()
						.includes(newQuery.toLowerCase()) ||
					person.number.toLowerCase().includes(newQuery.toLowerCase())
				);
			})
		);
	}, [person, newQuery]);

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
			<h1>Phonebook</h1>
			<NewNumber
				newName={newName}
				newPhone={newPhone}
				handleNewName={handleNewName}
				handleNewPhone={handleNewPhone}
				addPerson={addPerson}
			/>
			<Numbers
				newQuery={newQuery}
				handleNewQuery={handleNewQuery}
				personList={personList}
			/>
		</div>
	);
};

export default App;
