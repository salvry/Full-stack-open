const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('returning all blogs', () => {
  test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})
  test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})
})
describe('adding blogs', () => {
  test('blog has id', async () => {
    const blogs = await helper.blogsInDb()
    expect(blogs[0].id).toBeDefined()
  })

  test('blog is added', async () => {
    const blog = {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    }
      await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)  
    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    const blogTitles = blogs.map(b => b.title)
    expect(blogTitles).toContain('First class tests') 
  })
    test('if undefined, likes are set to 0', async () => {
    const blog = {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        __v: 0
    }
    await api
      .post('/api/blogs')
      .send(blog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

      const blogs = await helper.blogsInDb()
      expect(blogs[blogs.length-1].likes).toBe(0)
  })  
    test('response 400 if title or url is not set', async () => {
    const blog = {
        _id: "5a422b891b54a676234d17fa",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        __v: 0
    }
    await api
    .post('/api/blogs')
    .send(blog)
    .expect(400)

    const blog2 = {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        __v: 0
    }
    await api
    .post('/api/blogs')
    .send(blog2)
    .expect(400)  
  })
})

describe('deleting blogs', () => {
  test('deletes blog by id', async () => {
    const blogs = await helper.blogsInDb()
    const blogToRemove = blogs[0]
    await api
      .delete(`/api/blogs/${blogToRemove.id}`)
      .expect(204)

    const blogsAfterRemovingOne = await helper.blogsInDb()
    expect(blogsAfterRemovingOne.length).toBe(helper.initialBlogs.length-1)
    const blogTitles = blogsAfterRemovingOne.map(b => b.title)
    expect(blogTitles).not.toContain(blogToRemove.title)

  })
})
describe('updating blogs', () => {
    test('blog is updated', async () => {
        const blogs = await helper.blogsInDb()
        const blogToUpdate = blogs[0]
        blogToUpdate.likes += 1

        await api
          .put(`/api/blogs/${blogToUpdate.id}`)
          .send(blogToUpdate)
          .expect(200)
        
        const blogsAfterUpdatingOne = await helper.blogsInDb()
        const updatedBlog = blogsAfterUpdatingOne[0]
        console.log(updatedBlog.likes)
        expect(updatedBlog.likes).toBe(blogToUpdate.likes)
    })
  
  })
afterAll(async () => {
  await mongoose.connection.close()
})