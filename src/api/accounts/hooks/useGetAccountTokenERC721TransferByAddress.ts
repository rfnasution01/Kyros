import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'
import { useNetwork } from '@/hooks/useNetwork'
import { getNetwork } from '@/utils/getNetwork'

/**
 * Custom hook to fetch the ERC721 token (NFT) transfer transactions for a specific address.
 *
 * @returns {object} - An object containing the current data, loading state, and various parameters with setter functions.
 */
export function useGetAccountTokenERC721TransferByAddress() {
  // Fetches the current network information using the custom `useNetwork` hook
  const { network } = useNetwork()

  // Gets the appropriate network URL based on the current network
  const networkUrl = getNetwork(network)

  // State to hold the response data (ERC721 token transfer transactions)
  const [data, setData] = useState<string>()

  // State to hold the contract address for which ERC721 (NFT) transfers are being queried
  const [contractAddress, setContractAddress] = useState<string>()

  // State to hold the address for which the token transfer transactions are being queried
  const [address, setAddress] = useState<string>()

  // State to hold the starting block for the transaction query (default is 0)
  const [startBlock, setStartBlock] = useState<number>(0)

  // State to hold the ending block for the transaction query (default is a very high block number)
  const [endBlock, setEndBlock] = useState<number>(99999999)

  // State to manage the current page for pagination (default is page 1)
  const [page, setPage] = useState<number>(1)

  // State to manage the number of items per page for pagination (default is 10)
  const [offset, setOffset] = useState<number>(10)

  // State to manage the sorting order of the results (ascending or descending)
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')

  // API key fetched from environment variables
  const apiKey = import.meta.env.VITE_BASE_TOKEN

  // Custom query hook to fetch the ERC721 token (NFT) transfer transactions for the specified address and contract address
  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account', // The module for account-related data
    action: 'tokennfttx', // The action to fetch token (NFT) transactions
    contractaddress: contractAddress, // The contract address for the NFT being queried
    address: address, // The address for which the token transfers are being queried
    apikey: apiKey, // The API key for authentication
    startblock: startBlock, // The starting block for the query
    endblock: endBlock, // The ending block for the query
    page: page, // The current page for pagination
    offset: offset, // The number of results per page
    sort: sort, // Sorting order (ascending or descending)
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
  ]) // Dependency array ensures updates when parameters change

  // Return the relevant data, including loading state, API data, and setter functions for each parameter
  return {
    loading, // Whether the data is still being loaded or fetched
    address, // The address for which the token transfer transactions are being queried
    apiKey, // The API key used for authentication
    getData, // The raw data fetched from the API (ERC721 token transfer transactions)
    data, // The formatted data (ERC721 token transfer transactions)
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
    contractAddress, // The contract address for the ERC721 token (NFT)
    setContractAddress, // Function to set or update the contract address
  }
}
