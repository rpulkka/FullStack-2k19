import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Switch, Route, Link, useRouteMatch
} from 'react-router-dom'

import { Button } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import UserList from './components/UserList'
import User from './components/User'
import Login from './components/Login'

import { setBlogs, addBlog } from './reducers/blogReducer'
import { setUser, login, logout } from './reducers/loginReducer'
import { setUsers } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  const users = useSelector(state => state.users)
  const notification = useSelector(state => state.notification)

  const dispatch = useDispatch()

  const blogFormRef = React.createRef()

  useEffect(() => {
    dispatch(setBlogs())
    dispatch(setUsers())
  }, [])

  useEffect(() => {
    dispatch(setUser())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    setUsername('')
    setPassword('')
    dispatch(login(username, password))
  }

  const createBlog = async (blog) => {
    try {
      blogFormRef.current.toggleVisibility()
      dispatch(addBlog(blog))
      dispatch(setNotification(`a new blog '${blog.title}' by ${blog.author} added!`, 'success'))
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  const matchUser = useRouteMatch('/users/:id')
  const userParam = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogParam = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  if (!user) {
    return (
      <Login handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
    )
  }

  return (
    <div className="text-danger">
      <Notification notification={notification} />
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#" as="span">
              <Link to={'/blogs/'}>Blogs </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to={'/users/'}>Users </Link>
            </Nav.Link>
            <p className="text-warning">{user.name} logged in</p> <Button onClick={handleLogout} variant="primary" type="submit">Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Switch>
        <Route path="/blogs/:id">
          <Blog blog={blogParam} />
        </Route>
        <Route path="/users/:id">
          <User user={userParam} />
        </Route>
        <Route path="/blogs">
          <h2>Blogs</h2>
          <Togglable buttonLabel='create new blog' ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          <br /><br />
          <BlogList />
        </Route>
        <Route path="/users">
          <UserList />
        </Route>
      </Switch>
    </div>
  )
}

export default App