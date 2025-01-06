import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'
import { useNetwork } from '@/hooks/useNetwork'
import { getNetwork } from '@/utils/getNetwork'

/**
 * Custom hook to fetch mined blocks or uncle blocks for a specific address.
 *
 * @returns {object} - An object containing the current data, loading state, and various parameters with setter functions.
 */
export function useGetAccountBlockValidatedByAddress() {
  // Fetches the current network information using the custom `useNetwork` hook
  const { network } = useNetwork()

  // Gets the appropriate network URL based on the current network
  const networkUrl = getNetwork(network)

  // State to hold the response data (mined blocks or uncle blocks)
  const [data, setData] = useState<string>()

  // State to hold the contract address (used if querying contract-related data)
  const [contractAddress, setContractAddress] = useState<string>()

  // State to hold the address for which mined blocks are being queried
  const [address, setAddress] = useState<string>()

  // State to determine whether to query for blocks or uncles
  const [blockType, setBlockType] = useState<'blocks' | 'uncles'>('blocks')

  // State to manage the page number for pagination
  const [page, setPage] = useState<number>(1)

  // State to manage the number of records per page (pagination offset)
  const [offset, setOffset] = useState<number>(10)

  // API key fetched from environment variables
  const apiKey = import.meta.env.VITE_BASE_TOKEN

  // Custom query hook to fetch mined blocks or uncle blocks for the specified address
  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account', // The module for account-related data
    action: 'getminedblocks', // The action to fetch mined or uncle blocks for the address
    address: address, // The address for which blocks are being queried
    apikey: apiKey, // The API key for authentication
    page: page, // The current page for pagination
    offset: offset, // The number of records per page (pagination)
    blocktype: blockType, // Specifies whether to fetch blocks or uncles
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
  }, [address, apiKey, getData, page, offset, contractAddress, blockType])

  // Return the relevant data, including loading state, API data, and setter functions for each parameter
  return {
    loading, // Whether the data is still being loaded or fetched
    address, // The address for which the blocks are being queried
    apiKey, // The API key used for authentication
    getData, // The raw data fetched from the API (blocks or uncles)
    data, // The formatted data (mined blocks or uncle blocks)
    setAddress, // Function to set or update the address
    page, // The current page for pagination
    setPage, // Function to set or update the page number
    offset, // The number of records per page for pagination
    setOffset, // Function to set or update the offset
    contractAddress, // The contract address (if querying contract-related data)
    setContractAddress, // Function to set or update the contract address
    blockType, // The type of block being queried (either 'blocks' or 'uncles')
    setBlockType, // Function to set or update the block type
  }
}
