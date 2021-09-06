const { Router } = require('express')
const Blog = require('../models/blog.js')
const User = require('../models/user.js')

const router = Router()

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  return res.json(blogs)
})

router.post('/', async (req, res) => {
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

  res.status(201).json(dbBlog)
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
  })
  if (!updatedBlog) return res.status(404)

  return res.json(updatedBlog)
})

router.delete('/:id', async (req, res) => {
  const user = req.user

  const blog = await Blog.findById(req.params.id)
  if (!blog) return res.sendStatus(404)

  if (blog.user.toString() !== user.id.toString())
    return res.status(401).json({ error: 'token invalid' })

  await blog.delete()
  console.log(blog)

  const dbUser = await User.findById(user.id)
  dbUser.blogs = dbUser.blogs.filter((b) => b._id.toString() !== blog._id.toString())
  await dbUser.save()

  res.sendStatus(204)
})

module.exports = router
