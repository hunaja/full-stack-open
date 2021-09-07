const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')

const User = require('../models/user.js')

const testUtil = require('../utils/test_util')

const app = require('../app.js')
const api = supertest(app)

const allUsers = async () => {
  const response = await api
    .get('/api/users')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  return response.body
}

beforeEach(async () => {
  await User.deleteMany({})

  await testUtil.createUser({
    username: 'taken_username',
    name: 'taken_username',
    password: 'taken_username'
  })
})

describe('when there is initially one user at db', (req, res) => {
  describe('creating users', () => {
    test('with valid data succeeds', async () => {
      const usersBefore = await allUsers()

      const newUser = {
        username: 'obama',
        name: 'Obama',
        password: 'obama'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const usersAfter = await allUsers() 

      expect(usersAfter).toHaveLength(usersBefore.length + 1)
      expect(usersAfter.map((u) => u.username)).toContain(newUser.username)
    })

    test('without username or password fails', async () => {
      const usersBefore = await allUsers()

      const newUser = {
        name: 'test user'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(400)

      const usersAfter = await allUsers()
      expect(usersAfter).toHaveLength(usersBefore.length)
    })

    test('with a taken username fails', async () => {
      const usersBefore = await allUsers()

      const newUser = {
        username: 'taken_username',
        name: 'rootti',
        password: 'admin',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      expect(result.body.error).toContain('to be unique')

      const usersAfter = await allUsers()
      expect(usersAfter).toHaveLength(usersBefore.length)
    })
  })

  
})

afterAll(() => mongoose.connection.close())