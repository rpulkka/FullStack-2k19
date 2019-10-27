import React from 'react'

const FilterForm = (props) => {
    return (
      <div>
        <input value={props.newFilter} onChange={props.handleFilterChange} />
      </div>
    )
}

export default FilterForm