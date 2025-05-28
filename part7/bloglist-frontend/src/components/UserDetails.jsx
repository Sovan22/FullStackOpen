import { useParams } from 'react-router-dom'

const UserDetails = ({ users }) => {
  const { id } = useParams()
  if(!users || users.length === 0) return null
  const userData = users.find(u => u.user.id === id)

  if (!userData) return <div>User not found</div>

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">{userData.user.name}</h2>
      <h3 className="text-xl font-semibold mb-2">Blogs Created</h3>
      <ul className="list-disc pl-5 space-y-1">
        {userData.blogs.map(blog => (
          <li key={blog.id} className="text-gray-800">{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default UserDetails
