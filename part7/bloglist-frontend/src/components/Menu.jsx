import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'
import { useSelector, useDispatch } from 'react-redux'

const Menu = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  return (
    <nav className="bg-gray-100 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-blue-600 hover:text-blue-800 px-3">Blogs</Link>
        <Link to="/users" className="text-blue-600 hover:text-blue-800 px-3">Users</Link>
      </div>
      <div className="flex items-center">
        <span className="text-gray-700 mr-4">{user.name} logged in</span>
        <button
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-3 py-1 rounded"
          onClick={() => {
            window.localStorage.removeItem('loggedBlogappUser')
            dispatch(clearUser())
          }}
        >
          Log Out
        </button>
      </div>
    </nav>
  )
}

export default Menu