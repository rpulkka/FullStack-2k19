import React from 'react'
import Blog from './Blog'

const BlogList = (props) => {
  return(
    <div>
      <h2>Log out</h2>
      <button onClick={props.logout}>Log out</button>
      <h2>Blogs</h2>
      {props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default BlogList