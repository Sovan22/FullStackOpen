import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogsReducer from './reducers/blogsReducer'
import userReduecer from './reducers/userReducer'


const store = configureStore({
  reducer: {
    blogs: blogsReducer,
    notification: notificationReducer,
    user : userReduecer
  },
})

export default store