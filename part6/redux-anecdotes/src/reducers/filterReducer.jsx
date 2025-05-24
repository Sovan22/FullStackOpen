import {createSlice } from '@reduxjs/toolkit'

// const filterReducer = (state = "", action) => {
//   switch (action.type) {
//     case 'SET_FILTER':
//       return action.payload
//     case 'CLEAR_FILTER':
//       return ""
//     default:
//       return state
//   }
// }

// export const setFilter = (filter) => {
//   return {
//     type: 'SET_FILTER',
//     payload: filter 
//   }
// }
// export const clearFilter = (filter) => {
//   return {
//     type: 'CLEAR_FILTER',
//     payload: filter 
//   }
// }

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      return action.payload
    },
    clearFilter(state, action) {
      return ''
    }
  }
})


export const { setFilter, clearFilter } = filterSlice.actions
export default filterSlice.reducer