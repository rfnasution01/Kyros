import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'

export function useGetAccountTransactionInternalByTHash() {
  const [data, setData] = useState<string>()
  const [txHash, setTxHash] = useState<string>()

  const apiKey = import.meta.env.VITE_BASE_TOKEN

  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account',
    action: 'txlistinternal',
    apikey: apiKey,
    txhash: txHash,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (getData) {
      setData(getData?.result)
    }
  }, [apiKey, getData, txHash])

  return {
    loading,
    apiKey,
    getData,
    data,
    txHash,
    setTxHash,
  }
}
