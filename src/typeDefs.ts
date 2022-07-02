import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Collection {
    name: String!
    issuer: String!
    taxon: Int!
    family: String!
  }
  type Attribute {
    name: String!
    description: String
    value: String
  }
  type XLS20Schema {
    schema: String!
    nftType: String!
    name: String!
    description: String!
    image: String!
    collection: Collection!
    attributes: [Attribute]!
  }
  type NFTokenOffer {
    amount: Int!
    flags: Int!
    nft_offer_index: String!
    owner: String!
  }
  type AccountNFToken {
    Flags: Int!
    Issuer: String!
    NFTokenID: String!
    NFTokenTaxon: Int!
    URI: String
    nft_serial: Int!
    buy_offers: [NFTokenOffer]!
    sell_offers: [NFTokenOffer]!
    ipfs: XLS20Schema
  }
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }
  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
  type Query {
    minted_nfts(account: String!, taxon: Int): [AccountNFToken]
    account_nfts(account: String!, taxon: Int): [AccountNFToken]
  }
`;