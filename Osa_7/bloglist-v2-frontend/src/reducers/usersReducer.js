import userService from '../services/users'

const usersReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_USERS':
    return action.users
  default: return state
  }
}

export const setUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'SET_USERS',
      users: users
    })
  }
}

export default usersReducer