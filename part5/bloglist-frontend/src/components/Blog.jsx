import Toggleable from './Toggleable'
import PropTypes from 'prop-types'

const BlogDetails = ({ blog , updateLike ,handleDelete, user }) => (
  <div className="blogDetails">
    <p>{blog.url}</p>
    <p data-testid = 'likes'>{blog.likes} likes<button onClick={updateLike}>like</button></p>
    <p>added by {blog.user.name}</p>
    {user.name === blog.user.name ? <button onClick = {handleDelete}>remove</button> : null}
  </div>
)

const Blog = ({ blog, updateLike, handleDelete, user }) => (
  <div className="blog" data-testid = 'title'>
    {blog.title} {blog.author}
    <Toggleable buttonLabel='view'>
      <BlogDetails blog={blog} updateLike={updateLike} handleDelete={handleDelete} user = {user}/>
    </Toggleable>
  </div>

)

Blog.PropTypes = {
  blog: PropTypes.object.isRequired,
  updateLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
//export both components
export default Blog