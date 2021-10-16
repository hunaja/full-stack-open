import loginService from '../services/login'
import blogService from '../services/blogs'

const loginReducer = (state = null, action) => {
  if (!action) return state

  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'CLEAR_USER':
    return null
  default:
    return state
  }
}

export const initializeUser = () => async (dispatch) => {
  const userJson = window.localStorage.getItem('user')
  if (!userJson || userJson === 'undefined') return

  const data = JSON.parse(userJson)

  dispatch({
    type: 'SET_USER',
    data
  })

  blogService.setToken(data.token)
}

export const loginUser = (user) => async (dispatch) => {
  const data = await loginService.login(user)
  window.localStorage.setItem('user', JSON.stringify(data))

  dispatch({
    type: 'SET_USER',
    data
  })

  blogService.setToken(user.token)
}

export const logoutUser = () => async (dispatch) => {
  window.localStorage.removeItem('user')

  dispatch({
    type: 'CLEAR_USER'
  })

  blogService.setToken(null)
}

export default loginReducer
