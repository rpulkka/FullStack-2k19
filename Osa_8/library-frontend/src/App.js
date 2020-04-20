import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Favorites from './components/Favorites'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [me, setMe] = useState(null)
  const client = useApolloClient()

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