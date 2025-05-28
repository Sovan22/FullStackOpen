import Toggleable from './Toggleable'
import BlogForm from './BlogForm'
import Blog from './Blog'
import { Link } from 'react-router-dom'

const BlogList = ({ blogs, addBlog, blogFormRef }) => {

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-2xl font-semibold mb-4">Create New Blog</h2>
      <div className="mb-8">
        <Toggleable buttonLabel="New Blog" ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Toggleable>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Blogs</h2>
      <div className="space-y-4">
        {[...blogs].sort((b1,b2) => b2.likes - b1.likes).map(blog => (
          <Link key={blog.id} to={`/blogs/${blog.id}`}>
            <div className="p-4 bg-white rounded-lg shadow hover:bg-gray-50 transition">
              <div className="text-lg font-medium text-gray-800">{blog.title}</div>
              <div className="text-sm text-gray-600">by {blog.author}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default BlogList