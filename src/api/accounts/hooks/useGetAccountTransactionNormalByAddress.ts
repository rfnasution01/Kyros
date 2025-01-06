import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'
import { useNetwork } from '@/hooks/useNetwork'
import { getNetwork } from '@/utils/getNetwork'

/**
 * Custom hook to fetch normal transactions (external transactions) for an address.
 * This includes transactions like token transfers or simple contract interactions
 * initiated by the address. These transactions are not internal, meaning they are
 * directly initiated by the user.
 *
 * @returns {object} - Returns an object with transaction data, loading state,
 * and the address with its setter function along with pagination and sorting controls.
 */
export function useGetAccountTransactionNormalByAdress() {
  // Fetch the current network information using the custom `useNetwork` hook
  const { network } = useNetwork()

  // Get the network URL based on the current network
  const networkUrl = getNetwork(network)

  // State to store the raw response data for normal transactions
  const [data, setData] = useState<string>()

  // State to store the address for querying normal transactions
  const [address, setAddress] = useState<string>()

  // State to store the block range for querying transactions
  const [startBlock, setStartBlock] = useState<number>(0)
  const [endBlock, setEndBlock] = useState<number>(99999999)

  // State for pagination control
  const [page, setPage] = useState<number>(1)
  const [offset, setOffset] = useState<number>(10)

  // State for sorting order ('asc' or 'desc')
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')

  // API key fetched from environment variables
  const apiKey = import.meta.env.VITE_BASE_TOKEN

  // Custom query hook to fetch normal transactions based on the provided address
  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account', // The module for account-related data
    action: 'txlist', // The action to fetch normal transactions
    address: address, // The address for which to fetch transactions
    apikey: apiKey, // The API key for authentication
    startblock: startBlock, // The starting block range
    endblock: endBlock, // The ending block range
    page: page, // The current page for pagination
    offset: offset, // The number of results per page
    sort: sort, // The sorting order ('asc' or 'desc')
    url: networkUrl, // The network URL based on the current network
  })

  // Determine if the data is still being loaded or fetched
  const loading = isLoading || isFetching

  // Effect hook to update the state when the API response or address changes
  useEffect(() => {
    if (getData) {
      // If data is returned from the API, set it in the local state
      setData(getData?.result)
    }
  }, [address, apiKey, getData, startBlock, endBlock, page, offset, sort]) // This effect runs when any relevant state changes

  // Return the relevant data, including loading state, API data, and setter functions
  return {
    loading, // Whether the data is still being loaded or fetched
    address, // The address for which transactions are being fetched
    apiKey, // The API key used for authentication
    getData, // The raw data fetched from the API (normal transactions)
    data, // The formatted data (normal transactions)
    setAddress, // Function to set or update the address
    startBlock, // The starting block range for fetching transactions
    setStartBlock, // Function to set the starting block range
    endBlock, // The ending block range for fetching transactions
    setEndBlock, // Function to set the ending block range
    page, // The current page for pagination
    setPage, // Function to set the current page
    offset, // The number of results per page
    setOffset, // Function to set the number of results per page
    sort, // The sorting order ('asc' or 'desc')
    setSort, // Function to set the sorting order
  }
}
