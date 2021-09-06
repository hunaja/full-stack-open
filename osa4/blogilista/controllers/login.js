const { Router } = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.js')

const router = Router()

router.post('/', async (req, res) => {
  const body = req.body
  const user = await User.findOne({ username: body.username })

  const passwordCorrect = user && await bcrypt.compare(body.password, user.passwordHash)
  if (!passwordCorrect) return res.status(401).json({ error: 'invalid username or password'})

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  res.json({
    username: user.username,
    name: user.name,
    token
  })
})

module.exports = router
