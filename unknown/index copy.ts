// https://github.com/dangell7/xrpl-ipfs-apollo-graphql

// xrpl
import { 
  Client, 
  Transaction,
  NFTokenMint, 
  convertHexToString,
  TransactionMetadata, 
  AccountNFTsResponse,
} from 'xrpl';
const xrplApi = new Client(process.env.XRPL_CHAIN_WSS);

// apallo
import { ApolloServer, ApolloError, ValidationError, gql } from 'apollo-server';

// types
import {
  IPFSv1Schema
} from './types/ipfs';
import {
  NFTokenOffer
} from './types/xrpl';

import {
  _g_ipfs,
} from './db/ipfs';
import {
  _g_nftSellOffers,
  _g_nftBuyOffers
} from './db/xrpl';

interface QLNFToken {
  id: string;
  uri: string;
  nft: AccountNFToken;
  ipfs: IPFSv1Schema;
  offers: NFTokenOffer[];
}

interface AccountNFToken {
  Flags: number;
  Issuer: string;
  NFTokenID: string;
  NFTokenTaxon: number;
  URI?: string;
  nft_serial: number;
}

interface TxNFToken {
  Flags: number;
  Account: string;
  NFTokenID: string;
  NFTokenTaxon: number;
  URI?: string;
}

xrplApi.connect();

const resolvers = {
  Query: {
    async account_nfts(_: null, args: { account: string }) {
      try {
        const xrplResponse: AccountNFTsResponse = await xrplApi.request({
          command: 'account_nfts',
          account: args.account,
          ledger_index: 'validated',
          limit: 100,
        })
        const account_nfts = xrplResponse.result.account_nfts as AccountNFToken[] | undefined;
        return account_nfts || new ValidationError('AccountNFTokens not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    // async nft_collection(_: null, args: { id: string }) {
    //   try {
    //     const xrplResponse = await xrplApi.request({
    //       command: 'tx',
    //       transaction: args.id,
    //     })
    //     // console.log(xrplResponse);
    //     var xrplData = xrplResponse.result as NFTokenMint;
    //     const clone = {
    //       ...xrplData,
    //       NFTokenID: "TxNFToken"
    //     } as TxNFToken
    //     console.log(clone);
    //     const ipfsURI = convertHexToString(xrplData.URI);
    //     if (ipfsURI.split('://').at(0) !== 'ipfs' || ipfsURI === 'ipfs://') {
    //       throw new ApolloError('Invalid URI Structure');
    //     }
    //     const cidString = ipfsURI.split('ipfs://').at(-1);
    //     const ipfsResponse = getIPFS(cidString)
    //     const ipfsData = ipfsResponse as unknown as IPFSv1Schema;
    //     const dict = {
    //       id: args.id,
    //       uri: ipfsURI,
    //       nft: clone,
    //       ipfs: ipfsData,
    //     }
    //     console.log(dict);
        
    //     const nfToken = dict as unknown as QLNFToken | undefined;
    //     return nfToken || new ValidationError('NFToken ID not found');
        
    //   } catch (error) {
    //     throw new ApolloError(error);
    //   }
    // },
    async nftoken(_: null, args: { id: string }) {
      try {
        const xrplResponse = await xrplApi.request({
          command: 'tx',
          transaction: args.id,
        })
        // console.log(xrplResponse);
        var xrplData = xrplResponse.result as NFTokenMint;
        const clone = {
          ...xrplData,
          NFTokenID: "TxNFToken"
        } as TxNFToken
        console.log(clone);
        const ipfsURI = convertHexToString(xrplData.URI);
        // console.log(`IPFS URL: ${ipfsURI}`);
        if (ipfsURI.split('://').at(0) !== 'ipfs') {
          throw new ApolloError('Invalid URI Structure');
        }
        const cidString = ipfsURI.split('ipfs://').at(-1);
        const ipfsResponse = getIPFS(cidString)
        const ipfsData = ipfsResponse as unknown as IPFSv1Schema;
        const dict = {
          id: args.id,
          uri: ipfsURI,
          nft: clone,
          ipfs: ipfsData,
        }
        console.log(dict);
        
        const nfToken = dict as unknown as QLNFToken | undefined;
        return nfToken || new ValidationError('NFToken ID not found');
        
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  },
  AccountNFToken: {
    async ipfs(nftoken: AccountNFToken) {
      try {
        return await _g_ipfs(
          nftoken.URI
        ) as IPFSv1Schema || new ValidationError('IPFS not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
    async buy_offers(nftoken: AccountNFToken) {
      try {
        return await _g_nftBuyOffers(
          xrplApi,
          nftoken.Issuer,
          nftoken.NFTokenID
        ) as NFTokenOffer[] || new ValidationError('NFToken Sell Offers not found');
      } catch (error) {
        if (error.message === 'The requested object was not found.') {
          return [];
        }
        throw new ApolloError(error);
      }
    },
    async sell_offers(nftoken: AccountNFToken) {
      try {
        return await _g_nftSellOffers(
          xrplApi,
          nftoken.Issuer,
          nftoken.NFTokenID
        ) as NFTokenOffer[] || new ValidationError('NFToken Sell Offers not found');
      } catch (error) {
        if (error.message === 'The requested object was not found.') {
          return [];
        }
        throw new ApolloError(error);
      }
    }
  }
};

// const cors = require('cors');
// app.use(cors())

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});