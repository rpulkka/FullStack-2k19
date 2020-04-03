import React from 'react'
import { useDispatch } from 'react-redux'
import { addAnecdoteAction } from '../reducers/anecdoteReducer'
import { addNotificationAction, removeNotificationAction } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    dispatch(addAnecdoteAction(content))
    addNotification('Anecdote: ' + content + ' - was created successfully')
  }

  const addNotification = (notification) => {
    dispatch(addNotificationAction(notification))
    setTimeout(() => {dispatch(removeNotificationAction())}, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm