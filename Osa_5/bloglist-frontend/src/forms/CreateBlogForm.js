import React from 'react'

const CreateBlogForm = (props) => {
  return(
    <div>
      <form onSubmit={props.handleCreation}>
        <div>
          Title
          <input 
          type="text"
          value={props.title}
          name="Title"
          onChange={({ target }) => props.setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input 
          type="text"
          value={props.author}
          name="Author"
          onChange={({ target }) => props.setAuthor(target.value)}
          />
        </div>
        <div>
          URL
          <input 
          type="text"
          value={props.URL}
          name="URL"
          onChange={({ target }) => props.setURL(target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateBlogForm