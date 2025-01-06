import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'
import { useNetwork } from '@/hooks/useNetwork'
import { getNetwork } from '@/utils/getNetwork'

/**
 * Custom hook to get Beacon Chain withdrawal transactions for a specific address.
 *
 * @returns {object} - An object containing the current data, loading state, parameters for the API request, and setter functions.
 */
export function useGetAccountBeaconChainWithDrawalsByAddress() {
  // Fetches the current network information using the custom `useNetwork` hook
  const { network } = useNetwork()

  // Gets the appropriate network URL based on the current network
  const networkUrl = getNetwork(network)

  // State to hold the response data for Beacon Chain withdrawal transactions
  const [data, setData] = useState<string>()

  // State to hold the address for which the withdrawal transactions are being fetched
  const [address, setAddress] = useState<string>()

  // State to hold the start block for filtering transactions (default is block 0)
  const [startBlock, setStartBlock] = useState<number>(0)

  // State to hold the end block for filtering transactions (default is an arbitrarily high block number)
  const [endBlock, setEndBlock] = useState<number>(99999999)

  // State to hold the current page number for pagination
  const [page, setPage] = useState<number>(1)

  // State to hold the number of records per page for pagination
  const [offset, setOffset] = useState<number>(10)

  // State to define the sorting order (ascending or descending) for transactions
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')

  // API key fetched from environment variables
  const apiKey = import.meta.env.VITE_BASE_TOKEN

  // Use the custom query hook to fetch Beacon Chain withdrawal transactions data for the specified parameters
  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account', // The module for account-related data
    action: 'txsBeaconWithdrawal', // The action to fetch Beacon Chain withdrawal transactions
    address: address, // The address for which withdrawal transactions are queried
    apikey: apiKey, // The API key for authentication
    startblock: startBlock, // The start block to filter transactions
    endblock: endBlock, // The end block to filter transactions
    page: page, // The current page for pagination
    offset: offset, // The number of records per page (pagination)
    sort: sort, // The sort order (ascending or descending)
    url: networkUrl, // The network URL based on the current network
  })

  // Combine the loading states (isLoading and isFetching) to indicate when the data is still being fetched
  const loading = isLoading || isFetching

  // Effect hook to update the data state whenever the API response or query parameters change
  useEffect(() => {
    if (getData) {
      // If the API returns data, set it in the local state
      setData(getData?.result)
    }
  }, [apiKey, getData, startBlock, address, endBlock, page, offset, sort])

  // Return the relevant data, including loading state, API data, and setter functions for each parameter
  return {
    loading, // Whether the data is still being loaded or fetched
    apiKey, // The API key used for authentication
    getData, // The raw data fetched from the API (transaction information)
    data, // The formatted transaction data (withdrawals)
    startBlock, // The start block for transaction filtering
    setStartBlock, // Function to set or update the start block
    endBlock, // The end block for transaction filtering
    setEndBlock, // Function to set or update the end block
    page, // The current page for pagination
    setPage, // Function to set or update the page number
    offset, // The number of records per page for pagination
    setOffset, // Function to set or update the offset
    sort, // The sort order (ascending or descending)
    setSort, // Function to set or update the sort order
    address, // The address for which transactions are being queried
    setAddress, // Function to set or update the address
  }
}
