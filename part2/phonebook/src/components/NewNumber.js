import React from 'react';
import FormInput from './FormInput';

const NewNumber = (props) => {
	return (
		<div>
			<h2>Add a new number</h2>
			<form>
				<FormInput
					text="name"
					inputValue={props.newName}
					inputOnChange={props.handleNewName}
				/>
				<FormInput
					text="number"
					inputValue={props.newPhone}
					inputOnChange={props.handleNewPhone}
				/>
				<div>
					<button type="submit" onClick={props.addPerson}>
						add
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewNumber;
