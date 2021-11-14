import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS, ALL_GENRES } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{
      query: ALL_AUTHORS
    }],
    update: (store, response) => {
      const genresInStore = store.readQuery({
        query: ALL_GENRES
      })

      store.writeQuery({
        query: ALL_GENRES,
        data: {
          ...(genresInStore || {}),
          allBooks: [
            ...(genresInStore?.allBooks || []),
            [genres] 
          ]
        }
      })

      genres.concat([null]).forEach((genre) => {
        const dataInStore = store.readQuery({
          query: ALL_BOOKS,
          variables: { genre }
        })

        store.writeQuery({
          query: ALL_BOOKS,
          variables: { genre },
          data: {
            ...(dataInStore || {}),
            allBooks: [
              ...(dataInStore?.allBooks || []), 
              response.data.addBook
            ]
          }
        })}
      )
    },
  })

  if (!props.show) return null

  const submit = async (event) => {
    event.preventDefault()
    
    addBook({
      variables: {
        published: parseInt(published),
        title,
        author, 
        genres 
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook
