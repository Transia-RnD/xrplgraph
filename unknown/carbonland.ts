import { 
  Client,
  AccountNFTsResponse,
} from 'xrpl';
import {
  CarbonlandCredit
} from '../../tmp/carbonlandTypes';
import {
  AccountNFToken
} from '../types/xrpl';

export const _g_carbonlandEco = (
  account_nfts: AccountNFToken[],
) => {
  return account_nfts.filter((a) => a.NFTokenTaxon == 1111)[0] as AccountNFToken | undefined
}

export const _g_carbonlandEcoCRCs = (
  account_nfts: AccountNFToken[],
) => {
  return account_nfts.filter((a) => a.NFTokenTaxon == 2222)[0] as AccountNFToken | undefined
}

export const _g_carbonlandAccount = async (
  xrplApi: Client, 
  account: string
) => {
  console.log('1');
  const xrplResponse: AccountNFTsResponse = await xrplApi.request({
    command: 'account_nfts',
    account: account,
    ledger_index: 'validated',
    limit: 100,
  })
  console.log('1');
  const account_nfts = xrplResponse.result.account_nfts as AccountNFToken[] | undefined;
  console.log('2');
  const ecoProject = _g_carbonlandEco(account_nfts) as AccountNFToken;
  console.log('3');
  const crcCollection = _g_carbonlandEcoCRCs(account_nfts) as AccountNFToken;
  console.log('4');
  console.log(ecoProject);
  console.log(crcCollection);
  
  return {
    ecoProject,
    crcCollection,
  } as CarbonlandCredit
}