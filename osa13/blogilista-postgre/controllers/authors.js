const { Router } = require('express')
const sequelize = require('sequelize')

const { Blog } = require('../models')

const router = Router()

router.get('/', async (_req, res) => {
    const authors = await Blog.findAll({
        group: ['author'],
        attributes: [
            'author',
            [sequelize.fn('COUNT', sequelize.col('author')), 'total_blogs'],
            [sequelize.fn('SUM', sequelize.col('likes')), 'total_likes'],
        ],
    })

    res.json(authors)
})

module.exports = router
