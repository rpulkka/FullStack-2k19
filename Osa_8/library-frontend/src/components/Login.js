import React from 'react'
import { useState, useEffect } from 'react'
import { useMutation, useLazyQuery } from '@apollo/client'
import { LOGIN, FAVORITE_GENRE } from '../queries'

const Login = (props) => {
  const [ username, setUsername ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ login, result ] = useMutation(LOGIN)
  const [ getMe, resultMe ] = useLazyQuery(FAVORITE_GENRE)

  useEffect(() => {
    if ( result.data ) {
      getMe()
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
      props.setPage('authors')
    }
  }, [result.data]) // eslint-disable-line

  useEffect(() => {
    if( resultMe.data ) {
      props.setMe(resultMe.data.me)
    }
  }, [resultMe.data]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  const loginHandler = (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={loginHandler}>
        <div>
          Username
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Log In</button>
      </form>
    </div>
  )
}

export default Login