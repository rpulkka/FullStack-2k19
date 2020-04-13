import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'

const UserList = () => {

  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <Table striped>
        <tbody>
          <tr>
            <td><h3>User</h3></td>
            <td><h3># of blogs</h3></td>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td><Link to={`/users/${user.id}`} >{user.username}</Link></td>
              <td>{user.blogs.length}</td>
            </tr>)}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList