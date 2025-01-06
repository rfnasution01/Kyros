import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'
import { useNetwork } from '@/hooks/useNetwork'
import { getNetwork } from '@/utils/getNetwork'

/**
 * Custom hook to get the balance of a single address on a specific network.
 *
 * @returns {object} - An object containing the loading state, address, tag, API data, and setter functions.
 */
export function useGetBalanceSingleAddress() {
  // Fetches the current network information using the custom `useNetwork` hook
  const { network } = useNetwork()

  // Gets the appropriate network URL based on the current network
  const networkUrl = getNetwork(network)

  // State to hold the balance data for a single address
  const [data, setData] = useState<string>()

  // State to hold the address for which the balance is to be fetched
  const [address, setAddress] = useState<string>()

  // State to hold the tag value that defines which block state to query for (latest, earliest, or pending)
  const [tag, setTag] = useState<'latest' | 'earliest' | 'pending'>('latest')

  // The API key is fetched from environment variables
  const apiKey = import.meta.env.VITE_BASE_TOKEN

  // Use the custom query hook to fetch balance data for a single address from the blockchain API
  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account',
    action: 'balance', // Action to fetch balance for a single address
    address: address, // Provide the address for which balance is being fetched
    tag: tag, // Specify the block state tag (latest, earliest, pending)
    apikey: apiKey, // Provide the API key for authentication
    url: networkUrl, // Specify the network URL based on the current network
  })

  // Combine the loading states from the query hook (both isLoading and isFetching)
  const loading = isLoading || isFetching

  // Effect hook to update the state data whenever the API response or query parameters change
  useEffect(() => {
    if (getData) {
      // If the API returns data, update the local state with the result
      setData(getData?.result)
    }
  }, [address, tag, apiKey, getData]) // Dependencies: address, tag, apiKey, and getData

  // Return the relevant data, including loading state, address, tag, and setter functions
  return {
    loading, // Whether the data is loading or fetching
    address, // The address being queried
    tag, // The block tag (latest, earliest, or pending)
    apiKey, // The API key used for authentication
    getData, // The raw data fetched from the API
    data, // The formatted data (balance)
    setAddress, // Function to set or update the address
    setTag, // Function to set or update the block tag
  }
}
