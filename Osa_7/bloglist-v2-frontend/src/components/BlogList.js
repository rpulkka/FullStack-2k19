import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const BlogList = () => {

  const blogs = useSelector(state => state.blogs)
  const byLikes = (b1, b2) => b2.likes - b1.likes

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      <Table striped>
        <tbody>
          {blogs.sort(byLikes).map(blog =>
            <tr key={blog.id} style={blogStyle} className='blog'>
              <td><Link to={`/blogs/${blog.id}`} >{blog.title}</Link></td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default BlogList