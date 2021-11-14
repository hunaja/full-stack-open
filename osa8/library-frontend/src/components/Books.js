import React, { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'

import BookList from './BookList'
import { ALL_GENRES, ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)
  const [getGenreBooks, booksResult] = useLazyQuery(ALL_BOOKS)
  const genresResult = useQuery(ALL_GENRES)

  useEffect(() => {
    getGenreBooks({ variables: { genre } })
  }, [genre, getGenreBooks])

  if (!show) return null

  if (booksResult.loading || !booksResult.data) return <p>loading...</p>
  if (genresResult.loading || !genresResult.data) return <p>loading...</p>

  const books = booksResult.data.allBooks

  const genres = [...new Set(genresResult.data.allBooks.map((b) => b.genres).flat())]

  const handleGenre = (g) => () => {
    setGenre(g)
  }

  return (
    <div>
      <h2>books</h2>

      <BookList books={books} />

      {genres.map((g) => <button key={g} onClick={handleGenre(g)}>{g}</button>)}
      <button onClick={handleGenre(null)}>all genres</button>
    </div>
  )
}

export default Books
