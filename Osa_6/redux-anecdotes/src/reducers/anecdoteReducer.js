const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'VOTE':
      const searchedAnecdote = state.find(anecdote => anecdote.id === action.id)
      const updatedAnecdote = {
        ...searchedAnecdote,
        votes: searchedAnecdote.votes + 1
      }
      const newState = state.map(anecdote => anecdote.id !== action.id ? anecdote : updatedAnecdote)
      const sorted = newState.sort((anecdoteA, anecdoteB) => {
        return anecdoteB.votes - anecdoteA.votes
      })
      return sorted
    case 'ADD_ANECDOTE':
      const newAnecdote = {
        content: action.content,
        id: getId(),
        votes: 0
      }
      return [...state, newAnecdote]
    default: return state
  }
}

export const voteAction = (id) => {
  return {
    type: 'VOTE',
    id: id
  }
}

export const addAnecdoteAction = (content) => {
  return {
    type: 'ADD_ANECDOTE',
    content: content
  }
}

export default reducer