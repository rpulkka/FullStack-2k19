import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import { Redirect } from 'react-router-dom'
import { v4 } from 'uuid'

const Blog = ({ blog }) => {

  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const handleLike = async (id) => {
    dispatch(likeBlog(blogs, id))
  }

  const handleRemove = async (id) => {
    dispatch(removeBlog(blogs, id))
  }

  if (!blog) {
    return <Redirect to="/blogs" />
  }

  const own = user.id === blog.user.id ? true : false

  return (
    <div>
      <h2>{blog.title}</h2>
      <div>{blog.url}</div>
      <div>likes {blog.likes}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </div>
      <div>{blog.user.username}</div>
      {own && <button onClick={() => handleRemove(blog.id)}>remove</button>}
      <CommentForm blogs={blogs} id={blog.id}/>
      <div><br/>Comments:
        {blog.comments.map(comment => <li key={v4()}>{comment}</li>)}
      </div>
    </div>
  )
}

export default Blog