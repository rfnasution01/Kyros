import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'

export function useGetAccountTransactionInternalByBlock() {
  const [data, setData] = useState<string>()
  const [startBlock, setStartBlock] = useState<number>(0)
  const [endBlock, setEndBlock] = useState<number>(99999999)
  const [page, setPage] = useState<number>(1)
  const [offset, setOffset] = useState<number>(10)
  const [sort, setSort] = useState<'asc' | 'desc'>('asc')

  const apiKey = import.meta.env.VITE_BASE_TOKEN

  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account',
    action: 'txlistinternal',
    apikey: apiKey,
    startblock: startBlock,
    endblock: endBlock,
    page: page,
    offset: offset,
    sort: sort,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (getData) {
      setData(getData?.result)
    }
  }, [apiKey, getData, startBlock, endBlock, page, offset, sort])

  return {
    loading,
    apiKey,
    getData,
    data,
    startBlock,
    setStartBlock,
    endBlock,
    setEndBlock,
    page,
    setPage,
    offset,
    setOffset,
    sort,
    setSort,
  }
}
