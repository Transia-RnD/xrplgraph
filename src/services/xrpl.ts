
import { 
  Client,
  AccountNFTsResponse,
  NFTBuyOffersResponse,
  NFTSellOffersResponse,
} from 'xrpl';

import {
  NFTokenOffer,
  AccountNFToken
} from '../types/xrpl';
import {
  q_bigquery_tt
} from './bigquery';

export interface AccountNFTFilter {
  taxon: number | undefined
}

export const _g_accountNfts = async (
  xrplApi: Client, 
  account: string,
  filter?: AccountNFTFilter
) => {
  const xrplResponse: AccountNFTsResponse = await xrplApi.request({
    command: 'account_nfts',
    account: account,
    ledger_index: 'validated',
    limit: 100,
  })
  const account_nfts = xrplResponse.result.account_nfts as AccountNFToken[] | undefined;
  if (filter?.taxon)
      return account_nfts.filter((a) => a.NFTokenTaxon == filter.taxon)
  return account_nfts;
}

export const _g_mintedNfts = async (
  xrplApi: Client, 
  account: string,
  filter?: AccountNFTFilter
) => {
  const minted_nfts: AccountNFToken[] = await q_bigquery_tt(
    account,
    "NFTokenMint",
    10
  )
  if (filter?.taxon)
      return minted_nfts.filter((a) => a.NFTokenTaxon == filter.taxon)
  return minted_nfts;
}

export const _g_nftBuyOffers = async (
  xrplApi: Client,
  issuer: string,
  nft_id: string,
) => {
  console.log('FETCHING BUY OFFERS');
  const xrplResponse: NFTBuyOffersResponse = await xrplApi.request({
    command: 'nft_buy_offers',
    account: issuer,
    nft_id: nft_id,
    ledger_index: 'validated',
    limit: 100,
  });
  
  const buyOffers = xrplResponse.result.offers as unknown as NFTokenOffer[] | undefined;
  console.log(`BUY OFFERS ${buyOffers.length}`);
  return buyOffers;
}

export const _g_nftSellOffers = async (
  xrplApi: Client,
  issuer: string,
  nft_id: string,
) => {
  console.log('FETCHING SELL OFFERS');
  const xrplResponse: NFTSellOffersResponse = await xrplApi.request({
    command: 'nft_sell_offers',
    account: issuer,
    nft_id: nft_id,
    ledger_index: 'validated',
    limit: 100,
  });
  const sellOffers = xrplResponse.result.offers as unknown as NFTokenOffer[] | undefined;
  console.log(`SELL OFFERS ${sellOffers.length}`);
  return sellOffers;
}