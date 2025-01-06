import { useEffect, useState } from 'react'
import { useGetAccountBalanceSingleAddressQuery } from '../data'

export function useGetAccountHistoricalEtherBalance() {
  const [data, setData] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [blockNo, setBlockNo] = useState<number>(99999999)

  const apiKey = import.meta.env.VITE_BASE_TOKEN

  const {
    data: getData,
    isLoading,
    isFetching,
  } = useGetAccountBalanceSingleAddressQuery({
    module: 'account',
    action: 'balancehistory',
    address: address,
    apikey: apiKey,
    blockno: blockNo,
  })

  const loading = isLoading || isFetching

  useEffect(() => {
    if (getData) {
      setData(getData?.result)
    }
  }, [apiKey, getData, address, blockNo])

  return {
    loading,
    apiKey,
    getData,
    data,
    address,
    setAddress,
    blockNo,
    setBlockNo,
  }
}
