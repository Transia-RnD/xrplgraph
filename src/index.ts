// https://github.com/dangell7/xrpl-ipfs-apollo-graphql

import * as dotenv from 'dotenv';
// xrpl
import { 
  Client,
} from 'xrpl';
// apollo
import { 
  ApolloServer, 
  ApolloError, 
  ValidationError
} from 'apollo-server';
// types
import {
  XLS20Schema
} from './types/ipfs';
import {
  AccountNFToken,
  NFTokenOffer
} from './types/xrpl';
// db
import {
  _g_ipfs,
} from './db/ipfs';
import {
  _g_accountNfts,
  _g_nftSellOffers,
  _g_nftBuyOffers
} from './db/xrpl';
// type defs
import {
  typeDefs,
} from './typeDefs';

// INIT XRPL
dotenv.config();
const xrplApi = new Client(process.env.XRPL_CHAIN_WSS);
xrplApi.connect();

const resolvers = {
  Query: {
    async account_nfts(_: null, args: { account: string }) {
      try {
        return await _g_accountNfts(
          xrplApi,
          args.account
        ) as AccountNFToken[] || new ValidationError('AccountNFTokens not found');
      } catch (error) {
        throw new ApolloError(error);
      }
    },
  },
  AccountNFToken: {
    async ipfs(nftoken: AccountNFToken) {
      try {
        return await _g_ipfs(
          nftoken.URI
        ) as XLS20Schema || new ValidationError('IPFS not found');
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

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});