import { api, Res } from '@/store/api'
import {
  PayloadAccountBalanceType,
  ResAccountBalanceMultipleType,
  ResAccountBeaconChainWithdrawalsByAddressType,
  ResAccountBlocksValidatedByAddressType,
  ResAccountTokenERC1155TransferByAddressType,
  ResAccountTokenERC20TransferByAddressType,
  ResAccountTokenERC721TransferByAddressType,
  ResAccountTransactionByAddressType,
  ResAccountTransactionInternalByBlockType,
  ResAccountTransactionInternalByTHashType,
} from './accountsType'

export const AccountEndpoints = api.injectEndpoints({
  endpoints: (builder) => ({
    getAccountBalanceSingleAddress: builder.query<
      Res<string>,
      PayloadAccountBalanceType
    >({
      query: ({ module, action, address, tag, apikey }) => ({
        url: ``,
        method: 'GET',
        params: {
          module: module,
          action: action,
          address: address,
          tag: tag,
          apikey: apikey,
        },
      }),
    }),
    getAccountBalanceMultipleAddress: builder.query<
      Res<ResAccountBalanceMultipleType[]>,
      PayloadAccountBalanceType
    >({
      query: ({ module, action, address, tag, apikey }) => ({
        url: ``,
        method: 'GET',
        params: {
          module: module,
          action: action,
          address: address,
          tag: tag,
          apikey: apikey,
        },
      }),
    }),
    getAccountTransactionNormalByAddress: builder.query<
      Res<ResAccountTransactionByAddressType[]>,
      PayloadAccountBalanceType
    >({
      query: ({
        module,
        action,
        address,
        startblock,
        endblock,
        page,
        offset,
        sort,
        apikey,
      }) => ({
        url: ``,
        method: 'GET',
        params: {
          module: module,
          action: action,
          address: address,
          apikey: apikey,
          startblock: startblock,
          endblock: endblock,
          page: page,
          offset: offset,
          sort: sort,
        },
      }),
    }),
    getAccountTransactionInternalByAddress: builder.query<
      Res<ResAccountTransactionByAddressType[]>,
      PayloadAccountBalanceType
    >({
      query: ({
        module,
        action,
        address,
        startblock,
        endblock,
        page,
        offset,
        sort,
        apikey,
      }) => ({
        url: ``,
        method: 'GET',
        params: {
          module: module,
          action: action,
          address: address,
          apikey: apikey,
          startblock: startblock,
          endblock: endblock,
          page: page,
          offset: offset,
          sort: sort,
        },
      }),
    }),
    getAccountTransactionInternalByTHash: builder.query<
      Res<ResAccountTransactionInternalByTHashType[]>,
      PayloadAccountBalanceType
    >({
      query: ({ module, action, txhash, apikey }) => ({
        url: ``,
        method: 'GET',
        params: {
          module: module,
          action: action,
          apikey: apikey,
          txhash: txhash,
        },
      }),
    }),
    getAccountTransactionInternalByBlock: builder.query<
      Res<ResAccountTransactionInternalByBlockType[]>,
      PayloadAccountBalanceType
    >({
      query: ({
        module,
        action,
        startblock,
        endblock,
        page,
        offset,
        sort,
        apikey,
      }) => ({
        url: ``,
        method: 'GET',
        params: {
          module: module,
          action: action,
          apikey: apikey,
          startblock: startblock,
          endblock: endblock,
          page: page,
          offset: offset,
          sort: sort,
        },
      }),
    }),
    getAccountTokenERC20TransferByAddress: builder.query<
      Res<ResAccountTokenERC20TransferByAddressType[]>,
      PayloadAccountBalanceType
    >({
      query: ({
        module,
        action,
        contractaddress,
        address,
        page,
        offset,
        startblock,
        endblock,
        sort,
        apikey,
      }) => ({
        url: ``,
        method: 'GET',
        params: {
          module: module,
          action: action,
          apikey: apikey,
          startblock: startblock,
          endblock: endblock,
          page: page,
          offset: offset,
          sort: sort,
          contractaddress: contractaddress,
          address: address,
        },
      }),
    }),
    getAccountTokenERC721TransferByAddress: builder.query<
      Res<ResAccountTokenERC721TransferByAddressType[]>,
      PayloadAccountBalanceType
    >({
      query: ({
        module,
        action,
        contractaddress,
        address,
        page,
        offset,
        startblock,
        endblock,
        sort,
        apikey,
      }) => ({
        url: ``,
        method: 'GET',
        params: {
          module: module,
          action: action,
          apikey: apikey,
          startblock: startblock,
          endblock: endblock,
          page: page,
          offset: offset,
          sort: sort,
          contractaddress: contractaddress,
          address: address,
        },
      }),
    }),
    getAccountTokenERC1155TransferByAddress: builder.query<
      Res<ResAccountTokenERC1155TransferByAddressType[]>,
      PayloadAccountBalanceType
    >({
      query: ({
        module,
        action,
        contractaddress,
        address,
        page,
        offset,
        startblock,
        endblock,
        sort,
        apikey,
      }) => ({
        url: ``,
        method: 'GET',
        params: {
          module: module,
          action: action,
          apikey: apikey,
          startblock: startblock,
          endblock: endblock,
          page: page,
          offset: offset,
          sort: sort,
          contractaddress: contractaddress,
          address: address,
        },
      }),
    }),
    getAccountBlockValidatedByAddress: builder.query<
      Res<ResAccountBlocksValidatedByAddressType[]>,
      PayloadAccountBalanceType
    >({
      query: ({
        module,
        action,
        contractaddress,
        address,
        blocktype,
        page,
        offset,
        apikey,
      }) => ({
        url: ``,
        method: 'GET',
        params: {
          module: module,
          action: action,
          apikey: apikey,
          page: page,
          offset: offset,
          blocktype: blocktype,
          contractaddress: contractaddress,
          address: address,
        },
      }),
    }),
    getAccountBeaconChainWithdrawalsByAddress: builder.query<
      Res<ResAccountBeaconChainWithdrawalsByAddressType[]>,
      PayloadAccountBalanceType
    >({
      query: ({
        module,
        action,
        address,
        startblock,
        endblock,
        page,
        offset,
        sort,
        apikey,
      }) => ({
        url: ``,
        method: 'GET',
        params: {
          module: module,
          action: action,
          apikey: apikey,
          page: page,
          offset: offset,
          address: address,
          startblock: startblock,
          endblock: endblock,
          sort: sort,
        },
      }),
    }),
    getAccountHistoricalEtherBalance: builder.query<
      Res<string>,
      PayloadAccountBalanceType
    >({
      query: ({ module, action, address, blockno, apikey }) => ({
        url: ``,
        method: 'GET',
        params: {
          module: module,
          action: action,
          apikey: apikey,
          blockno: blockno,
          address: address,
        },
      }),
    }),
  }),
})

export const {
  useGetAccountBalanceMultipleAddressQuery,
  useGetAccountBalanceSingleAddressQuery,
  useGetAccountTransactionNormalByAddressQuery,
  useGetAccountBeaconChainWithdrawalsByAddressQuery,
  useGetAccountTokenERC1155TransferByAddressQuery,
  useGetAccountBlockValidatedByAddressQuery,
  useGetAccountHistoricalEtherBalanceQuery,
  useGetAccountTokenERC20TransferByAddressQuery,
  useGetAccountTokenERC721TransferByAddressQuery,
  useGetAccountTransactionInternalByAddressQuery,
  useGetAccountTransactionInternalByBlockQuery,
  useGetAccountTransactionInternalByTHashQuery,
} = AccountEndpoints
