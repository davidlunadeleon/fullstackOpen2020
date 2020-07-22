import React, { useState, useEffect } from 'react';
import NewNumber from './components/NewNumber';
import Numbers from './components/Numbers';
import phonebookService from './services/phonebook';
import Message from './components/Message';

import './index.css';

const App = () => {
	const [person, setPerson] = useState([]);
	const [newName, setNewName] = useState('');
	const [newPhone, setNewPhone] = useState('');
	const [newQuery, setNewQuery] = useState('');
	const [personList, setNewPersonList] = useState(person);
	const [message, setMessage] = useState({ type: null, text: null });

	const setMessageAndTimeOut = ({ text, type }) => {
		setMessage({
			text: text,
			type: type
		});
		setTimeout(() => {
			setMessage({
				text: null,
				type: null
			});
		}, 5000);
	};

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

	useEffect(() => {
		phonebookService
			.getAll()
			.then((allPhones) => {
				setPerson(allPhones);
			})
			.catch((error) =>
				alert('There was an error retrieving the phonebook')
			);
	}, []);

	const addPerson = (event) => {
		event.preventDefault();
		const newPerson = {
			name: newName,
			number: newPhone
		};
		if (person.some((person) => person.name === newName)) {
			if (
				window.confirm(
					`${newName} is already on the phonebook. Do you want to replace the old number with the new one?`
				)
			) {
				const id = person.find((person) => person.name === newName).id;
				phonebookService
					.update(id, newPerson)
					.then((response) =>
						setPerson(
							person
								.filter((person) => person.id !== id)
								.concat(response)
						)
					);

				setMessageAndTimeOut({
					text: `The number of ${newPerson.name} has been updated`,
					type: 'success'
				});
			}
		} else if (person.some((person) => person.number === newPhone)) {
			setMessageAndTimeOut({
				text: `The number ${newPerson.number} is already on the phonebook`,
				type: 'error'
			});
		} else {
			phonebookService
				.create(newPerson)
				.then((addedPerson) => {
					setPerson(person.concat(addedPerson));
				})
				.catch((error) => {
					setMessageAndTimeOut({
						text: 'There was an error adding the new phone',
						type: 'error'
					});
				});
			setMessageAndTimeOut({
				text: `The number of ${newPerson.name} has been created`,
				type: 'success'
			});
		}
		setNewName('');
		setNewPhone('');
	};

	const deletePerson = (id) => {
		if (window.confirm('Are you sure you want to delete this number?')) {
			phonebookService
				.deletePhone(id)
				.then((response) => {
					setPerson(person.filter((p) => p.id !== id));
					setMessageAndTimeOut({
						text: `The number has been deleted`,
						type: 'success'
					});
				})
				.catch((error) => {
					setMessageAndTimeOut({
						text:
							'There was an error deleting the number. The number has already been deleted from the server',
						type: 'error'
					});
					setPerson(person.filter((p) => p.id !== id));
				});
		}
	};

	return (
		<div>
			<h1>Phonebook</h1>
			<Message text={message.text} type={message.type} />
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
				deletePerson={deletePerson}
			/>
		</div>
	);
};

export default App;
