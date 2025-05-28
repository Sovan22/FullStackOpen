import axios from 'axios'
import { createSlice } from '@reduxjs/toolkit'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
    //   console.log('setBlogs action payload', action.payload)
      return action.payload
    },
    appendBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map(blog => (blog.id === updatedBlog.id ? updatedBlog : blog))
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    }
  }
})

export const { setBlogs, appendBlog, updateBlog, removeBlog } = blogsSlice.actions
export default blogsSlice.reducer

export const initializeBlogs = () => {
  return async dispatch => {
    const response = await axios.get('/api/blogs')
    // console.log('response', response.data)
    dispatch(setBlogs(response.data))
  }
}

export const updateBlogComment = (id, comment) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const updatedBlog = blogs.find(b => b.id === id)
    const updatedBlogWithComment = { ...updatedBlog, comments: [...updatedBlog.comments, comment] }
    try {
      const response = await axios.put(`/api/blogs/${id}`, updatedBlogWithComment)
      dispatch(updateBlog(response.data))
    } catch (error) {
      console.error('Error updating blog comment')
      console.log(error)
    }
  }
}