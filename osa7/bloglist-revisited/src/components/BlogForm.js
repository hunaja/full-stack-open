import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'

import { setNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import Togglable from './Togglable'

const inputHandler = (setter) => (e) => setter(e.target.value)

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const newBlogRef = useRef()
  const dispatch = useDispatch()

  const handleNewBlog = async (event) => {
    event.preventDefault()

    dispatch(createBlog({ title, author, url }))
    setNotification(`New blog ${title} added!`)
    
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <Togglable label='create new blog' ref={newBlogRef}>
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
        <Button type="primary" id="submit-new-blog-form">create</Button>
      </form>
    </Togglable>
  )
}

export default BlogForm
