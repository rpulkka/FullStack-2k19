import React from 'react'

const AdditionForm = (props) => {
    return (
        <form onSubmit={props.Addition}>
            <div>
                name: <input value={props.newName} onChange={props.handleNameChange} />
                number: <input value={props.newNumber} onChange={props.handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AdditionForm