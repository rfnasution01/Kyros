import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'

export function useGetAccountBlockValidatedByAddress() {
  const [data, setData] = useState<string>()
  const [contractAddress, setContractAddress] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [blockType, setBlockType] = useState<'blocks' | 'uncles'>('blocks')
  const [page, setPage] = useState<number>(1)
  const [offset, setOffset] = useState<number>(10)

  const apiKey = import.meta.env.VITE_BASE_TOKEN

  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account',
    action: 'getminedblocks',
    address: address,
    apikey: apiKey,
    page: page,
    offset: offset,
    blocktype: blockType,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (getData) {
      setData(getData?.result)
    }
  }, [address, apiKey, getData, page, offset, contractAddress, blockType])

  return {
    loading,
    address,
    apiKey,
    getData,
    data,
    setAddress,
    page,
    setPage,
    offset,
    setOffset,
    contractAddress,
    setContractAddress,
    blockType,
    setBlockType,
  }
}
