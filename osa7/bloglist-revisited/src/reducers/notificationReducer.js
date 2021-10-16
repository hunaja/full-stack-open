const initialState = null
let currentTimeout = null

const notificationReducer = (state = initialState, action) => {
  if (!action) return state

  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.data.message
  case 'CLEAR_NOTIFICATION':
    return null
  default:
    return state
  }
}

export const setNotification = (message, time = 5) => async (dispatch) => {
  if (currentTimeout !== null) clearTimeout(currentTimeout)

  dispatch({
    type: 'SET_NOTIFICATION',
    data: { message }
  })

  const timeout = setTimeout(() => dispatch({
    type: 'CLEAR_NOTIFICATION'
  }), time * 1000)

  currentTimeout = timeout
}

export default notificationReducer
