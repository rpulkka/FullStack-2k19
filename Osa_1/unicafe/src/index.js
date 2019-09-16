import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.action}>
    {props.text}
  </button>
)

const Header = props => <h1>{props.header}</h1>

const Statistic = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  let total = (props.good + props.neutral + props.bad)
  let average = (props.good - props.bad) / total
  let positivePercentage = props.good / total * 100

  if (total == 0) {
    return (
      <div>No feedback given</div>
    )
  }

  return (
    <div>
      <Header header={"Statistics"} />
      <table>
        <tbody>
          <Statistic text={"Good "} value={props.good} />
          <Statistic text={"Neutral "} value={props.neutral} />
          <Statistic text={"Bad "} value={props.bad} />
          <Statistic text={"Total "} value={total} />
          <Statistic text={"Average "} value={average} />
          <Statistic text={"Positive "} value={positivePercentage} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const addGood = newGood => {
    setGood(newGood)
  }
  
  const addNeutral = newNeutral => {
    setNeutral(newNeutral)
  }
  
  const addBad = newBad => {
    setBad(newBad)
  }

  return (
    <div>
      <Header header={"Give Feedback"} />
      <Button action={() => addGood(good + 1)} text="Good" />
      <Button action={() => addNeutral(neutral + 1)} text="Neutral" />
      <Button action={() => addBad(bad + 1)} text="Bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)