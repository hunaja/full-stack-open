import React, { useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [born, setBorn] = useState('')

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{
      query: ALL_AUTHORS
    }]
  })

  const result = useQuery(ALL_AUTHORS)

  if (!props.show) return null

  if (result.loading) return <p>loading...</p>
  const authors = result.data.allAuthors

  const options = authors.map((a) => ({ value: a.name, label: a.name }))

  const token = props.token

  const updateAuthor = (event) => {
    event.preventDefault()

    editAuthor({
      variables: {
        name: selectedOption.value,
        born: parseInt(born)
      }
    })

    setBorn('')
    setSelectedOption(null)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      {token &&
        <>
          <h3>set birthyear</h3>

          <form onSubmit={updateAuthor}>
            <Select 
              defaultValue={selectedOption}
              onChange={setSelectedOption} 
              options={options} />
            born
            <input value={born} type="number" onChange={({ target }) => setBorn(target.value)} />
            <button>update author</button>
          </form>
        </>
      }
    </div>
  )
}

export default Authors