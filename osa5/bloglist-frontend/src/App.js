import React, { useState, useEffect, useRef } from 'react'

import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import blogService from './services/blogs'
import loginService from './services/login'

const messageTime = 5000

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [visibleId, setVisibleId] = useState(null)

  const newBlogRef = useRef()
  const hideBlogRef = useRef()
  
  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('user')
    if (!userJson || userJson === 'undefined') return

    const user = JSON.parse(userJson)
    setUser(user)
    blogService.setToken(user.token)
  }, [])

  const displayMessage = (str) => {
    setMessage(str)
    setTimeout(() => setMessage(null), messageTime)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
    } catch (e) {
      setMessage('wrong username or password')
      setTimeout(() => setMessage(null), messageTime)
    }
    setPassword('')
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
  }

  const inputHandler = (setter) => (e) => setter(e.target.value)

  const addBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog)
      displayMessage(`New message ${blog.title} added!`)
      setBlogs([...blogs, createdBlog])
    } catch (e) {
      displayMessage(e.response.data.error)
    }
  }

  // Login form
  if (!user) {
    return (
      <div>
        <h2>log in to the application</h2>
        {message && <p><i>{message}</i></p>}

        <form onSubmit={handleLogin}>
          <table>
            <tbody>
              <tr>
                <td>username</td>
                <td><input value={username} onChange={inputHandler(setUsername)} /></td>
              </tr>
              <tr>
                <td>password</td>
                <td><input value={password} onChange={inputHandler(setPassword)} /></td>
              </tr>
            </tbody>
          </table>

          <button>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {message && <p><i>{message}</i></p>}
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <Togglable label='create new blog' ref={newBlogRef}>
        <BlogForm setMessage={message} addBlog={addBlog} />
      </Togglable>

      {blogs.sort((a, b) => a.likes - b.likes).map(blog =>
        <Blog key={blog.id} 
          blog={blog}
          visibleId={visibleId} 
          setVisibleId={setVisibleId}
          userId={user.id} />
      )}
    </div>
  )
}

export default App