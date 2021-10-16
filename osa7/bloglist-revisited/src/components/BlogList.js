import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import BlogForm from './BlogForm'
import { initializeBlogs } from '../reducers/blogReducer'
import BlogsTable from './BlogsTable'

const BlogList = () => {
  const blogs = useSelector((state) => state.blogs)
  const dispatch = useDispatch()

  useEffect(() => dispatch(initializeBlogs()), [])

  return (
    <>
      <h2>All blogs</h2>
      <BlogForm />
      
      <BlogsTable blogs={blogs} />
    </>
  )
}

export default BlogList
