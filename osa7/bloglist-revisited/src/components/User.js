import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import BlogsTable from './BlogsTable'

const User = () => {
  const { id } = useParams()
  const user = useSelector((state) => state.users.find((u) => u.id === id))

  if (!user) return null

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <BlogsTable blogs={user.blogs} />
    </div>
  )
}

export default User
