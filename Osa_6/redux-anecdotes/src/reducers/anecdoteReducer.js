import anecdoteService from '../services/anecdoteService'

const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const newState = state.map(anecdote => anecdote.id !== action.data.id ? anecdote : action.data)
      const sorted = newState.sort((anecdoteA, anecdoteB) => {
        return anecdoteB.votes - anecdoteA.votes
      })
      return sorted
    case 'INIT_ANECDOTES':
      const anecdotes = action.data.sort((anecdoteA, anecdoteB) => {
        return anecdoteB.votes - anecdoteA.votes
      })
      return anecdotes
    case 'ADD_ANECDOTE':
      return [...state, action.data]
    default: return state
  }
}

export const voteAction = (anecdote) => {
  return async dispatch => {
    const editedAnecdote = await anecdoteService.edit(anecdote)
    dispatch({
      type: 'VOTE',
      data: editedAnecdote
    })
  }
}

export const initAnecdotesAction = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const addAnecdoteAction = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD_ANECDOTE',
      data: newAnecdote
    })
  }
}

export default anecdoteReducer