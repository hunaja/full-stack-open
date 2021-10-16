import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, useHistory, Link } from 'react-router-dom'
import { Button, ButtonGroup, Badge, Card } from 'react-bootstrap'

import { commentBlog, likeBlog, removeBlog } from '../reducers/blogReducer'

const Blog = () => {
  const [comment, setComment] = useState('')

  const history = useHistory()
  const { id } = useParams()
  const blog = useSelector((state) => state.blogs.find((b) => b.id === id))
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  if (!blog) return null

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    if (!window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) return
    dispatch(removeBlog(blog))
    history.push('/')
  }

  const handleCommentChange = (event) => setComment(event.target.value)

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog, comment))
    setComment('')
  }

  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>Kirjoittanut {blog.author}</Card.Text>

          <ButtonGroup aria-label="Basic example">
            <a href={blog.url}>
              <Button variant="primary">
                Read
              </Button>
            </a>
            
            <Button variant="primary" onClick={handleLike}>
              Like <Badge bg="secondary">{blog.likes}</Badge>
            </Button>

            {blog.user && blog.user.id === user.id && 
              <Button variant="danger" onClick={handleRemove}>
                Remove
              </Button>}
          </ButtonGroup>
        </Card.Body>
        {blog.user && 
          <Card.Footer className="text-muted">
            Sent by <Link to={`users/${blog.user.id}`}>{blog.user.name}</Link>
          </Card.Footer>}
      </Card>

      <h3>Comments</h3>

      <form onSubmit={handleComment}>
        <input id="comment" value={comment} onChange={handleCommentChange} />
        <button>send comment</button>
      </form>

      <ul>
        {blog.comments.map((c) => <li key={c}>{c}</li>)}
      </ul>
    </div>
  )
}

export default Blog
