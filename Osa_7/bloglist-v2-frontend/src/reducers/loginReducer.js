import loginService from '../services/login'
import storage from '../utils/storage'
import { setNotification } from './notificationReducer'

const loginReducer = (state = [], action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.user
  default: return state
  }
}

export const setUser = () => {
  return async dispatch => {
    const user = storage.loadUser()
    setUser(user)
    dispatch({
      type: 'SET_USER',
      user: user
    })
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })
      dispatch({
        type: 'SET_USER',
        user: user
      })
      dispatch(setNotification(`${user.name} welcome back!`, 'success'))
      storage.saveUser(user)
    } catch(exception) {
      dispatch(setNotification('wrong username/password', 'error'))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_USER',
      user: null
    })
    storage.logoutUser()
  }
}

export default loginReducer