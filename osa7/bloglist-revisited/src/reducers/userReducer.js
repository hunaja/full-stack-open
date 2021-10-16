import userService from '../services/users'

const userReducer = (state = [], action) => {
  if (!action) return state

  switch (action.type) {
  case 'INITIALIZE_USERS':
    return action.data
  default:
    return state
  }
}

export const initializeUsers = () => async (dispatch) => {
  const data = await userService.getAll()

  dispatch({
    type: 'INITIALIZE_USERS',
    data
  })
}

export default userReducer
