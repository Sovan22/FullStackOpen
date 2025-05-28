import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title, author, url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <form onSubmit={addBlog} className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
        <input
          id="title"
          data-testid="titleBox"
          type="text"
          onChange={({ target }) => setTitle(target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="author" className="block text-gray-700 font-medium mb-2">Author</label>
        <input
          id="author"
          data-testid="authorBox"
          type="text"
          onChange={({ target }) => setAuthor(target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="url" className="block text-gray-700 font-medium mb-2">URL</label>
        <input
          id="url"
          data-testid="urlBox"
          type="text"
          onChange={({ target }) => setUrl(target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
      >
        Create
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm