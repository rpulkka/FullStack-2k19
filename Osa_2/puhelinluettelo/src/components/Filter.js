import React from 'react'
import DeleteButton from  './DeleteButton'

const Filter = (props) => {
    const filtered = () => {
        let filteredList = []
        props.persons.forEach(function(person) {
          if(person.name.toLowerCase().includes(props.newFilter.toLowerCase())) {
            filteredList = filteredList.concat(person)
          }
        })
        return filteredList
    }

    const rows = () => filtered().map(person => <li key={person.name}>{person.name} {person.number} <DeleteButton Removal={props.Removal} person={person}/></li>)
    return rows()
}

export default Filter