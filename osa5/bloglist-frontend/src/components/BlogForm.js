import React, { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const inputHandler = (setter) => (e) => setter(e.target.value)

  const handleNewBlog = async (event) => {
    event.preventDefault()
    addBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
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
  )
}

export default BlogForm
