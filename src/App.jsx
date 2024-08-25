import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      {setBlogs( blogs )}
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = (blogObject) => {

    blogFormRef.current.toggleVisibility()
    blogService.setToken(user.token)
    
    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog).sort((a,b) => b.likes - a.likes))
        setErrorMessage(
          `a new blog '${returnedBlog.title}' by '${returnedBlog.author}' added!`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const likeBlog = (id, blogObject) => {

    blogService
    .update(id, blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.map( blog => blog.id !== id ? blog : returnedBlog).sort((a,b) => b.likes - a.likes))
    })
    .catch( error => {
      setErrorMessage("Something went wrong")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
   })
  }

  const removeBlog = (id) => {
    
    blogService
    .deleteBlog(id)
    .then(data =>{
      setErrorMessage("Blog was deleted!")
      setBlogs(blogs.filter(obj => obj.id !== id))
    })
    .catch(error => {
      setErrorMessage("Something went wrong")
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    })
  }
  
  const handleLogin = async (username, password) => {

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)

    } catch (exception) {
      setErrorMessage('Wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogOut = (event) => {
    event.preventDefault()
    window.localStorage.clear()
    setUser(null)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <LoginForm handleSubmit={handleLogin}  />
    </div>
    )
  }

  return (
    <div>
      <hr/>
      <i>{user.username} is logged in </i><button onClick={handleLogOut}>Log out</button>
      <hr/>
      <Notification message={errorMessage} />
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      <hr/>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} user={user} blog={blog} updateBlog={likeBlog} deleteBlog={removeBlog} />
      )}
    </div>
  )
}

export default App