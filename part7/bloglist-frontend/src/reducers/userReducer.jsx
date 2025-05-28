import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {
  name: null,
  username: null,
  token: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState : null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser(state) {
      return null
    },
  },
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer

export const initializeUser = (username, password) => {
  return async dispatch => {
    const user = await loginService.login({ username, password })
    window.localStorage.setItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
    dispatch(setUser(user))
  }
}