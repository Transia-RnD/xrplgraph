
import { 
  Client,
  AccountNFTsResponse,
} from 'xrpl';

import {
  _g_ipfs_cid,
  // _p_ipfs_cid,
} from './ipfs';
import {
  _g_accountNfts
} from './xrpl';

import {
  AccountNFToken
} from '../types/xrpl';

// Get List of NFT's
// Get List of NFT's by TokenTaxon
export const g_xrplGraph_pins = async (
  xrplApi: Client, 
  account: string
) => {
  await xrplApi.connect();
  const nfts = await _g_accountNfts(xrplApi, account) as AccountNFToken[];
  const pinnableCids = nfts.map((n) => _g_ipfs_cid(n.URI)) as string[];
  const cleanCids = pinnableCids.filter((n) => n !== null) as string[];
  console.log(cleanCids);
  
}
