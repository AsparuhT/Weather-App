import { createSlice } from '@reduxjs/toolkit'

// Set the initial states
const initialState = {
  data: null, // the weather data
  isLoading: false, // will show is loading sign while the data is fetched
  warning: null, // will hold warning
  searchResults: null // array of the auto-complete search results
}
// The name of the slice that we will use in our components
export const weatherData = createSlice({
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