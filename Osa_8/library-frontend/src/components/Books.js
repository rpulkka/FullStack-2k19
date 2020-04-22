import React from 'react'
import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { BOOKS_BY_GENRE, ALL_BOOKS } from '../queries'

const Books = (props) => {
  const booksAtStart = useQuery(ALL_BOOKS)
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE)
  const [books, setBooks] = useState(null)
  const [shownBooks, setShownBooks] = useState(null)

  useEffect(() => {
    if(booksAtStart.data) {
      setBooks(booksAtStart.data.allBooks)
      setShownBooks(booksAtStart.data.allBooks)
    }
  }, [booksAtStart.data])

  useEffect(() => {
    if(result.data) {
      setShownBooks(result.data.allBooks)
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>Loading</div>
  }

  if(books === null) {
    return <div>Loading</div>
  }

  let genres = []
  books.forEach((book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre)
      }
    })
  })

  const changeGenre = (genre) => {
    getBooks({ variables: { genre: genre} })
  }

  const reset = () => {
    if(booksAtStart.data) {
      setShownBooks(booksAtStart.data.allBooks)
    }
  }

  let buttons = genres.map(genre => <button key={genre} onClick={() => { changeGenre(genre) }}>{genre}</button>)

  return (
    <div>
      <h2>books</h2>

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
          {shownBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {buttons}
        <button onClick={reset}>All</button>
      </div>
    </div>
  )
}

export default Books