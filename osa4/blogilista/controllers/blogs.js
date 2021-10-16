const { Router } = require('express')

const Blog = require('../models/blog.js')
const User = require('../models/user.js')
const userExtractor = require('../utils/user_extractor.js')

const router = Router()

router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user')
  return res.json(blogs)
})

router.post('/:id/comments', async (req, res) => {
  const { body } = req
  
  const blog = await Blog.findById(req.params.id)
  blog.comments = [body.content, ...blog.comments]
  const updatedBlog = await blog.save()

  res.status(201).json(updatedBlog.comments)
})

router.post('/', userExtractor, async (req, res) => {
  // Only registered users can add new blogs
  const user = req.user

  const blog = new Blog({
    ...req.body,
    user: user.id
  })
  const dbBlog = await blog.save()

  const dbUser = await User.findById(user.id)
  dbUser.blogs = dbUser.blogs.concat(dbBlog.id)
  await dbUser.save()

  res.status(201).json({ ...dbBlog.toJSON(), user: dbUser })
})

router.put('/:id', async (req, res) => {
  const body = req.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true
  }).populate('user')
  
  if (!updatedBlog) return res.status(404)

  return res.json(updatedBlog.toJSON())
})

router.delete('/:id', userExtractor, async (req, res) => {
  const user = req.user

  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.sendStatus(404)

  const postUserId = blog.user ? blog.user : ''

  if (postUserId.toString() !== user.id.toString())
    return res.status(401).json({ error: 'token invalid' })

  const blogId = blog.id

  await blog.delete()

  const dbUser = await User.findById(user.id)
  dbUser.blogs = dbUser.blogs.filter((b) => b.toString() !== blogId.toString())
  await dbUser.save()

  res.sendStatus(204)
})

module.exports = router
