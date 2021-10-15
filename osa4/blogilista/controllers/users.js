const { Router } = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user.js')

const router = Router()

router.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs')
  res.json(users.map((u) => u.toJSON()))
})

router.post('/', async (req, res) => {
  const body = req.body

  if (typeof body.password !== 'string')
    return res.status(400).json({ error: 'password must be set.' })

  if (body.password.length < 3)
    return res.status(400).json({ error: 'password must be at least 3 chars' })

  const rounds = 10
  const passwordHash = await bcrypt.hash(body.password, rounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash
  })
  const savedUser = await user.save()

  return res.json(savedUser)
})

module.exports = router
