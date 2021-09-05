import React, { useEffect, useState } from 'react'
import personService from './services/persons'

const handleChange = (setter) => (event) => setter(event.target.value)

const Filter = ({ filter, setFilter }) => (
  <div>
    filter shown with <input value={filter} onChange={handleChange(setFilter)} />
  </div>
)

const PersonForm = ({ persons, setPersons, setMessage }) => {
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = async (event) => {
    event.preventDefault()

    const match = persons
      .find((p) => p.name.toLowerCase() === newName.toLowerCase())

    // If there already exists a person with this name
    if (match) {
      // eslint-disable-next-line
      if (!confirm(`${match.name} is already added to phonebook. Replace the old number with a new one?`))
        return

      const changedPerson = { ...match, number: newNumber}
      
      personService.update(changedPerson).then((response) => {
        setPersons(persons.map((p) => (p.id !== match.id ) ? p : response.data))

        setMessage({
          success: true,
          text: `Changed the number of ${newName}`
        })
        setTimeout(() => setMessage(null), 2500)
      }).catch(() => {
        setMessage({
          success: false,
          text: `Information of ${newName} has already been removed from the server`
        })
        setTimeout(() => setMessage(null), 2500)
      })
    } else {
      const newPerson = { name: newName, number: newNumber }

      personService.create(newPerson).then((response) => {
        setPersons([...persons, response.data])

        setMessage({
          success: true,
          text: `Added ${newName}`
        })
        setTimeout(() => setMessage(null), 2500)
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

const Persons = ({ persons, setPersons, filter, setMessage }) => {
  const removePerson = (person) => () => {
    // eslint-disable-next-line
    if (!confirm(`Delete ${person.name} ?`)) return

    personService.remove(person).then(() => {
      // Show all persons except this one
      setPersons(persons.filter((p) => p.id !== person.id))

      setMessage({
        success: true,
        text: `Deleted ${person.name}`
      })
      setTimeout(() => setMessage(null), 2500)
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
  const [message, setMessage] = useState(null)

  useEffect(() => {
    personService.getAll().then(({ data }) => setPersons(data))
  }, [])

  const [ filter, setFilter ] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>

      {message && 
        <div className={`box ${message.success ? 'green' : 'red'}`}>
          {message.text}
        </div>}
      
      <Filter filter={filter} setFilter={setFilter} />

      <h2>add a new</h2>
      
      <PersonForm 
        persons={persons} setPersons={setPersons}
        setMessage={setMessage} />

      <h2>Numbers</h2>

      <Persons 
        persons={persons} setPersons={setPersons} 
        filter={filter} setMessage={setMessage} />
    </div>
  )

}

export default App