import React from 'react'
import FilterResult from './FilterResult'

const Filter = (props) => {
    const filtered = () => {
        let filteredList = []
        props.countries.forEach(function(country) {
          if(country.name.toLowerCase().includes(props.newFilter.toLowerCase())) {
            filteredList = filteredList.concat(country)
          }
        })
        return filteredList
    }

    const list = filtered()

    const result = <FilterResult list={list} handleButton={props.handleButton}/>

    return result
}

export default Filter