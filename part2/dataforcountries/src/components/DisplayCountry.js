import React from 'react';

const DisplayCountry = ({ country }) => {
	return (
		<div>
			<h2>{country.name}</h2>
			<h3>Cool facts!</h3>
			<ul>
				<li>Region: {country.region}</li>
				<li>Capital: {country.capital}</li>
				<li>Population: {country.population}</li>
			</ul>
			<h3>Languages</h3>
			<ul>
				{country.languages.map((language) => (
					<li key={language.name}>{language.name}</li>
				))}
			</ul>
			<h3>Flag</h3>
			<img alt={`Flag of ${country.name}`} src={country.flag} />
		</div>
	);
};

export default DisplayCountry;
