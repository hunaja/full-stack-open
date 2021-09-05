import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Results = ({ query, countries}) => {
  const matches = countries
    .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))

  if (matches.length > 10) {
    return <p>Too many matches, specify another filter</p>
  } else if (matches.length > 1) {
    return (
      <ul>
        {matches.map((c) => <li key={c.name}>{c.name}</li>)}
      </ul>
    )
  } else if (matches.length === 0) {
    return <></>
  }

  const [match] = matches

  return (
    <div>
      <h1>{match.name}</h1>
      capital {match.capital}
      <br />
      population {match.population}

      <h2>languages</h2>
      <ul>
        {match.languages.map((l) => <li key={l.name}>{l.name}</li>)}
      </ul>

      <img
        src={match.flag}
        style={{width: '150px'}}
        alt={`The flag of ${match.name}`} />
    </div>
  );
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
        <Results query={query} countries={countries} />
      </div>
    </>
  )

}

export default App