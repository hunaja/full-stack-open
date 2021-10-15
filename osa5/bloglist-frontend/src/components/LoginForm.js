import React, { useState } from 'react'
import PropTypes from 'prop-types'

import loginService from '../services/login'
import blogService from '../services/blogs'

const inputHandler = (setter) => (e) => setter(e.target.value)

const LoginForm = ({ displayNotification, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      
      setUsername('')
    } catch (e) {
      displayNotification('wrong username or password')
    }

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

      <button id="login-button">login</button>
    </form>
  )
}

LoginForm.propTypes = {
  displayNotification: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

export default LoginForm
