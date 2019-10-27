import React from 'react'

const Total = ({parts}) => {
    let exercises = parts.map(parts => parts.exercises)
    return (
      <div>
        <p>Number of exercises {exercises.reduce((x, y) => x + y)}</p>
      </div>  
    )
}

export default Total