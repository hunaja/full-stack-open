import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import blogService from '../services/blogs'
import BlogForm from './BlogForm'
import Blog from './Blog'
import Togglable from './Togglable'

const BlogList = ({ user, displayNotification }) => {
  const [blogs, setBlogs] = useState([])
  const [visibleId, setVisibleId] = useState(null)

  const newBlogRef = useRef()

  useEffect(() => blogService.getAll().then((bs) => setBlogs(bs)), [])

  const addBlog = async (blog) => {
    try {
      const createdBlog = await blogService.create(blog)
      displayNotification(`New blog ${blog.title} added!`)
      setBlogs([...blogs, createdBlog])
    } catch (e) {
      displayNotification(e.response.data.error)
    }
  }

  const likeBlog = async (blog) => {
    const likedBlog = await blogService.like(blog)
    setBlogs([likedBlog, ...blogs.filter((b) => b.id !== likedBlog.id)])
  }
  
  const removeBlog = async (blog) => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    await blogService.remove(blog)
    setBlogs(blogs.filter((b) => b.id !== blog.id))
  }

  return (
    <div id="blog-list">
      <Togglable label='create new blog' ref={newBlogRef}>
        <BlogForm addBlog={addBlog} />
      </Togglable>

      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) =>
          <Blog key={blog.id}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            blog={blog}
            visible={blog.id === visibleId}
            setVisible={setVisibleId}
            userId={user.id} />
        )}
    </div>
  )
}

BlogList.propTypes = {
  user: PropTypes.object.isRequired,
  displayNotification: PropTypes.func.isRequired
}

export default BlogList
