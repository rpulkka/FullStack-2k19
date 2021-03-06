import React from 'react'
import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (event) => {
    event.preventDefault()
    props.logIn(username, password)
    setUsername('')
    setPassword('')
  }

  return(
    <div>
      <form onSubmit={handleLogin}>
        <div>
          Username
          <input id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password
          <input id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">Log in</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  logIn: PropTypes.func.isRequired,
}

export default LoginForm