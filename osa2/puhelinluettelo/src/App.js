import React, { useEffect, useState } from 'react'
import axios from 'axios'

const handleChange = (setter) => (event) => setter(event.target.value)

const Filter = ({ filter, setFilter }) => (
  <div>
    filter shown with <input value={filter} onChange={handleChange(setFilter)} />
  </div>
)

const PersonForm = ({ persons, setPersons }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = (event) => {
    event.preventDefault()

    // is there a person with this name in the phonebook already?
    if (!persons.some((p) => p.name.toLowerCase() === newName.toLowerCase())) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      setPersons([newPerson, ...persons])
    } else {
      alert(`${newName} is already added to phonebook`)
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <form onSubmit={addName}>
      <div>
        name: <input value={newName} onChange={handleChange(setNewName)} />
      </div>

      <div>
        number: <input value={newNumber} onChange={handleChange(setNewNumber)} />
      </div>

      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, filter }) => (
  <div>
     {persons
        .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
        .map((p) => <p key={p.name}>{p.name} {p.number}</p>)}
  </div>
)

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(({ data }) => setPersons(data))
  }, [])

  const [ filter, setFilter ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={filter} setFilter={setFilter} />

      <h2>add a new</h2>
      
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} />
    </div>
  )

}

export default App