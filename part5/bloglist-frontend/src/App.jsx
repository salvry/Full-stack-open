import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
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

  const blogFormRef = useRef()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification('Wrong username or password')
      setTimeout(() => {
        setUsername('')
        setPassword('')
        setNotification('')
      }, 3000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    setUser(null)
    blogService.setToken('')
    window.localStorage.removeItem('loggedUser')
  }

  const addBlog = (blog) => {
    blogService.newBlog(blog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification(`Added ${blog.title} by ${blog.author}`)
        blogFormRef.current.toggleVisibility()
        setTimeout(() => {
          setNotification('')
        }, 3000)
      })

      .catch(exception => {
        setNotification('Error adding new blog. Blog must have title, author and url.')
        setTimeout(() => {
          setNotification('')
        }, 3000)
      })
  }

  const likeBlog = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    const updatedBlog = { ...blog, likes: blog.likes + 1 }
    blogService
      .update(id, updatedBlog).then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        setNotification(
          `Blog '${blog.title}' was already removed from server`
        )
        setTimeout(() => {
          setNotification(null)
        }, 5000)
        setBlogs(blogs.filter(blog => blog.id !== id))
      })
  }

  const removeBlog = (id) => {
    const blog = blogs.find(blog => blog.id === id)
    if (window.confirm(`Delete ${blog.title}?`)) {
      blogService.remove(id)
        .then(() => { setBlogs(blogs.filter(blog => blog.id !== id)) })
      setNotification(
        `Deleted ${blog.title}`
      )
      setTimeout(() => {
        setNotification(null)
      }, 2000)
    }
  }


  return (
    <div>
      {notification && <Notification message={notification} />}
      {!user && <LoginForm username={username} password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />}
      {user &&
        <div>
          <h2>blogs</h2>
          <p>Welcome, {user.username}</p>
          <button id='logout-button' onClick={handleLogout}>Log out</button>
          <Togglable buttonLabel="New blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} />
          </Togglable>
          <ul>
            {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
              <Blog key={blog.id} blog={blog} handleLikeChange={() => likeBlog(blog.id)}
                handleRemove={() => removeBlog(blog.id)} loggedUser={user} />)}
          </ul>
        </div>

      }

    </div>
  )
}


export default App