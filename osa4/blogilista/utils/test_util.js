const bcrypt = require('bcrypt')

const Blog = require('../models/blog.js')
const User = require('../models/user.js')

const createUser = async ({ username, name, password }) => {
  const rounds = 10
  const passwordHash = await bcrypt.hash(password, rounds)
    
  const user = new User({
    username,
    name,
    passwordHash
  })

  return await user.save()
}

module.exports = {
  createUser
}