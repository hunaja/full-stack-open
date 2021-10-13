const initialState = null

const reducer = (state = initialState, action) => {
  if (!action) return state

  switch (action.type) {
    case 'SET_MESSAGE':
      return action.data.message
    case 'RESET_MESSAGE':
      return null
    default:
      return state
  }
}

let timeoutId = null

export const setNotification = (message, time) => async (dispatch) => {
  if (timeoutId !== null) {
    clearTimeout(timeoutId)
    timeoutId = null
  }

  dispatch({
    type: 'SET_MESSAGE',
    data: { message }
  })

  const id = setTimeout(() => {
    dispatch({
      type: 'RESET_MESSAGE',
    })
    timeoutId = null
  }, time*1000)

  timeoutId = id
}

export default reducer
