const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

const Person = require('./models/person.js')

dotenv.config()
const PORT = process.env.PORT || 3001
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL)
  .then(() => console.log('connected to MongoDB :yum:'))
  .catch((e) => console.log('could not connect to mongo: ', e.message))

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('json', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then((persons) => res.json(persons))
    .catch((e) => next(e))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  if (!body) return res.status(400).json({ error: 'content missing' })

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save()
    .then((p) => p.toJSON())
    .then((p) => res.json(p))
    .catch((e) => next(e))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then((p) => p ? p.toJSON() : res.sendStatus(404))
    .then((p) => res.json(p))
    .catch((e) => next(e))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  if (typeof body.number === 'undefined' || typeof body.name === 'undefined' 
        || typeof body.id == 'undefined') 
    return res.sendStatus(400)

  // apparently the shema validation is not present in findByIdAndUpdate
  if (body.number.length <= 8) 
    return res.status(400).json({ error: 'Number has to be at least 8 chars long.' })

  Person.findByIdAndUpdate(req.params.id, {
    number: body.number
  })
    .then((p) => res.sendStatus(p ? 200 : 404))
    .catch((e) => next(e))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.sendStatus(204))
    .catch((e) => next(e))
})

app.get('/info', (req, res, next) => {
  Person.find({})
    .then((people) => {
      res.write(`<p>Phonebook has ${people.length} people</p>`)
      res.write(`<p>${new Date()}</p>`)
      res.end()
    })
    .catch((e) => next(e))
})

app.use((req, res) => res.status(404).json({
  error: 'Unknown endpoint.'
}))

app.use((error, req, res, next) => {
  console.log(error.message)

  switch (error.name) {
  case 'CastError':
    return res.status(400).json({ error: 'malformatted id' })
  case 'ValidationError':
    return res.status(400).json({ error: error.message })
  }

  next(error)
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}.`))