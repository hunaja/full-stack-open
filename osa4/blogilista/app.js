const mongoose = require('mongoose')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const config = require('./utils/config.js')

const blogsRouter = require('./controllers/blogs.js')
const usersRouter = require('./controllers/users.js')
const loginRouter = require('./controllers/login.js')

const bearer = require('./utils/bearer.js')
const handleError = require('./utils/error_handler.js')

mongoose.connect(config.MONGODB_URL)

app.use(cors())
app.use(express.json())
app.use(bearer)

app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use(handleError)

module.exports = app
