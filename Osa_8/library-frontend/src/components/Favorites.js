import React from 'react'
import { useState, useEffect } from 'react'
import { useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE } from '../queries'

const Favorites = (props) => {
  const [getBooks, books] = useLazyQuery(BOOKS_BY_GENRE)
  const [bookState, setBookState] = useState(null)

  useEffect(() => {
    if(props.me && props.me !== null) {
      getBooks({ variables: { genre: props.me.favoriteGenre} })
    }
  }, [props.me]) // eslint-disable-line

  useEffect(() => {
    if(books.data) {
      setBookState(books.data.allBooks)
    }
  }, [books])

  if (!props.show) {
    return null
  }

  if (!books || bookState === null) {
    return <div>Loading</div>
  }

  return (
    <div>
      <h2>recommendations</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {bookState.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Favorites