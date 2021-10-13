import React, { useState } from 'react'
import PropTypes from 'prop-types'

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
            <td>
              <input 
                id="title-field" 
                value={title} 
                onChange={inputHandler(setTitle)} />
            </td>
          </tr>
          <tr>
            <td>author:</td>
            <td>
              <input 
                id="author-field" 
                value={author} 
                onChange={inputHandler(setAuthor)} />
            </td>
          </tr>
          <tr>
            <td>url:</td>
            <td>
              <input
                id="url-field"
                value={url}
                onChange={inputHandler(setUrl)} />
            </td>
          </tr>
        </tbody>
      </table>
      <button id="submit-new-blog-form">create</button>
    </form>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm
