import React, { useEffect, useState } from 'react'
import personService from './services/persons'

const handleChange = (setter) => (event) => setter(event.target.value)

const Filter = ({ filter, setFilter }) => (
  <div>
    filter shown with <input value={filter} onChange={handleChange(setFilter)} />
  </div>
)

const PersonForm = ({ persons, setPersons }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = async (event) => {
    event.preventDefault()

    const match = persons
      .find((p) => p.name.toLowerCase() === newName.toLowerCase())

    if (match) {
      // eslint-disable-next-line
      if (!confirm(`${match.name} is already added to phonebook. Replace the old number with a new one?`))
        return

      const changedPerson = { ...match, number: newNumber}
      
      personService.update(changedPerson).then((response) => {
        setPersons(persons.map((p) => (p.id !== match.id )? p : response.data))
      })
    } else {
      const newPerson = { name: newName, number: newNumber }

      personService.create(newPerson).then((response) => {
        setPersons([response.data, ...persons])
      })
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

const Persons = ({ persons, setPersons, filter }) => {
  const removePerson = (person) => () => {
    // eslint-disable-next-line
    if (!confirm(`Delete ${person.name} ?`)) return

    personService.remove(person).then(() => {
      // Show all persons except this one
      setPersons(persons.filter((p) => p.id !== person.id))
    })
  }

  return (
    <div>
      {persons
          .filter((p) => p.name.toLowerCase().includes(filter.toLowerCase()))
          .map((p) =>
            <p key={p.name}>
              {p.name} {p.number} <button onClick={removePerson(p)}>delete</button>
            </p>)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    personService.getAll().then(({ data }) => setPersons(data))
  }, [])

  const [ filter, setFilter ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter filter={filter} setFilter={setFilter} />

      <h2>add a new</h2>
      
      <PersonForm persons={persons} setPersons={setPersons} />

      <h2>Numbers</h2>

      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  )

}

export default App