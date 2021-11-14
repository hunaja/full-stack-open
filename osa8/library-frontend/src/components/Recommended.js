import React, { useEffect } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'

import { ALL_BOOKS, FAVORITE_GENRE } from '../queries'
import BookList from './BookList'

const Recommended = ({ show }) => {
  const favoriteGenreResult = useQuery(FAVORITE_GENRE)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if (!favoriteGenreResult.data?.me?.favoriteGenre) {
      return
    }

    const genre = favoriteGenreResult.data.me.favoriteGenre

    getBooks({ variables: { genre } })
  }, [favoriteGenreResult.data, getBooks])

  if (!show) return null

  if (favoriteGenreResult?.loading || booksResult?.loading)
    return <p>loading...</p>

  const genre = favoriteGenreResult.data.me.favoriteGenre


  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <b>{genre}</b></p>

      {booksResult?.data?.allBooks && <BookList books={booksResult.data.allBooks} />}
    </div>
  )
}

export default Recommended
