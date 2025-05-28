const Blog = require('../models/blogs');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//initialBlogs
const initialBlogs = [
  {
    title: "10 JavaScript Frameworks You Should Learn in 2023",
    author: "John Doe",
    url: "https://example.com/blog/post1",
    likes: 2345
  },
  {
    title: "How to Build a REST API with Node.js",
    author: "Jane Smith",
    url: "https://example.com/blog/post2",
    likes: 1234
  },
  {
    title: "Top 5 Programming Languages for Web Development",
    author: "Mike Johnson",
    url: "https://example.com/blog/post3",
    likes: 5678
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: 'willremovethissoon', url: 'willremovethissoon', likes: 0 })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

// const getUser = async () => {
//   const user = new User({
//     username: 'testuser',
//     name: 'Test User',
//     password: 'password'
//   })
//   await user.save()
//   return user
// }
const getUser = async () => {
  const users = await User.find({});
  return users[0];
}

// const getToken = async (user) => {
//   const token = jwt.sign({ username: user.username, id: user._id }, process.env.SECRET, { expiresIn: '1h' })
//   return token
// }
const getToken = async (user) => {
  if (!user) throw new Error('User not found');
  const token = jwt.sign(
    { username: user.username, id: user._id },
    process.env.SECRET,
    { expiresIn: '1h' }
  );
  return token;
}



module.exports = {
    initialBlogs,
    nonExistingId,
    blogsInDb,
    usersInDb,
    getUser,
    getToken
}