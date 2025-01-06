import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'

export function useGetBalanceSingleAddress() {
  const [data, setData] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [tag, setTag] = useState<'latest' | 'earliest' | 'pending'>('latest')

  const apiKey = import.meta.env.VITE_BASE_TOKEN

  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account',
    action: 'balance',
    address: address,
    tag: tag,
    apikey: apiKey,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (getData) {
      setData(getData?.result)
    }
  }, [address, tag, apiKey, getData])

  return {
    loading,
    address,
    tag,
    apiKey,
    getData,
    data,
    setAddress,
    setTag,
  }
}
