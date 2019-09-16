import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(10)).map(Number.prototype.valueOf,0))
  const [favorite, setFavorite] = useState(0)

  const randomize = () => {
    const min = 0;
    const max = 5;
    const random = Math.floor(min + Math.random() * (max - min) + 1)
    setSelected(random)
  }

  const vote = () => {
    const copy =  [...votes]
    copy[selected] += 1;
    setVotes(copy);

    if(votes[favorite] <= votes[selected]) {
      setFavorite(selected)
    }
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <p>Has {votes[selected]} votes.</p>
      <Button handleClick={() => randomize()} text="Next Anecdote" />
      <Button handleClick={() => vote()} text="Vote" />
      <h1>Favorite anecdote</h1>
      <p>{props.anecdotes[favorite]}</p>
      <p>Has {votes[favorite]} votes.</p>
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)