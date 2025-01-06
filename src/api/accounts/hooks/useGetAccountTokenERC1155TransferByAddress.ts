import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'
import { useNetwork } from '@/hooks/useNetwork'
import { getNetwork } from '@/utils/getNetwork'

/**
 * Custom hook to fetch ERC1155 token transfer transactions for a specific address.
 * ERC1155 is a multi-token standard for NFTs.
 *
 * @returns {object} - An object containing the current data, loading state, and various parameters with setter functions.
 */
export function useGetAccountTokenERC1155TransferByAddress() {
  // Fetch the current network information using the custom `useNetwork` hook
  const { network } = useNetwork()

  // Retrieve the appropriate network URL based on the current network
  const networkUrl = getNetwork(network)

  // State to store the raw response data for ERC1155 token transfer transactions
  const [data, setData] = useState<string>()

  // State to store the contract address for which ERC1155 token transfers are being queried
  const [contractAddress, setContractAddress] = useState<string>()

  // State to store the address for which the token transfer transactions are being queried
  const [address, setAddress] = useState<string>()

  // State to manage the starting block for the transaction query (default is block 0)
  const [startBlock, setStartBlock] = useState<number>(0)

  // State to manage the ending block for the transaction query (default is a very high block number)
  const [endBlock, setEndBlock] = useState<number>(99999999)

  // State to manage pagination, specifically the current page (default is page 1)
  const [page, setPage] = useState<number>(1)

  // State to manage the number of results per page for pagination (default is 10)
  const [offset, setOffset] = useState<number>(10)

  // State to manage the sorting order (ascending or descending)
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')

  // API key fetched from environment variables
  const apiKey = import.meta.env.VITE_BASE_TOKEN

  // Custom query hook to fetch ERC1155 token transfer transactions using the provided parameters
  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account', // The module for account-related data
    action: 'token1155tx', // The action to fetch ERC1155 token transactions
    contractaddress: contractAddress, // The contract address for the ERC1155 token
    address: address, // The address for which token transfers are being queried
    apikey: apiKey, // The API key for authentication
    startblock: startBlock, // The starting block for the query
    endblock: endBlock, // The ending block for the query
    page: page, // The current page for pagination
    offset: offset, // The number of results per page
    sort: sort, // Sorting order (ascending or descending)
    url: networkUrl, // The network URL based on the current network
  })

  // Determine if the data is still loading or being fetched
  const loading = isLoading || isFetching

  // Effect hook to update the state when the API response or any query parameters change
  useEffect(() => {
    if (getData) {
      // If data is returned from the API, set it in the local state
      setData(getData?.result)
    }
  }, [
    address,
    apiKey,
    getData,
    startBlock,
    endBlock,
    page,
    offset,
    sort,
    contractAddress,
  ]) // This effect runs when any of the parameters in the dependency array change

  // Return the relevant data, including loading state, API data, and setter functions for the parameters
  return {
    loading, // Whether the data is still being loaded or fetched
    address, // The address for which the token transfer transactions are being queried
    apiKey, // The API key used for authentication
    getData, // The raw data fetched from the API (ERC1155 token transfer transactions)
    data, // The formatted data (ERC1155 token transfer transactions)
    setAddress, // Function to set or update the address
    startBlock, // The starting block for the transaction query
    setStartBlock, // Function to set or update the start block
    endBlock, // The ending block for the transaction query
    setEndBlock, // Function to set or update the end block
    page, // The current page for pagination
    setPage, // Function to set or update the page
    offset, // The number of results per page for pagination
    setOffset, // Function to set or update the number of results per page
    sort, // The sorting order for the results
    setSort, // Function to set or update the sorting order
    contractAddress, // The contract address for the ERC1155 token
    setContractAddress, // Function to set or update the contract address
  }
}
