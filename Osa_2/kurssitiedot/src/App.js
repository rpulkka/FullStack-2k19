import React from 'react'
import Course from './components/Course'

const App = ({courses}) => {
  const rows = () =>    
    courses.map(course => <li key={course.name}><Course course={course} /></li>)

  return (
    <div>
      <ul>
        {rows()}
      </ul>
    </div>
  )
}

export default App