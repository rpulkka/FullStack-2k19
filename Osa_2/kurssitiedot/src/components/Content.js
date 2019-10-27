import React from 'react'
import Part from './Part'

const Content = ({parts}) => {
  const rows = () =>    
    parts.map(part => <li key={part.id}><Part paragraph={part.name} value={part.exercises} /></li>)

    return (
      <div>
        <ul>
          {rows()}
        </ul>
      </div>
    )
}

export default Content