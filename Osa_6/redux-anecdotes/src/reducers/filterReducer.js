const notificationReducer = (state = '', action) => {
  switch(action.type) {
    case 'WRITE':
      return action.text
    default: return state
  }
}

export const writeAction = (text) => {
  return {
    type: 'WRITE',
    text: text
  }
}

export default notificationReducer