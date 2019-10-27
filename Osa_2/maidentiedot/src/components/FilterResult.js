import React from 'react'
import ShowButton from './ShowButton'
import CountryInformation from './CountryInformation'

const FilterResult = (props) => {
    if(props.list.length <= 10) {
        if(props.list.length === 1) {
            return(
                <CountryInformation list={props.list} />
            )
        } else {
            const rows = () => props.list.map(country => <li key={country.name}>{country.name} <ShowButton handleButton={props.handleButton} country={country}/></li>)
            return(
                <div>
                    <ul>
                        {rows()}
                    </ul>
                </div>
            )
        }
    } else {
        return(
            <div>
                Too many matches, specify another filter.
            </div>
        )
    }
}

export default FilterResult