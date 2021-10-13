import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()

  const filter = useSelector((state) => state.filter)
  const anecdotes = useSelector((state) => state.anecdotes
    .filter((a) => a.content.toLowerCase().includes(filter.toLowerCase())))

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote))

    dispatch(setNotification(`You voted '${anecdote.content}'.`, 5))
  }

  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote)}>vote</button>
        </div>
      </div>
    )
}

export default AnecdoteList
