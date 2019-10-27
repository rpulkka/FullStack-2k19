import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import FilterForm from './components/FilterForm'
import AdditionForm from './components/AdditionForm'
import personService from './services/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('000000000')
  const [ newFilter, setNewFilter ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ style, setStyle ] = useState(null)

  useEffect(() => {
    axios
      .get('http://localhost:3001/db')
      .then(response => {
        setPersons(response.data.persons)
      })
  }, [])

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    if(style === "addition") {
      return (
        <div className="addition">
          {message}
        </div>
      )
    } else if(style === "update") {
      return (
        <div className="update">
          {message}
        </div>
      )
    } else {
      return (
        <div className="removal">
          {message}
        </div>
      )
    }
  }

  const checkForDuplicateNames = () => {
    let names = persons.map(person => person.name)
    return names.includes(newName)
  }

  const checkForDuplicateNumbers = () => {
    let names = persons.map(person => person.number)
    return names.includes(newNumber)
  }

  const Addition = (event) => {
    event.preventDefault()

    if(checkForDuplicateNames(persons)) {
      let message = `${newName} is already added in the phonebook, replace the old number with a new one?`
      if(window.confirm(message)) {
        let duplicate = persons.find(n => n.name === newName)
        Update(duplicate)
      }
    }

    else if(checkForDuplicateNumbers(persons)){
      let message = `${newNumber} is already added in the phonebook.`
      window.alert(message)
    }

    else{
      const lastId = persons[persons.length-1].id

      const personObject = {
          name: newName,
          number: newNumber,
          id: lastId + 1
      }

      personService
        .create(personObject)
        .then(data => {
          setPersons(persons.concat(data))
          setNewName('')
          setNewNumber('')
        })
      
      setStyle('addition')
      setMessage(
        `'${personObject.name}' was successfully added to the phonebook.`
      )
      setTimeout(() => {          
        setMessage(null)        
      }, 4000)
    }
  }

  const Update = (person) => {
    const changedPerson = { ...person, number: newNumber }
    let failure = false

    personService
      .update(changedPerson)
      .then((returnedPerson) => {
        setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
      })
      .catch(error => {
        setPersons(persons.filter(p => p.id !== person.id))
        setNewName('')
        setNewNumber('')
        setStyle('removal')
        setMessage(
          `${person.name}' was recently removed from the database by another user, so it couldn't be updated.`
        )
        setTimeout(() => {          
          setMessage(null)        
        }, 4000)
        failure = true
      })
    
    if(!failure) {
      setNewName('')
      setNewNumber('')
      setStyle('update')
      setMessage(
        `The number of '${person.name}' was successfully updated.`
      )
      setTimeout(() => {          
        setMessage(null)        
      }, 4000)
    }
  }

  const Removal = (person) => {
    if(window.confirm("Delete " + person.name + "?")) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter(n => n.id !== person.id))
        })
      
      setStyle('removal')
      setMessage(
        `'${person.name}' was successfully deleted from the phonebook.`
      )
      setTimeout(() => {          
        setMessage(null)        
      }, 4000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)  
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)  
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)  
  }

  return (
    <div>
      <Notification message={message} />
      <h2>Phonebook</h2>
        <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Form</h2>
        <AdditionForm handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber} Addition={Addition} />
      <h2>Numbers</h2>
        <div>
          <ul>
            {<Filter persons={persons} newFilter={newFilter} Removal={Removal} />}
          </ul>
        </div>
    </div>
  )

}

export default App