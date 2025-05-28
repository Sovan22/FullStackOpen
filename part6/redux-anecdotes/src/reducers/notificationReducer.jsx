import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
    name : 'notification',
    initialState: '',
    reducers: {
        setNotification(state, action) {
            return action.payload
        },
        clearNotification() {
            return ''
        }
    },
})

export const { clearNotification} = notificationSlice.actions
export default notificationSlice.reducer


// Action creator to set a notification with a timeout
export const setNotification = (message, timeout = 5) => {
    return async dispatch => {
        dispatch(notificationSlice.actions.setNotification(message))
        setTimeout(() => {
            dispatch(clearNotification())
        }, timeout * 1000)
    }
}