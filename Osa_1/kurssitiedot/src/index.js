import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part paragraph={props.paragraph1} value={props.value1} />
      <Part paragraph={props.paragraph2} value={props.value2} />
      <Part paragraph={props.paragraph3} value={props.value3} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>Number of exercises {props.a + props.b + props.c}</p>
    </div>  
  )
}

const Part = (props) => {
  return (
    <div>
      <p>{props.paragraph} {props.value}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content paragraph1={part1} value1={exercises1} paragraph2={part2} value2={exercises2} paragraph3={part3} value3={exercises3} />
      <Total a={exercises1} b={exercises2} c={exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
