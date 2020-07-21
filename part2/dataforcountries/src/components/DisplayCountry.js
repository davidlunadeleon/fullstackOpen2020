import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayCountry = ({ country }) => {
	const [weather, setWeather] = useState({ error: true });

	useEffect(() => {
		axios
			.get(
				`https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_API_KEY}`
			)
			.then((response) => {
				setWeather(response.data);
			});
	}, [country]);

	const displayWeather = () => {
		if (weather.error === true) {
			return <p>Unable to get weather data of {country.capital}.</p>;
		} else {
			return (
				<ul>
					<li>Description: {weather.weather[0].main}</li>
					<li>
						Temperature: {(weather.main.temp - 272.15).toFixed(2)}{' '}
						°C
					</li>
					<li>Humidity: {weather.main.humidity} %</li>
					<li>Wind speed: {weather.wind.speed} m/s</li>
				</ul>
			);
		}
	};

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
			<h3>Weather in {country.capital}</h3>
			{displayWeather()}
			<h3>Flag</h3>
			<img alt={`Flag of ${country.name}`} src={country.flag} />
		</div>
	);
};

export default DisplayCountry;
