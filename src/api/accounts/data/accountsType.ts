export type ResAccountBalanceMultipleType = {
  account: string
  balance: string
}

export type PayloadAccountBalanceType = {
  url: string
  module?: string
  action?:
    | 'balance'
    | 'balancemulti'
    | 'txlist'
    | 'txlistinternal'
    | 'tokentx'
    | 'tokennfttx'
    | 'token1155tx'
    | 'getminedblocks'
    | 'txsBeaconWithdrawal'
    | 'balancehistory'
  address?: string
  tag?: 'earliest' | 'pending' | 'latest'
  apikey?: string
  startblock?: number
  endblock?: number
  page?: number
  offset?: number
  sort?: 'asc' | 'desc'
  txhash?: string
  contractaddress?: string
  blocktype?: 'blocks' | 'uncles'
  blockno?: number
}

export type ResAccountTransactionByAddressType = {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: string
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  isError: string
  txreceipt_status: string
  input: string
  contractAddress: string
  cumulativeGasUsed: string
  gasUsed: string
  confirmations: string
  methodId: string
  functionName: string
}

export type ResAccountTransactionInternalByAddressType = {
  blockNumber: string
  timeStamp: string
  hash: string
  from: string
  to: string
  value: string
  contractAddress: string
  input: string
  type: string
  gas: string
  gasUsed: string
  traceId: string
  isError: string
  errCode: string
}

export type ResAccountTransactionInternalByTHashType = {
  blockNumber: string
  timeStamp: string
  from: string
  to: string
  value: string
  contractAddress: string
  input: string
  type: string
  gas: string
  gasUsed: string
  isError: string
  errCode: string
}

export type ResAccountTransactionInternalByBlockType = {
  blockNumber: string
  timeStamp: string
  hash: string
  from: string
  to: string
  value: string
  contractAddress: string
  input: string
  type: string
  gas: string
  gasUsed: string
  traceId: string
  isError: string
  errCode: string
}

export type ResAccountTokenERC20TransferByAddressType = {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  from: string
  contractAddress: string
  to: string
  value: string
  tokenName: string
  tokenSymbol: string
  tokenDecimal: string
  transactionIndex: string
  gas: string
  gasPrice: string
  gasUsed: string
  cumulativeGasUsed: string
  input: string
  confirmations: string
}

export type ResAccountTokenERC721TransferByAddressType = {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  from: string
  contractAddress: string
  to: string
  tokenID: string
  tokenName: string
  tokenSymbol: string
  tokenDecimal: string
  transactionIndex: string
  gas: string
  gasPrice: string
  gasUsed: string
  cumulativeGasUsed: string
  input: string
  confirmations: string
}

export type ResAccountTokenERC1155TransferByAddressType = {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string
  blockHash: string
  transactionIndex: string
  gas: string
  gasPrice: string
  gasUsed: string
  cumulativeGasUsed: string
  input: string
  contractAddress: string
  from: string
  to: string
  tokenID: string
  tokenValue: string
  tokenName: string
  tokenSymbol: string
  confirmations: string
}

export type ResAccountBlocksValidatedByAddressType = {
  blockNumber: string
  timeStamp: string
  blockReward: string
}

export type ResAccountBeaconChainWithdrawalsByAddressType = {
  withdrawalIndex: string
  validatorIndex: string
  address: string
  amount: string
  blockNumber: string
  timestamp: string
}
