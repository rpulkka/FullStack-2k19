const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.remove({})

  for (let blog of helper.listWithManyBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.listWithManyBlogs.length)
})

test('returned blogs have field named id instead of __id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined
})

describe('POST route tests', () => {
  test('valid blogs are added to the database correctly', async () => {
    const newBlog = {
      title: 'Food blog',
      author: 'Gordon Ramsey',
      url: 'http://gordoncooks.nl',
      likes: 42
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const returnedBlogs = await helper.blogsInDatabase()
    expect(returnedBlogs.length).toBe(helper.listWithManyBlogs.length + 1)

    const contents = returnedBlogs.map(b => b.title)
    expect(contents).toContain('Food blog')
  })

  test('blogs with empty likes -field are given 0 likes', async () => {
    const newBlog = {
      title: 'Food blog',
      author: 'Gordon Ramsey',
      url: 'http://gordoncooks.nl'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const returnedBlogs = await helper.blogsInDatabase()
    expect(returnedBlogs[returnedBlogs.length - 1].likes).toBe(0)
  })

  test('blogs with empty title -field are given 400 bad request', async () => {
    const newBlog = {
      author: 'Gordon Ramsey',
      url: 'http://gordoncooks.nl'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const returnedBlogs = await helper.blogsInDatabase()
    expect(returnedBlogs.length).toBe(helper.listWithManyBlogs.length)
  })

  test('blogs with empty url -field are given 400 bad request', async () => {
    const newBlog = {
      title: 'Food Blog',
      author: 'Gordon Ramsey'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const returnedBlogs = await helper.blogsInDatabase()
    expect(returnedBlogs.length).toBe(helper.listWithManyBlogs.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})