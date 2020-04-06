import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { voteAction } from '../reducers/anecdoteReducer'
import { setNotificationAction } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const dispatch = useDispatch()

  const vote = (id) => {
    const votedAnecdote = anecdotes.find(anecdote => anecdote.id === id)
    dispatch(voteAction(votedAnecdote))
    dispatch(setNotificationAction('You voted this anecdote: ' + votedAnecdote.content, 5000))
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