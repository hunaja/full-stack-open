const { Router } = require('express')

const Blog = require('../models/blog')
const User = require('../models/user')

const router = Router()

router.post('/reset', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  res.sendStatus(204)
})

module.exports = router
