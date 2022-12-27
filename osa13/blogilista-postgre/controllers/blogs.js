const { Router } = require('express')
const { Op } = require('sequelize')
const { Blog, User } = require('../models/index')
const extractUser = require('../util/extractUser')

const router = Router()

const blogFinder = async (req, _res, next) => {
    req.blog = await Blog.findByPk(req.params.id)
    next()
}

router.get('/', async (req, res) => {
    const { query: { search: searchInput } } = req

    const search = searchInput?.trim()
    const where = {}

    if (search) {
        where[Op.or] = [
            { title: { [Op.iLike]: `%${search}%` } },
            { author: { [Op.iLike]: `%${search}%` } },
        ]
    }

    const blogs = await Blog.findAll({
        attributes: { exclude: ['userId'] },
        include: {
            model: User,
            attributes: ['name'],
        },
        where,
        order: [['likes', 'DESC']],
    })
    res.json(blogs);
})

router.post('/', extractUser, async (req, res) => {
    const {
        body: {
            author, url, title, likes, year,
        },
    } = req;

    const blog = await Blog.create({
        userId: req.user.id,
        author,
        url,
        title,
        likes,
        year,
    })

    res.json(blog)
});

router.put('/:id', extractUser, blogFinder, async (req, res) => {
    const { body: { likes } } = req

    if (!req.blog) return res.sendStatus(404)

    req.blog.likes = likes
    await req.blog.save()
    res.sendStatus(200)
})

router.delete('/:id', extractUser, blogFinder, async (req, res) => {
    if (!req.blog) return res.sendStatus(204)

    if (req.blog.userId !== req.user.id) {
        return res.status(401).json({ error: 'Insufficient Permissions' })
    }

    await req.blog.destroy()
    res.sendStatus(204)
})

module.exports = router
