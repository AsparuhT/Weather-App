import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  data: null,
  isLoading: false
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
    // isLoading: (state) => {
    //     state.isLoading = action.payload
    // },
    loadingState: (state, action) => {
        state.isLoading = action.payload
    }
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
  },
})

// Action creators are generated for each case reducer function
export const { sendData, isLoading, loadingState } = weatherData.actions

export default weatherData.reducer