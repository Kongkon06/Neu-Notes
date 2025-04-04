import { createSlice } from '@reduxjs/toolkit'

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    value: true
  },
  reducers: {
    toogleDarkMode: state => {
      state.value = !state.value
    }
  }
})

// Export actions
export const { toogleDarkMode } = darkModeSlice.actions
export default darkModeSlice.reducer;
