import React, { useEffect, useState } from 'react'
import { useSubscription, useApolloClient } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

import { BOOK_ADDED } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const client = useApolloClient()

  useEffect(() => {
    const token = localStorage.getItem('token')
    setToken(token)
  }, [setToken])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: (({ subscriptionData }) => {
      const book = subscriptionData.data.bookAdded

      window.alert(`New book '${book.title}' added.`)
    })
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()

    if (page === 'add') setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>

        {token && 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
          </>}
 
        {!token 
          ? <button onClick={() => setPage('login')}>login</button>
          : <button onClick={() => logout()}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
        token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommended 
        show={page === 'recommended'}
      />

      <LoginForm
        show={page === 'login'}
        setToken={setToken}
        setPage={setPage}
      />

    </div>
  )
}

export default App
