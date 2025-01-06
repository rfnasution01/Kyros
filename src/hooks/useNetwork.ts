import { getNetworkSlice } from '@/store/reducer/stateNetwork'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

/**
 * Custom hook to manage and synchronize the current network state.
 *
 * This hook retrieves the network name from the following sources, in order of priority:
 * 1. The Redux store (via `getNetworkSlice`).
 * 2. Local storage (`localStorage.getItem('networkName')`).
 * 3. A fallback value defined in environment variables (`VITE_BASE_NETWORK`).
 *
 * It provides a setter function (`setNetwork`) to update the network name, which also updates
 * the local state. This hook ensures that the network name is always up to date across different
 * parts of the application.
 *
 * @returns {object} - An object containing:
 *   - `network`: The current network name (string).
 *   - `setNetwork`: A function to update the network name (function).
 */
export function useNetwork() {
  // Get the current network name from the Redux store state using the `getNetworkSlice` selector
  const stateNetwork = useSelector(getNetworkSlice)?.networkName

  // Retrieve the network name from localStorage, if it exists
  const networkParams = localStorage.getItem('networkName')

  // Fallback network name defined in environment variables
  const baseNetwork = import.meta.env.VITE_BASE_NETWORK

  // Initialize the local network state with the following priority:
  // 1. networkParams (from localStorage)
  // 2. stateNetwork (from Redux store)
  // 3. baseNetwork (from environment variables)
  const [network, setNetwork] = useState<string>(
    networkParams ?? stateNetwork ?? baseNetwork,
  )

  // Sync the local network state with the Redux state whenever it changes
  useEffect(() => {
    if (stateNetwork) {
      // If the Redux state provides a network name, update the local state
      setNetwork(stateNetwork)
    }
  }, [stateNetwork]) // The effect runs when `stateNetwork` changes

  // Return the current network and the setter function
  return {
    network, // Current network name
    setNetwork, // Function to update the network name
  }
}
