const bcrypt = require('bcrypt')
const { Router } = require('express')
const { Op } = require('sequelize')

const { User, Blog } = require('../models/index')
const config = require('../util/config')
const extractUser = require('../util/extractUser')

const router = Router()

router.get('/', extractUser, async (req, res) => {
    const users = await User.findAll({
        include: {
            model: Blog,
            attributes: { exclude: ['userId'] },
        },
    })

    const result = users.map((user) => {
        const { passwordHash: ignored1, username: ignored2, ...newUser } = user.toJSON()
        return newUser
    })

    res.json(result)
})

router.post('/', async (req, res) => {
    const { body: { name, username, password } } = req

    const passwordHash = await bcrypt.hash(password, config.passwordHashRounds)

    const user = await User.create({
        name,
        username,
        passwordHash,
    })
    const { passwordHash: ignored, ...result } = user.toJSON();

    res.json(result)
})

router.get('/:id', async (req, res) => {
    const { params: { id }, query: { read } } = req
    const readingWhere = {}

    if (read === 'true') {
        readingWhere.read = { [Op.eq]: true }
    } else if (read === 'false') {
        readingWhere.read = { [Op.eq]: false }
    }

    const user = await User.findByPk(id, {
        attributes: { exclude: ['passwordHash'] },
        include: [
            {
                model: Blog,
                attributes: { exclude: ['userId'] },
            },
            {
                model: Blog,
                as: 'reading',
                attributes: { exclude: ['userId'] },
                through: { attributes: ['id', 'read'], where: readingWhere },
            },
        ],
    })

    res.json(user)
})

router.put('/:username', extractUser, async (req, res) => {
    const { params: { username }, body: { name } } = req

    const user = await User.findOne({ where: { username } })
    if (!user || user.id !== req.user.id) return res.status(403).json({ error: 'Insufficient Permissions' })

    user.name = name
    await user.save()
    res.sendStatus(200)
})

module.exports = router
