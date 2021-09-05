import React, { useEffect, useState } from 'react'
import axios from 'axios'

const weatherApiKey = process.env.REACT_APP_API_KEY

const CountryInfo = ({ country }) => {
  const [weather, setWeather] = useState(null)

  useState(() => {
    axios
      .get('http://api.weatherapi.com/v1/current.json', {
        params: { q: country.capital, key: weatherApiKey }
      })
      .then(({ data }) => setWeather(data.current))
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      capital {country.capital}
      <br />
      population {country.population}

      <h2>languages</h2>
      <ul>
        {country.languages.map((l) => 
          <li key={l.name}>
            {l.name}
          </li>)}
      </ul>

      <img
        src={country.flag}
        style={{width: '150px'}}
        alt={`The flag of ${country.name}`} />

      {weather && <>
        <h1>Weather in {country.capital}</h1>
        <p><b>temperature: </b> {weather.temp_c} Celcius</p>
        <img src={weather.condition.icon} alt={weather.condition.text} />
        <p><b>wind: </b> {weather.wind_mph} direction {weather.wind_dir}</p>
      </>}

      
    </div>
  );
}

const Results = ({ query, setQuery, countries}) => {
  const matches = countries
    .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))

  if (matches.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (matches.length > 1) {
    return (
      <ul>
        {matches.map((c) => 
          <li key={c.name}>
            {c.name} <button onClick={() => setQuery(c.name)}>show</button>
          </li>)}
      </ul>
    )
  }

  return (matches.length === 1) ? <CountryInfo country={matches[0]} /> : <></>  
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(({ data }) => setCountries(data))
  }, [])

  const handleQueryChange = (event) => setQuery(event.target.value)

  return (
    <>
      <div>
        find countries <input value={query} onChange={handleQueryChange} />
      </div>
      <div>
        <Results query={query} setQuery={setQuery} countries={countries} />
      </div>
    </>
  )

}

export default App