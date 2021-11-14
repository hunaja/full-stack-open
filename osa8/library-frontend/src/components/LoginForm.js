import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'

import { LOGIN } from '../queries'

const LoginForm = ({ show, setToken, setPage }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, result] = useMutation(LOGIN)

  useEffect(() => {
    if (!result.data) return

    const token = result.data.login.value
    setToken(token)
    localStorage.setItem('token', token)
    setPage('authors')
  }, [result.data, setPage, setToken])

  if (!show) return null

  const handleLogin = (event) => {
    event.preventDefault()

    login({
      variables: {
        username,
        password
      }
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>login</h2>

      <form onSubmit={handleLogin}>
        username 
        <input 
          value={username} 
          onChange={({ target }) => setUsername(target.value)}
        />

        <br />

        password 
        <input 
          value={password} 
          onChange={({ target }) => setPassword(target.value)}
          type="password"
        />

        <br />

        <button>login</button>
      </form>
    </div>
  )
}

export default LoginForm
