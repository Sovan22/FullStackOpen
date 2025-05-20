import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Toggleable from './components/Toggleable'
import LoginForm from './components/LoginForm'


const Notification = ({ message,success }) => {
  if (message === '') {
    return null
  }

  return (
    <div className= {success ? 'success' : 'error'}>{message}</div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [success, setSuccess] = useState('')
  const blogFormRef = useRef()


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addLike = async (id) => {
    const blog = blogs.find(b => b.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    const returnedBlog = await blogService.updateLikes(id, updatedBlog)
    // console.log('returnedBlog', returnedBlog)
    setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      console.log('user', user)
      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setSuccess(true)
      setErrorMessage(`Welcome ${user.name}`)
    } catch (exception) {
      setSuccess(false)
      setErrorMessage('Wrong credentials')
    }
    setTimeout(() => {
      setErrorMessage('')
    }, 3000)
  }

  // const handleSubmit = async (event) => {
  //   event.preventDefault()
  //   const blogObject = {
  //     title,author,url
  //   }
  //   try {
  //     const returnedBlog = await blogService.create(blogObject)
  //     setBlogs(blogs.concat(returnedBlog))
  //     setTitle('')
  //     setAuthor('')
  //     setUrl('')
  //     setSuccess(true)
  //     setErrorMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
  //   } catch (exception) {
  //     console.error('Error creating blog')
  //     setSuccess(false)
  //     setErrorMessage('Error creating blog')
  //   }
  //   setTimeout(() => {
  //     setErrorMessage('')
  //   }, 3000)
  // }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    console.log('blogObject', blogObject)
    blogService.create(blogObject)
      .then(returnedBlog => { 
        console.log('returnedBlog', returnedBlog)
        setBlogs(blogs.concat(returnedBlog))
        setSuccess(true)
        setErrorMessage(`A new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      })
      .catch(error => {
        console.error('Error creating blog')
        console.log(error)
        setSuccess(false)
        setErrorMessage('Error creating blog')
      })
    setTimeout(() => {
      setErrorMessage('')
    }, 3000)
  }

  const deleteBlog =  (id) => {
    const blog = blogs.find(b => b.id === id)
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      try {
        blogService.deleteBlog(id)
        setBlogs(blogs.filter(b => b.id !== id))
        setSuccess(true)
        setErrorMessage(`Blog ${blog.title} by ${blog.author} deleted`)
      }
      catch (exception) {
        console.error('Error deleting blog')
        setSuccess(false)
        setErrorMessage('Error deleting blog')
      }
      setTimeout(() => {
        setErrorMessage('')
      }, 3000)
    }
  }



  return (
    user === null ?<>
      <Notification message={errorMessage} success = {success} />
      <LoginForm handleLogin={handleLogin} handlePasswordChange={({ target }) => setPassword(target.value)} handleUsernameChange={({ target }) => setUsername(target.value)} username={username} password={password}/>
    </>:
      <div>
        <Notification message={errorMessage} success = {success} />
        <h1>Blogs</h1>
        <p>{user.name} logged in</p>
        <button onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)
        }}>Log Out</button>
        <h2>create new</h2>
        <Toggleable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm createBlog={addBlog}/>
        </Toggleable>
        {blogs.sort((b1,b2) => b2.likes - b1.likes).map(blog =>
          <Blog key = {blog.id} blog={blog} updateLike ={() => addLike(blog.id)} handleDelete={() => deleteBlog(blog.id)} user={user}/>
        )}
      </div>
  )
}

export default App