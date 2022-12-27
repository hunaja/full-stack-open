const { Router } = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const config = require('../util/config')
const { User, Session } = require('../models/index')
const extractUser = require('../util/extractUser')

const router = Router()

router.post('/login', async (req, res) => {
    const { body: { username, password } } = req

    const user = await User.findOne({ where: { username } })

    const validPassword = user && await bcrypt.compare(password, user.passwordHash)
    if (!validPassword) return res.status(401).json({ error: 'Invalid username or password' })

    if (user.disabled) return res.status(403).json({ error: 'Your User Has Been Disabled' })

    const token = jwt.sign({
        id: user.id,
    }, config.jwtToken);

    // Create a session with the token
    await Session.create({
        userId: user.id,
        token,
    })

    res.json({
        id: user.id,
        username: user.username,
        name: user.username,
        token,
    })
})

router.delete('/logout', extractUser, async (req, res) => {
    const user = await Session.findByPk(req.user.sessionId)
    await user.destroy()
    res.sendStatus(204)
})

module.exports = router
