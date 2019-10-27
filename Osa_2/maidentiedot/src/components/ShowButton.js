import React from 'react'

const ShowButton = (props) => {
    return(
        <div>
            <button type="submit" onClick={() => props.handleButton(props.country.name)}>Show</button>
        </div>
    )
}

export default ShowButton