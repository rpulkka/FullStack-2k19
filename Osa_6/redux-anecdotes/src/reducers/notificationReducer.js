const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'ADD_NOTIFICATION':
      return action.notification
    case 'REMOVE_NOTIFICATION':
      return ''
    default: return state
  }
}

export const setNotificationAction = (notification, delay) => {
  return async dispatch => {
    //Set a new notification
    dispatch({
      type: 'ADD_NOTIFICATION',
      notification: notification
    })
    //Clear all previous timeouts
    var id = window.setTimeout(function() {}, 0)
    while (id--) {
      window.clearTimeout(id);
    }
    //Set a new timeout for removing the notification
    setTimeout(() => {
      dispatch({
        type: 'REMOVE_NOTIFICATION'
      })
    }, delay)
  }
}

export default notificationReducer