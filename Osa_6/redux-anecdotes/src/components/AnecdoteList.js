import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { addNotificationAction, removeNotificationAction } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAction(id))
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    addNotification('You voted this anecdote: ' + votedAnecdote.content)
  }

  const addNotification = (notification) => {
    dispatch(addNotificationAction(notification))
    setTimeout(() => {dispatch(removeNotificationAction())}, 5000)
  }

  return (
    <div>
      {anecdotes.map(anecdote =>
        anecdote.content.toLowerCase().includes(filter.toLowerCase())
        ?
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
        :
        <div></div>
      )}
    </div>
  )
}

export default AnecdoteList