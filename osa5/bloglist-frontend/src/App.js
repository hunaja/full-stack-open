import React, { useState, useEffect } from 'react'

import BlogList from './components/BlogList'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'

const App = () => {
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  
  // Fetch JWT token from local storage
  useEffect(() => {
    const userJson = window.localStorage.getItem('user')
    if (!userJson || userJson === 'undefined') return

    const user = JSON.parse(userJson)
    setUser(user)
    blogService.setToken(user.token)
  }, [])

  const displayNotification = (str, time = 5000) => {
    setNotification(str)
    setTimeout(() => setNotification(null), time)
  }

  const logout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <div>
      <h2>{user ? 'blogs' : 'blogs'}</h2>

      {notification && <p><i>{notification}</i></p>}

      {user && 
        <p>{user.name} logged in <button onClick={logout}>logout</button></p>}

      {user 
        ? <BlogList user={user} displayNotification={displayNotification} />
        : <LoginForm setUser={setUser} displayNotification={displayNotification} />}
    </div>
  )
}

export default App