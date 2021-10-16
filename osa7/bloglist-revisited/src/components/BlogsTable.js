import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogsTable = ({ blogs }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Likes</th>
      </tr>
    </thead>
    <tbody>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) =>
          <tr key={blog.id}>
            <td>
              <Link to={`/blogs/${blog.id}`}>
                {blog.title}
              </Link>
            </td>
            <td>
              {blog.author}
            </td>
            <td>
              {blog.likes}
            </td>
          </tr>)}
    </tbody>
  </Table>
)

BlogsTable.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default BlogsTable
