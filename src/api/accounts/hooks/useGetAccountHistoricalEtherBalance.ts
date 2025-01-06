import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'
import { useNetwork } from '@/hooks/useNetwork'
import { getNetwork } from '@/utils/getNetwork'

/**
 * Custom hook to fetch the historical ether balance for a specific address at a given block number.
 *
 * @returns {object} - An object containing the current data, loading state, and various parameters with setter functions.
 */
export function useGetAccountHistoricalEtherBalance() {
  // Fetches the current network information using the custom `useNetwork` hook
  const { network } = useNetwork()

  // Gets the appropriate network URL based on the current network
  const networkUrl = getNetwork(network)

  // State to hold the response data (historical ether balance)
  const [data, setData] = useState<string>()

  // State to hold the address for which the historical balance is being queried
  const [address, setAddress] = useState<string>()

  // State to hold the block number to get the ether balance at a specific block in history
  const [blockNo, setBlockNo] = useState<number>(99999999) // Default to the latest block number

  // API key fetched from environment variables
  const apiKey = import.meta.env.VITE_BASE_TOKEN

  // Custom query hook to fetch the historical balance of the address at a specific block number
  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account', // The module for account-related data
    action: 'balancehistory', // The action to fetch historical balance at a specific block
    address: address, // The address for which the historical balance is being queried
    apikey: apiKey, // The API key for authentication
    blockno: blockNo, // The block number at which the historical balance is needed
    url: networkUrl, // The network URL based on the current network
  })

  // Combine the loading states (isLoading and isFetching) to indicate when the data is still being fetched
  const loading = isLoading || isFetching

  // Effect hook to update the state whenever the API response or query parameters change
  useEffect(() => {
    if (getData) {
      // If the API returns data, set it in the local state
      setData(getData?.result)
    }
  }, [apiKey, getData, address, blockNo]) // Dependency array ensures updates when parameters change

  // Return the relevant data, including loading state, API data, and setter functions for each parameter
  return {
    loading, // Whether the data is still being loaded or fetched
    apiKey, // The API key used for authentication
    getData, // The raw data fetched from the API (historical ether balance)
    data, // The formatted data (historical ether balance)
    address, // The address for which the balance is being queried
    setAddress, // Function to set or update the address
    blockNo, // The block number at which the historical balance is queried
    setBlockNo, // Function to set or update the block number
  }
}
