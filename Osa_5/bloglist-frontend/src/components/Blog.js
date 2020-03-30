import React from 'react'
import { useState } from 'react'

const Blog = ({ blog, editBlog, removeBlog, user }) => {
  const [visible, setVisible] = useState(false)
  const [text, setText] = useState('Show')

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
    if(text === 'Show') {
      setText('Hide')
    } else {
      setText('Show')
    }
  }

  const handleLike = () => {
    blog.likes++
    editBlog(blog)
  }

  const handleDeletion = () => {
    removeBlog(blog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return(
    <div style={blogStyle}>
      {blog.title} - By: {blog.author} <button onClick={toggleVisibility}>{text}</button>
      <div style={showWhenVisible}>
        <div>{blog.url}</div>
        <div>Likes: {blog.likes} <button onClick={handleLike}>Like</button></div>
        <div>{blog.user.username}</div>
        {
          user.username === blog.user.username &&
          <button onClick={handleDeletion}>Delete</button>
        }
      </div>
    </div>
  )
}

export default Blog
