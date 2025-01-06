import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'
import { useNetwork } from '@/hooks/useNetwork'
import { getNetwork } from '@/utils/getNetwork'

/**
 * Custom hook to fetch internal transactions based on a transaction hash (txHash).
 * Internal transactions are transactions that occur within the Ethereum blockchain
 * but are not directly initiated by the user. These can be triggered by smart contracts.
 *
 * @returns {object} - Returns an object with transaction data, loading state,
 * and the transaction hash with its setter function.
 */
export function useGetAccountTransactionInternalByTHash() {
  // Fetch the current network information using the custom `useNetwork` hook
  const { network } = useNetwork()

  // Get the network URL based on the current network
  const networkUrl = getNetwork(network)

  // State to store the raw response data for internal transactions
  const [data, setData] = useState<string>()

  // State to store the transaction hash (txHash) for querying internal transactions
  const [txHash, setTxHash] = useState<string>()

  // API key fetched from environment variables
  const apiKey = import.meta.env.VITE_BASE_TOKEN

  // Custom query hook to fetch internal transactions based on the provided transaction hash
  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account', // The module for account-related data
    action: 'txlistinternal', // The action to fetch internal transactions
    apikey: apiKey, // The API key for authentication
    txhash: txHash, // The transaction hash (txHash) for the query
    url: networkUrl, // The network URL based on the current network
  })

  // Determine if the data is still being loaded or fetched
  const loading = isLoading || isFetching

  // Effect hook to update the state when the API response or transaction hash changes
  useEffect(() => {
    if (getData) {
      // If data is returned from the API, set it in the local state
      setData(getData?.result)
    }
  }, [apiKey, getData, txHash]) // This effect runs when either `txHash` or `getData` changes

  // Return the relevant data, including loading state, API data, and setter functions
  return {
    loading, // Whether the data is still being loaded or fetched
    apiKey, // The API key used for authentication
    getData, // The raw data fetched from the API (internal transactions)
    data, // The formatted data (internal transactions)
    txHash, // The current transaction hash (txHash)
    setTxHash, // Function to set or update the transaction hash
  }
}
