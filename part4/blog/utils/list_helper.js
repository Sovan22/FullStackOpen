const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
}

const mostBlogs = (blogs) => {
  const grouped = _.countBy(blogs, 'author'); // count blogs per author
  console.log(grouped)
  const mostBlogsAuthor = _.maxBy(Object.keys(grouped), (author) => grouped[author])// find author with max count
  console.log(mostBlogsAuthor)
  return { author: mostBlogsAuthor, blogs: grouped[mostBlogsAuthor] }
}

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author'); // group blogs by author  

  const mostLikesAuthor = _.maxBy(Object.keys(grouped), (author) => _.sumBy(grouped[author], 'likes')) // find author with max likes
  const likes = _.sumBy(grouped[mostLikesAuthor], 'likes') // sum likes of the author

  return { author: mostLikesAuthor, likes: likes }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}