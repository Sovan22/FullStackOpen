const blogsRouter = require('express').Router()
const Blog = require('../models/blogs')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/',middleware.userExtractor,async (request, response) => {
  if(request.body.title === undefined || request.body.url === undefined) {
    return response.status(400).json({ error: 'title or url missing' })
  }
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  //  if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  const user = request.user
  // console.log(user)
  if(!user) {
    return response.status(400).json({ error: 'user not found' })
  }

  const blog = new Blog({
    ...request.body,
    user: user._id
  })
  // const blog = new Blog(request.body)
  
  const result = await blog.save()
  user.blogs = user.blogs.concat(result._id)
  await user.save()
  response.status(201).json(result)
})

blogsRouter.delete('/:id', middleware.userExtractor,async (request, response) => {
  const { id } = request.params
  // const decodedToken = jwt.verify(request.token, process.env.SECRET)
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' })
  // }
  const user = request.user
  if (!user) {
    return response.status(400).json({ error: 'user not found' })
  }

  const blog = await Blog.findById(id)
  if (!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  if (blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete the blog' })
  }
  await Blog.findByIdAndDelete(id)
  user.blogs = user.blogs.filter(b => b.toString() !== id)
  await user.save()
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { id } = request.params
  const updatedBlog = await Blog.findByIdAndUpdate(id, request.body, { new: true })
  if (!updatedBlog) {
    return response.status(404).json({ error: 'blog not found' })
  }
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter