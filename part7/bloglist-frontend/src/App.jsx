import { useState, useEffect, useRef } from 'react'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Menu from './components/Menu'
import Users from './components/Users'
import UserDetails from './components/UserDetails'
import { setNotification } from './reducers/notificationReducer'
import Notification from './components/Notification'
import { useDispatch, useSelector } from 'react-redux'
import { appendBlog, initializeBlogs, removeBlog, updateBlog } from './reducers/blogsReducer'
import { clearUser, initializeUser,setUser } from './reducers/userReducer'
import { Routes, Route, useMatch, Navigate, useNavigate } from 'react-router-dom'
import  BlogDetails  from './components/Blog'

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [userData, setUserData] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(state => state.user)
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //dispatch(setUser(user))
      dispatch(setUser(user))
    }
  }, [])

  const addLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.updateLikes(id, updatedBlog)
    dispatch(updateBlog(returnedBlog))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      await dispatch(initializeUser(username, password))
      setUsername('')
      setPassword('')
      const user = JSON.parse(window.localStorage.getItem('loggedBlogappUser'))
      dispatch(setNotification({ message :`Welcome ${user.name}`,success : true }, 5))
    } catch (exception) {
      console.log(exception)
      dispatch(setNotification({ message : 'Wrong username or password', success : false }, 5))
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('blogObject', blogObject)
    blogService.create(blogObject)
      .then(returnedBlog => {
        console.log('returnedBlog', returnedBlog)
        dispatch(appendBlog(returnedBlog))
        dispatch(setNotification({ message : `A new blog ${returnedBlog.title} by ${returnedBlog.author} added`, success: true }, 5))
      })
      .catch(error => {
        console.error('Error creating blog')
        console.log(error)

        dispatch(setNotification({ message : 'Error creating blog', success : false }, 5))
      })
  }

  const deleteBlog =  (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        blogService.deleteBlog(id)
        dispatch(removeBlog(id))
        navigate('/blogs')
        dispatch(setNotification({ message : `Blog ${blog.title} by ${blog.author} deleted`, success : true }, 5))
      }
      catch (exception) {
        console.error('Error deleting blog')

        dispatch(setNotification({ message : 'Error deleting blog', success : false }, 5))
      }
    }
  }

  const blogById = (id) => blogs.find(b => b.id === id)

  const match = useMatch('/blogs/:id')
  const blog = match ? blogById(String(match.params.id)) : null
  // console.log('blog', blog)
  return (
    user === null ?<>
      <Notification />
      <LoginForm handleLogin={handleLogin} handlePasswordChange={({ target }) => setPassword(target.value)} handleUsernameChange={({ target }) => setUsername(target.value)} username={username} password={password}/>
    </>:
      <div>
        <Notification />
        <Menu/>
        <h1 className="text-2xl font-semibold mb-4">Blogs app</h1>
        <Routes>
          <Route path = '/users' element={<Users setUserData={setUserData} />} />
          <Route path = '/blogs' element={<Navigate to="/" />}/>
          <Route path = '/users/:id' element={<UserDetails users={userData} />} />
          <Route path = '/' element={<BlogList blogs={blogs} addBlog={addBlog} blogFormRef={blogFormRef}/>} />
          <Route path = '/blogs/:id' element={<BlogDetails blog ={blog} updateLike={addLike} handleDelete={deleteBlog} user={user} />}/>
        </Routes>
      </div>
  )
}

export default App