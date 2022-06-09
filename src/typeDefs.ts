import { gql } from 'apollo-server';

export const typeDefs = gql`
  type NFTokenData {
    NFTokenID: String!
    URI: String!
  }
  type NFToken {
    NFToken: NFTokenData!
  }
  type FinalFields {
    Account: String!
    Balance: Int!
    Flags: Int!
    MintedNFTokens: Int!
    OwnerCount: Int!
    Sequence: Int!
    NFTokens: [NFToken]!
  }
  type PreviousFields {
    Balance: String!
    MintedNFTokens: Int!
    Sequence: Int!
    NFTokens: [NFToken]!
  }
  type ModifiedNode {
    FinalFields: FinalFields!
    LedgerEntryType: String!
    LedgerIndex: String!
    PreviousFields: PreviousFields!
    PreviousTxnID: String!
    PreviousTxnLgrSeq: Int!
  }
  type AffectedNode {
    ModifiedNode: ModifiedNode!
  }
  type Meta {
    AffectedNodes: [AffectedNode]!
    TransactionIndex: Int!
    TransactionResult: String!
  }
  type XrplResult {
    Account: String!
    Fee: String!
    Flags: Int!
    LastLedgerSequence: Int!
    NFTokenTaxon: Int!
    Sequence: Int!
    SigningPubKey: String!
    TransactionType: String!
    TransferFee: Int!
    TxnSignature: String!
    URI: String!
    date: Int!
    hash: String!
    inLedger: Int!
    ledger_index: Int!
    meta: Meta
    validated: Boolean!
  }
  type Collection {
    name: String!
    issuer: String!
    taxon: Int!
    family: String!
  }
  type Domain {
    source: String!
    merchant: String!
    network: String!
    accountId: String!
    userId: String!
    type: String!
    id: String!
    version: String!
  }
  type MRVRecord {
    name: String!
    type: String!
  }
  type Types {
    MRVRecord: [MRVRecord]!
  }
  type Message {
    assetCId: String!
    recordId: String!
    tons: Int!
    issuer: String!
    issuerTag: Int!
    recordedType: String!
    recordedTime: Int!
  }
  type Data {
    domain: Domain!
    types: Types!
    message: Message!
  }
  type IPFSv1Schema {
    schema: String!
    nftType: String!
    name: String!
    description: String!
    image: String!
    collection: Collection!
    attributes: String!
    address: String!
    sig: String!
    data: Data!
  }
  type TxNFToken {
    Flags: Int!
    Account: String!
    NFTokenID: String!
    NFTokenTaxon: Int!
    URI: String
  }
  type NFTokenOffer {
    amount: Int!
    flags: Int!
    nft_offer_index: String!
    owner: String!
  }
  type QLNFToken {
    id: String!
    uri: String!
    nft: TxNFToken
    ipfs: IPFSv1Schema
    offers: [NFTokenOffer]
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
    ipfs: IPFSv1Schema
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
    nftoken(id: String!): QLNFToken
    account_nfts(account: String!): [AccountNFToken]
  }
`;