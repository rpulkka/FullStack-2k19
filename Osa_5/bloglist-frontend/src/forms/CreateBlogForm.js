import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateBlogForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [URL, setURL] = useState('')

  const handleCreation = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title,
      author: author,
      url: URL,
      likes: 0,
      user: props.user
    }
    props.createBlog(newBlog)
    setTitle('')
    setAuthor('')
    setURL('')
  }

  return(
    <div>
      <form onSubmit={handleCreation}>
        <div>
          Title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          URL
          <input
            type="text"
            value={URL}
            name="URL"
            onChange={({ target }) => setURL(target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

CreateBlogForm.propTypes = {
  user: PropTypes.object.isRequired,
  createBlog: PropTypes.func.isRequired
}

export default CreateBlogForm