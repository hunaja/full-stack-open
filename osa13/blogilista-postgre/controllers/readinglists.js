const { Router } = require('express');
const { Readings } = require('../models/index');
const extractUser = require('../util/extractUser')

const router = Router()

router.post('/', async (req, res) => {
    const { body: { blogId, userId } } = req

    await Readings.create({ blogId, userId, read: false })
    res.sendStatus(200)
})

router.put('/:id', extractUser, async (req, res) => {
    const { body: { read }, params: { id } } = req

    const reading = await Readings.findByPk(id)
    if (!reading) return res.status(404).json({ error: 'Not Found' })

    if (reading.userId !== req.user.id) return res.status(403).json({ error: 'Insufficient Permissions' })

    reading.read = read
    await reading.save()

    res.sendStatus(200)
})

module.exports = router
