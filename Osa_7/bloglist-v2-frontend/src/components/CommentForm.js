import React, { useState } from 'react'
import { commentBlog } from '../reducers/blogReducer'
import { useDispatch } from 'react-redux'

const CommentForm = (props) => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const handleNewComment = (event) => {
    event.preventDefault()

    dispatch(commentBlog(props.blogs, props.id, comment))
    setComment('')
  }

  return (
    <div>
      <form onSubmit={handleNewComment}>
        <div>
          New comment:
          <input
            id='comment'
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
        </div>
        <button id="commentbutton">Add comment</button>
      </form>
    </div>
  )
}

export default CommentForm