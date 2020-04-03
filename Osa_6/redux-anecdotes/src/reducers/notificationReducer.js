const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'ADD':
      return action.notification
    case 'REMOVE':
      return ''
    default: return state
  }
}

export const addNotificationAction = (notification) => {
  return {
    type: 'ADD',
    notification: notification
  }
}

export const removeNotificationAction = () => {
  return {
    type: 'REMOVE'
  }
}

export default notificationReducer