// Import necessary functions from '@reduxjs/toolkit' for creating slices and handling actions
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the type for the slice state
// StateNetworkType represents the structure of the Network state with a 'networkName' property as a string
export type StateNetworkType = {
  networkName: string | null // 'networkName' holds the name of the network or null if unset
}

// Define the initial state of the Network slice
// The 'networkName' is initially set to null, indicating no network is selected
const initialState: StateNetworkType = {
  networkName: null,
}

// Create a Redux slice to manage the state of the Network
const stateNetworkSlice = createSlice({
  name: 'Network', // Slice name used for generating actions and referencing in the store
  initialState, // Initial state defined above
  reducers: {
    // Reducer to update the 'networkName' in the state
    setStateNetwork: (state, action: PayloadAction<StateNetworkType>) => {
      const { networkName } = action.payload // Extract 'networkName' from the action payload
      state.networkName = networkName // Update the state with the new 'networkName' value
    },
  },
})

// Export the action created by the slice to be dispatched in components or middleware
export const { setStateNetwork } = stateNetworkSlice.actions

// Selector to retrieve the Network state from the Redux store
export const getNetworkSlice = (state: { stateNetwork: StateNetworkType }) =>
  state.stateNetwork

// Export the reducer to be included in the Redux store setup
export default stateNetworkSlice.reducer
