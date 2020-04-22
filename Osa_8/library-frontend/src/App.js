import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Favorites from './components/Favorites'
import { BOOK_ADDED, ALL_BOOKS, BOOKS_BY_GENRE } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [me, setMe] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(p => p.id).includes(object.id)

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    client.writeQuery({
      query: ALL_BOOKS,
      data: { allBooks: dataInStore.allBooks.concat(addedBook) }
    })
    addedBook.genres.forEach((genre) => {
      const dataInStoreLoop = client.readQuery({ query: BOOKS_BY_GENRE, variables: { genre: genre } })
      client.writeQuery({
        query: BOOKS_BY_GENRE, variables: { genre: genre },
        data: { allBooks: dataInStoreLoop.allBooks.concat(addedBook) }
      })
    })
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(subscriptionData.data.bookAdded.title + ' was added')
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token &&
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('favorites')}>recommendations</button>
            <button onClick={() => {
              setToken(null)
              localStorage.clear()
              client.resetStore()
              setPage('authors')
            }}>logout</button>
          </div>
        }
      </div>

      <Authors
        token={token}
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <Login setToken={setToken}
        setPage={setPage}
        setMe={setMe}
        show={page === 'login'}
      />

      <NewBook
        setPage={setPage}
        updateCacheWith={updateCacheWith}
        show={page === 'add'}
      />

      <Favorites
        me={me}
        show={page === 'favorites'}
      />

    </div>
  )
}

export default App