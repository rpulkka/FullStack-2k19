import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import FilterForm from './components/FilterForm'
import axios from 'axios'

const App = () => {
    const [ countries, setCountries] = useState([])     
    const [ newFilter, setNewFilter ] = useState('')

    useEffect(() => {
      axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
          setCountries(response.data)
        })
    }, [])

    const handleFilterChange = (event) => {
      setNewFilter(event.target.value)  
    }

    const handleButton = (value) => {
      setNewFilter(value)
    }

    return(
      <div>
        Find countries: <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
        <Filter countries={countries} newFilter={newFilter} handleButton={handleButton} />
      </div>
    )
}

export default App