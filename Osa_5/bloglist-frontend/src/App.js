import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './forms/LoginForm'
import CreateBlogForm from './forms/CreateBlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [URL, setURL] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState(null)

  useEffect(() => {
    initBlogs()
  }, [])

  useEffect(() => {
    init()
  }, [])

  const Notification = () => {
    if (message === null) {
      return null
    }
  
    if(style === "addition") {
      return (
        <div className="addition">
          {message}
        </div>
      )
    } else if(style === "update") {
      return (
        <div className="update">
          {message}
        </div>
      )
    } else {
      return (
        <div className="removal">
          {message}
        </div>
      )
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
      setStyle('addition')
      setMessage('Logged in successfully')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setStyle('removal')
      setMessage('Wrong username or password')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleCreation = async (event) => {
    event.preventDefault()
    blogService.setToken(user.token)
    const newBlog = {
      title: title,
      author: author,
      url: URL,
      likes: 0
    }
    try {
      blogService.create(newBlog)
      setStyle('addition')
      setMessage('Blog has been posted to the server successfully.')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setStyle('removal')
      setMessage('Error while posting the blog.')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    setTitle('')
    setAuthor('')
    setURL('')
    setTimeout(() => {
      initBlogs()
    }, 500)
  }

  const init = () => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }

  const initBlogs = async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs)
  }

  const logout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInUser')
    setStyle('addition')
    setMessage('Logged out successfully')
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    init()
  }

  return (
    <div>
      <Notification />
      {user === null ?
        <div>
          <h1>Log in</h1>
          <LoginForm username={username} password={password} setUsername={setUsername} setPassword={setPassword} handleLogin={handleLogin} />
        </div>
        :
        <div>
          <h1>Blogs</h1>
          <p>User {user.username} is logged in.</p>
          <h2>Create a New Blog</h2>
          <CreateBlogForm title={title} author={author} URL={URL} setTitle={setTitle} setAuthor={setAuthor} setURL={setURL} handleCreation={handleCreation} />
          <BlogList blogs={blogs} logout={logout} />
        </div>
      }
    </div>
  )
}

export default App