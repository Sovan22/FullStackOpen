import { createSlice } from '@reduxjs/toolkit'


const initialState = {
  message: '',
  success: false,
}
const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification() {
      return initialState
    }
  },
})

export const { clearNotification } = notificationSlice.actions
export default notificationSlice.reducer
// Action creator to set a notification with a timeout
export const setNotification = (notification, timeout = 5) => {
  return async dispatch => {
    dispatch(notificationSlice.actions.setNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, timeout * 1000)
  }
}