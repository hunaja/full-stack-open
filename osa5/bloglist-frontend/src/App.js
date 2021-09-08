import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const messageTime = 5000

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  // Fetches all blogs
  useEffect(() => {
    blogService.getAll().then((blogs) =>
      setBlogs(blogs)
    )  
  }, [])

  // Fetches saved user from the local storage
  useEffect(() => {
    const userJson = window.localStorage.getItem('user')
    if (!userJson || userJson === 'undefined') return

    const user = JSON.parse(userJson)
    setUser(user)
    blogService.setToken(user.token)
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      
      window.localStorage.setItem('user', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)

      setUsername('')
    } catch (e) {
      setErrorMessage('wrong username or password')
      setTimeout(() => setErrorMessage(null), messageTime)
    }
    setPassword('')
  }

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title,
        author,
        url
      })

      setErrorMessage(`a new blog ${title} added!`)
      setBlogs([...blogs, newBlog])

      setTitle('')
      setAuthor('')
      setUrl('')
    } catch (e) {
      setErrorMessage(e.response.data.error)
      setTimeout(() => setErrorMessage(null), messageTime)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('user')
    blogService.setToken(null)
    setUser(null)
  }

  const inputHandler = (setter) => (e) => setter(e.target.value)

  if (!user) {
    return (
      <div>
        <h2>log in to the application</h2>
        {errorMessage && <p><i>{errorMessage}</i></p>}

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
      {errorMessage && <p><i>{errorMessage}</i></p>}
      <p>{user.name} logged in <button onClick={handleLogout}>logout</button></p>

      <h3>create new</h3>
      <form onSubmit={handleNewBlog}>
        <table>
          <tbody>
            <tr>
              <td>title:</td>
              <td><input value={title} onChange={inputHandler(setTitle)} /></td>
            </tr>
            <tr>
              <td>author:</td>
              <td><input value={author} onChange={inputHandler(setAuthor)} /></td>
            </tr>
            <tr>
              <td>url:</td>
              <td><input value={url} onChange={inputHandler(setUrl)} /></td>
            </tr>
          </tbody>
        </table>
        <button>create</button>
      </form>

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App