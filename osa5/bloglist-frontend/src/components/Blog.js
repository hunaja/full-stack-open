import React from 'react'
import PropTypes from 'prop-types'

import Togglable from './Togglable'
import blogsService from '../services/blogs'

const Blog = ({ blog, visibleId, setVisibleId, userId }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const hideWhen = (condition) => ({ display: condition ? 'none' : ''})

  const toggleVisibility = () => setVisibleId(blog.id);
  const handleLike = async () => await blogsService.like(blog)
  const handleRemove = async () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    await blogsService.remove(blog)
  }

  return (
    <div style={blogStyle}>
     {blog.title} <button onClick={toggleVisibility}>view</button>

     <div style={hideWhen(visibleId === blog.id)}>
      <Togglable label='hide'>
        {blog.url}
        likes {blog.likes} <button onClick={handleLike}>like</button>
        {blog.author}
        {blog.user === userId && <button onClick={handleRemove}>remove</button>}
      </Togglable>
     </div>
   </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  visibleId: PropTypes.string.isRequired,
  setVisibleId: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
}

export default Blog