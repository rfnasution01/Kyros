import ImgETH from '@/assets/img/eth.png'
import ImgBSC from '@/assets/img/bsc.png'

export type ListNetworkType = {
  label: string
  value: string
  icon: string
  coin: string
}

export const ListNetwork: ListNetworkType[] = [
  {
    icon: ImgETH,
    label: 'Ethereum',
    value: 'eth',
    coin: 'ETH',
  },
  {
    icon: ImgBSC,
    label: 'Binance Smart Chain',
    value: 'bsc',
    coin: 'BNB',
  },
]
