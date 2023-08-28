import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
  isLoading: false,
  warning: null,
  searchResults: null
}

export const weatherData = createSlice({
  // The name of the slice that we will use in our components
  name: 'rootSlice',
  initialState,
  reducers: {
    // The actions goes here
    sendData: (state, action) => {
      state.data = action.payload
    },
    loadingState: (state, action) => {
      state.isLoading = action.payload
    },
    setWarning: (state, action) => {
      state.warning = action.payload
    },
    setSearchResults: (state, action) => {
      state.searchResults = action.payload
    }
  },
})

// Export the actions
export const { sendData, loadingState, setWarning, setSearchResults } = weatherData.actions

export default weatherData.reducer