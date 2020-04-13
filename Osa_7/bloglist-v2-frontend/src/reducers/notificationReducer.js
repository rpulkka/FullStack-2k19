const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'ADD_NOTIFICATION':
    return action.notification
  case 'REMOVE_NOTIFICATION':
    return null
  default: return state
  }
}

export const setNotification = (notification, type) => {
  return async dispatch => {
    //Set a new notification
    dispatch({
      type: 'ADD_NOTIFICATION',
      notification: {
        message: notification,
        colorType: type
      }
    })
    //Clear all previous timeouts
    var id = window.setTimeout(function() {}, 0)
    while (id--) {
      window.clearTimeout(id)
    }
    //Set a new timeout for removing the notification
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, 5000)
  }
}

export default notificationReducer