import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import userService from '../services/users'
import { Link } from 'react-router-dom'

const Users = ({ setUserData }) => {
  const blogs = useSelector(state => state.blogs)
  const [data, setData] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const allUsers = await userService.getAll()

      const groupedBlogs = blogs.reduce((acc, blog) => {
        if (!acc[blog.user.name]) {
          acc[blog.user.name] = { user: blog.user, blogs: [] }
        }
        acc[blog.user.name].blogs.push(blog)
        return acc
      }, {})

      console.log(groupedBlogs)
      const usersArray = Object.values(groupedBlogs).map(item => ({
        user: item.user,
        blogs: item.blogs
      }))

      // add users with no blogs
      const usersWithBlogsSet = new Set(usersArray.map(userData => userData.user.name))
      allUsers.forEach(user => {
        if (!usersWithBlogsSet.has(user.name)) {
          usersArray.push({ user: user, blogs: [] })
        }
      })
      // sort by blogs number
      usersArray.sort((a, b) => b.blogs.length - a.blogs.length)
      setData(usersArray)
      setUserData(usersArray)
    }
    fetchData()
  }, [blogs,setUserData])

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Users</h1>
      <table className="table-auto w-full border-collapse shadow-lg bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blogs Created</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data.map(userData => (
            <tr key={userData.user.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <Link to={`/users/${userData.user.id}`} className="text-blue-600 hover:text-blue-900">
                  {userData.user.name}
                </Link>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{userData.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users