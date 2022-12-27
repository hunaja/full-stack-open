require('express-async-errors')
const express = require('express')

const { connectToDatabase } = require('./util/database')
const config = require('./util/config')
const errorHandler = require('./util/errorHandler')

const sessionController = require('./controllers/session')
const blogsController = require('./controllers/blogs')
const authorsController = require('./controllers/authors')
const usersController = require('./controllers/users')
const readinglistsController = require('./controllers/readinglists')

const app = express()

app.use(express.json())

app.use('/api', sessionController)
app.use('/api/blogs', blogsController)
app.use('/api/authors', authorsController)
app.use('/api/users', usersController)
app.use('/api/readinglists', readinglistsController)

app.use(errorHandler)

const start = async () => {
    await connectToDatabase()
    app.listen(config.port, () => console.log('Listening on port', config.port))
}

start()
