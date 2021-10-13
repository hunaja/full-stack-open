import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  if (!action) return state

  switch (action.type) {
    case 'ADD_ANECDOTE':
      return [action.data, ...state]
    case 'INITIALIZE_ANECDOTES':
      return action.data
    case 'UPDATE_ANECDOTE': {
      const updatedAnecdote = action.data
      const otherAnecdotes = state.filter((a) => a.id !== updatedAnecdote.id)

      return [updatedAnecdote, ...otherAnecdotes]
    }
    default:
      return state
  }
}

export const initializeAnecdotes = () => async (dispatch) => {
  const anecdotes = await anecdoteService.getAll()

  dispatch({
    type: 'INITIALIZE_ANECDOTES',
    data: anecdotes
  })
}

export const addAnecdote = (content) => async (dispatch) => {
  const newAnecdote = await anecdoteService.createNew(content)
  console.log(newAnecdote)

  dispatch({
    type: 'ADD_ANECDOTE',
    data: newAnecdote
  })
}

export const voteAnecdote = (anecdote) => async (dispatch) => {
  const updatedAnecdote = await anecdoteService.vote(anecdote)

  dispatch({
    type: 'UPDATE_ANECDOTE',
    data: updatedAnecdote
  })
}

export default reducer
