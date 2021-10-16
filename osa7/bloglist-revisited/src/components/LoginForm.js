import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { loginUser } from '../reducers/loginReducer'
import { setNotification } from '../reducers/notificationReducer'

const inputHandler = (setter) => (e) => setter(e.target.value)

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(loginUser({ username, password }))
      .catch(() => dispatch(setNotification(('wrong username or password'))))

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <table>
        <tbody>
          <tr>
            <td>username</td>
            <td>
              <input 
                id="username"
                value={username} 
                onChange={inputHandler(setUsername)} />
            </td>
          </tr>
          <tr>
            <td>password</td>
            <td>
              <input 
                id="password"
                value={password}
                type="password"
                onChange={inputHandler(setPassword)} /></td>
          </tr>
        </tbody>
      </table>

      <button>login</button>
    </form>
  )
}

export default LoginForm
