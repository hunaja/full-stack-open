const jwt = require('jsonwebtoken')
const { Op } = require('sequelize')
const config = require('./config')
const { User, Session } = require('../models/index')

const extractUser = async (req, res, next) => {
    const authHeader = req.headers.authorization

    if (authHeader?.startsWith('Bearer ')) {
        const token = authHeader.substring(7)
        const decodedUser = jwt.verify(token, config.jwtToken)

        const user = await User.findByPk(decodedUser.id, {
            attributes: ['disabled'],
            include: {
                model: Session,
                where: { token: { [Op.eq]: token } },
                limit: 1,
            },
        })

        const [session] = user.sessions

        if (!user || !session) return res.status(403).json({ error: 'Your Session Is Invalid' })
        if (user.disabled) return res.status(403).json({ error: 'Your User Has Been Disabled' })

        req.user = { ...decodedUser, sessionId: session.id }
    } else {
        return res.status(401).json({ error: 'Token missing.' })
    }

    next()
}

module.exports = extractUser
