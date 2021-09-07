const _ = require('lodash')

const dummy = () => 1

const totalLikes = (blogs) => blogs.reduce((a, b) => a + b.likes, 0)

const favoriteBlog = (blogs) => 
  blogs.reduce((a, b) => (a.likes > b.likes) ? a : b, {})

const mostBlogs = (blogs) => {
  const authors = _.countBy(blogs, 'author')
  const author = _.maxBy(_.keys(authors), (o) => authors[o])

  return author ? {
    author: author,
    blogs: authors[author]
  } : null
}

const mostLikes = (blogs) => {
  const grouped = _.groupBy(blogs, 'author')
  const authors = _.mapValues(grouped, (x) => totalLikes(x))
  const author = _.maxBy(_.keys(authors), (o) => authors[o])

  return author ? {
    author: author,
    likes: authors[author]
  } : null
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
