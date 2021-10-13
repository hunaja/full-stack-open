import React from 'react'
import PropTypes from 'prop-types'

const Blog = ({ likeBlog, removeBlog, blog, visible, setVisible, userId }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhen = (condition) => ({ display: condition ? 'none' : ''})
  const toggleVisibility = () => setVisible(!visible ? blog.id : null)

  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button className='toggle-button' onClick={toggleVisibility}>
        {!visible ? 'show' : 'hide'}
      </button>

      <div className='blog-details' style={hideWhen(!visible)}>
        {blog.url} <br />
        likes {blog.likes} <button onClick={() => likeBlog(blog)}>like</button> <br />
        {blog.user && blog.user.name}
        {blog.user && blog.user.id === userId && (
          <><br /><button onClick={() => removeBlog(blog)}>remove</button></>
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  likeBlog: PropTypes.func.isRequired,
  removeBlog: PropTypes.func.isRequired,
  blog: PropTypes.object.isRequired,
  visible: PropTypes.bool,
  setVisible: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired
}

export default Blog
