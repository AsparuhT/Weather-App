import { configureStore } from '@reduxjs/toolkit'
// Import the reducer(s) we have
import weatherDataReducer from './weatherData'

export const store = configureStore({
  reducer: {
    // Add the reducer to the store
    weatherData: weatherDataReducer
  },
})