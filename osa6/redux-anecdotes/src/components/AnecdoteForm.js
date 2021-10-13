import React from 'react'
import { connect } from 'react-redux'

import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ addAnecdote, setNotification }) => {
  const addNew = (event) => {
    event.preventDefault()

    const content = event.target.content.value
    event.target.content.value = ''
  
    addAnecdote(content)
    setNotification(`You added '${content}'`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNew}>
          <div><input name="content" /></div>
          <button>create</button>
      </form>
    </>
  )
}

const ConnectedAnecdoteForm = connect(null, 
  { addAnecdote, setNotification }
)(AnecdoteForm)

export default ConnectedAnecdoteForm
