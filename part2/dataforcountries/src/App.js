import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Search from './components/Search';
import DisplayList from './components/DisplayList';
import DisplayCountry from './components/DisplayCountry';

const App = () => {
	const [countries, setCountries] = useState([]);
	const [filter, setFilter] = useState('');
	const [countriesFilter, setCountriesFilter] = useState([]);
	const [filteredCountries, setNumOfFiltered] = useState(-1);

	const getCountries = () => {
		axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
			setCountries(response.data);
			setCountriesFilter(response.data);
			setNumOfFiltered(response.data.length);
		});
	};

	const filterCountries = () => {
		const newList = countries.filter((element) => {
			return element.name.toLowerCase().includes(filter.toLowerCase());
		});
		setCountriesFilter(newList);
		setNumOfFiltered(newList.length);
	};

	useEffect(getCountries, []);
	useEffect(filterCountries, [setCountriesFilter, filter]);

	const handleFilterChange = (event) => {
		setFilter(event.target.value);
	};

	const handleShowCountry = (event) => {
		setFilter(event.target.id);
	};

	const displayListOrCountry = () => {
		console.log(filteredCountries);
		if (filteredCountries === -1) {
			return <p>Loading...</p>;
		} else if (filteredCountries === 0) {
			return <p>Country not found</p>;
		} else if (filteredCountries > 10) {
			return <p>Too many matches, specify another filter</p>;
		} else if (filteredCountries > 1) {
			return (
				<DisplayList
					list={countriesFilter}
					buttonAction={handleShowCountry}
				/>
			);
		} else {
			return <DisplayCountry country={countriesFilter[0]} />;
		}
	};

	return (
		<div>
			<h1>Data for countries</h1>
			<Search
				text="find countries"
				filter={filter}
				setFilter={handleFilterChange}
			/>
			{displayListOrCountry()}
		</div>
	);
};

export default App;
