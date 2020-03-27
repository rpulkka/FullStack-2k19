import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogList from './components/BlogList'
import LoginForm from './forms/LoginForm'
import CreateBlogForm from './forms/CreateBlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [style, setStyle] = useState(null)

  useEffect(() => {
    initBlogs()
  }, [])

  useEffect(() => {
    init()
  }, [])

  const init = () => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }

  const initBlogs = async () => {
    const allBlogs = await blogService.getAll()
    setBlogs(allBlogs.sort((blogA, blogB) => blogB.likes - blogA.likes))
  }

  const Notification = () => {
    if (message === null) {
      return null
    }

    if(style === 'addition') {
      return (
        <div className='addition'>
          {message}
        </div>
      )
    } else if(style === 'update') {
      return (
        <div className='update'>
          {message}
        </div>
      )
    } else {
      return (
        <div className='removal'>
          {message}
        </div>
      )
    }
  }

  const logIn = async (username, password) => {
    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
      blogService.setToken(user.token)
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
    initBlogs()
  }

  const createBlog = async (newBlog) => {
    blogService.setToken(user.token)
    try {
      blogService.create(newBlog)
      const newBlogs = blogs
      newBlogs.push(newBlog)
      console.log(newBlogs)
      setBlogs(newBlogs)
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
  }

  const editBlog = async (blog) => {
    blogService.setToken(user.token)
    try {
      blogService.edit(blog)
      setStyle('addition')
      setMessage('Blog has been edited successfully.')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setStyle('removal')
      setMessage('Error while editing the blog.')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
    initBlogs()
  }

  const removeBlog = async (blog) => {
    blogService.setToken(user.token)
    const confirmation = window.confirm(`Are you sure you want to delete this blog: ${blog.title} by ${blog.author}`)
    if(!confirmation) { return }
    try {
      blogService.remove(blog)
      const index = blogs.findIndex(b => b.id === blog.id)
      const updatedBlogs = blogs
      updatedBlogs.splice(index, 1)
      setBlogs(updatedBlogs)
      setStyle('update')
      setMessage('Blog has been deleted successfully.')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setStyle('removal')
      setMessage('Error while trying to delete the blog.')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
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
          <LoginForm logIn={logIn} />
        </div>
        :
        <div>
          <h1>Blogs</h1>
          <p>User {user.username} is logged in.</p>
          <h2>Create a New Blog</h2>
          <Togglable buttonLabel='Post a New Blog'>
            <CreateBlogForm createBlog={createBlog} user={user} />
          </Togglable>
          <BlogList blogs={blogs} logout={logout} editBlog={editBlog} removeBlog={removeBlog} user={user} />
        </div>
      }
    </div>
  )
}

export default App