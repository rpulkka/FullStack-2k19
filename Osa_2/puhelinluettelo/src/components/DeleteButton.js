import React from 'react'

const DeleteButton = (props) => {
    return(
        <div>
            <button type="submit" onClick={() => props.Removal(props.person)}>Remove</button>
        </div>
    )
}

export default DeleteButton