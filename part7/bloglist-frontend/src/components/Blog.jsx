import PropTypes from 'prop-types'
import { useState } from 'react'
import { updateBlogComment } from '../reducers/blogsReducer'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

export const BlogDetails = ({ blog, updateLike, handleDelete, user }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  if (!blog) return null
  const addComment = async (e) => {
    e.preventDefault()
    if (comment === '') {
      dispatch(setNotification({ message: 'You must enter a comment', success: false }, 5))
      return
    }
    await dispatch(updateBlogComment(blog.id, comment))
    setComment('')
  }
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-2">{blog.title} {blog.author}</h1>
      <a href={blog.url} className="text-blue-600 hover:underline mb-4 block">{blog.url}</a>
      <p data-testid="likes" className="flex items-center space-x-2 mb-2">
        <span>{blog.likes} likes</span>
        <button onClick={() => updateLike(blog.id)} className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded">
          Like
        </button>
      </p>
      <p className="text-sm text-gray-600 mb-4">Added by {blog.user.name}</p>
      {user.name === blog.user.name && (
        <button onClick={() => handleDelete(blog.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded mb-4">
          Remove
        </button>
      )}
      <h3 className="text-xl font-semibold mt-6 mb-2">Comments</h3>
      <form onSubmit={addComment} className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="flex-grow px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded">
            Add Comment
          </button>
        </div>
      </form>
      {blog.comments.length > 0 ? (
        <ul className="list-disc pl-5 space-y-1">
          {blog.comments.map(c => (
            <li key={c} className="text-gray-800">{c}</li>
          ))}
        </ul>
      ) : (
        <div className="text-gray-500">No comments found</div>
      )}
    </div>
  )
}

export default BlogDetails