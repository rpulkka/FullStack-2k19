import React from 'react'
import { connect } from 'react-redux'
import { addAnecdoteAction } from '../reducers/anecdoteReducer'
import { setNotificationAction } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.content.value
    event.target.content.value = ''
    props.addAnecdoteAction(content)
    props.setNotificationAction('Anecdote: ' + content + ' - was created successfully', 5000)
  }

  return (
    <div>
      <h2>Create New</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name='content' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  addAnecdoteAction,
  setNotificationAction
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm