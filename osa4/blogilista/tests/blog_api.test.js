const mongoose = require('mongoose')
const supertest = require('supertest')

const Blog = require('../models/blog.js')
const app = require('../app.js')
const api = supertest(app)

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(blogs)
})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body).toHaveLength(blogs.length)
  })
  
  test('blogs are serialized correctly', async () => {
    const response = await api.get('/api/blogs')
    const [firstBlog] = response.body
  
    expect(firstBlog.__v).not.toBeDefined()
    expect(firstBlog._id).not.toBeDefined()
    expect(firstBlog.id).toBeDefined()
    expect(typeof firstBlog.id).toBe('string')
  })

  describe('adding a blog', () => {
    test('a valid blog can be added', async () => {
      const newBlog = {
        title: 'Test blog',
        author: 'awwry',
        url: 'https://google.fi/',
        likes: 100
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
      const response = await api.get('/api/blogs')
      expect(response.body).toHaveLength(blogs.length + 1)
    })
    
    test('likes are set to 0 by default', async () => {
      const newBlog = {
        title: 'Test blog',
        author: 'awwry',
        url: 'https://google.fi/'
      }
    
      const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
       expect(response.body.likes).toBe(0)
    })
    
    test('title and url are required fields', async () => {
      const newBlog = {
        author: 'awwry',
        likes: 10
      }
    
      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
        .expect('Content-Type', /application\/json/)
    })
  })

  test('a blog can be updated', async () => {
    const response = await api.get('/api/blogs')
    const [firstBlog] = response.body
    const id = firstBlog.id
  
    firstBlog.title = 'Testing blog updating'
  
    const updatedBlog = await api
      .put(`/api/blogs/${id}`)
      .send(firstBlog)
      .expect(200)
  
    expect(updatedBlog.body.title).toBe('Testing blog updating')
  })
  
  test('a blog can be deleted', async () => {
    let response = await api.get('/api/blogs')
    const [firstBlog] = response.body
    const id = firstBlog.id
  
    const initialLength = response.body.length
  
    await api
      .delete(`/api/blogs/${id}`)
      .send(firstBlog)
      .expect(204)
  
    response = await api
      .get('/api/blogs')
      .expect(200)
  
    expect(response.body).toHaveLength(initialLength - 1)
  })
})

afterAll(() => mongoose.connection.close())