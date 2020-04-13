import React from 'react'
import { useSelector } from 'react-redux'
import Notification from './Notification'

const Login = (props) => {

  const notification = useSelector(state => state.notification)

  return (
    <div>
      <h2>login to application</h2>

      <Notification notification={notification} />

      <form onSubmit={props.handleLogin}>
        <div>
          username
          <input
            id='username'
            value={props.username}
            onChange={({ target }) => props.setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            id='password'
            value={props.password}
            onChange={({ target }) => props.setPassword(target.value)}
          />
        </div>
        <button id='login'>login</button>
      </form>
    </div>
  )
}

export default Login