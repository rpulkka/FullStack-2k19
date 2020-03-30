const config = require('../utils/config')
const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})
  
blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  let bodyLikes = body.likes
  if(!body.likes) {
    bodyLikes = 0
  }
  if(!body.title || !body.url) {
    response.status(400).end()
  } else {
    try{
      const decodedToken = jwt.verify(request.token, config.SECRET)    
      if (!request.token || !decodedToken.id) {      
        return response.status(401).json({ error: 'token missing or invalid' })    
      }
      const user = await User.findById(decodedToken.id)

      const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: bodyLikes,
        user: user._id
      })
      
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog)
    } catch(error) {
      next(error)
    }
  }
})

blogsRouter.get('/:id', async (request, response, next) => {
  try{
    const blog = await Blog.findById(request.params.id)
    if(blog) {
      console.log(blog)
      response.json(blog)
    } else {
      response.status(404).end()
    }
  } catch(error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  try{
    const body = request.body

    const blog = {
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes
    }

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    response.status(200).json()
  } catch(error) {
    next(error)
  }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try{
    const decodedToken = jwt.verify(request.token, config.SECRET)    
    if (!request.token || !decodedToken.id) {      
      return response.status(401).json({ error: 'token missing or invalid' })    
    }
    const user = await User.findById(decodedToken.id)
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === user._id.toString()) {
      await Blog.findByIdAndDelete(request.params.id)
      response.status(204).end()
    } else {
      response.status(400).send({ error: 'blog cannot be removed by anyone else than its creator' })
    }
  } catch(error) {
    next(error)
  }
})

module.exports = blogsRouter