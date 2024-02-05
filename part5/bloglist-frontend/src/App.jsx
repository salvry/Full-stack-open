import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
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

  const addBlog = (event) => {
    event.preventDefault()
    const blog = { title: title, author: author, url: url }

    blogService.newBlog(blog)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNotification(`Added ${blog.title} by ${blog.author}`)
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
    setTitle('')
    setAuthor('')
    setUrl('')
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
          <button onClick={handleLogout}>Log out</button>
          <ul>
            {blogs.map(blog => <li key={blog.id}><Blog key={blog.id} blog={blog} /> </li>)}
          </ul>
          <BlogForm handleSubmit={addBlog} title={title} titleChange={({ target }) => setTitle(target.value)}
            author={author} authorChange={({ target }) => setAuthor(target.value)}
            url={url} urlChange={({ target }) => setUrl(target.value)}
          />
        </div>

      }

    </div>
  )
}


export default App