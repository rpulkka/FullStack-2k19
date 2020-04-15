import React from 'react'
import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const result = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const nameParam = name.value
    const setBornTo = parseInt(born)
    editAuthor({ variables: { nameParam, setBornTo } })

    setName('')
    setBorn('')
  }

  if (result.loading) {
    return <div>Loading</div>
  }

  const options = []

  result.data.allAuthors.forEach((author) => {
    options.push({ value: author.name, label: author.name })
  })

  const handleChange = (selectedOption) => {
    setName(selectedOption)
  }
  
  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <br />
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        name
        <Select
          value={name}
          onChange={handleChange}
          options={options}
        />
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
