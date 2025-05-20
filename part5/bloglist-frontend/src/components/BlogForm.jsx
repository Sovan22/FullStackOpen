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
    <form onSubmit={addBlog} className='blogForm'>
      <div>
          title
        <input
          data-testid='titleBox'
          type="text"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
          author
        <input
          data-testid='authorBox'
          type="text"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
          url
        <input
          data-testid='urlBox'
          type="text"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type="submit">create</button>
    </form>
  )}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm