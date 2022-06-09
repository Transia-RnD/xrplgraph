// {
//     "id": 0,
//     "result": {
//       "Account": "rMmAbcTBnZXFTwEXG2GiGrcQWDj9p7s25C",
//       "Fee": "10",
//       "Flags": 9,
//       "LastLedgerSequence": 2383444,
//       "NFTokenTaxon": 0,
//       "Sequence": 2383274,
//       "SigningPubKey": "EDD2140A90C2F6375DD31CC3827106C4E493B953F2262D835D319B8082047EE73D",
//       "TransactionType": "NFTokenMint",
//       "TransferFee": 0,
//       "TxnSignature": "4B36FB8FF7D21707B5143D5FB4281DEFD1C5BE48187085EBEFC461559CD54E484BC80383BC3C7C18DAC2DBDE49F4FF89FDD538E046950DF77E78B23776C60105",
//       "URI": "697066733A2F2F516D614374444B5A4656767666756676626479346573745A626851483744586831364354707631686F776D424779",
//       "date": 706671102,
//       "hash": "9446F256FCA6A5DEE44A679EB70FF15EB671D4A2ABAED66C0FC0817DD386D486",
//       "inLedger": 2383426,
//       "ledger_index": 2383426,
//       "meta": {
//           "AffectedNodes":[
//               {
//                   "ModifiedNode":{
//                       "FinalFields":{
//                           "Account":"rMmAbcTBnZXFTwEXG2GiGrcQWDj9p7s25C","Balance":"999999980","Flags":0,"MintedNFTokens":2,"OwnerCount":1,"Sequence":2383275},"LedgerEntryType":"AccountRoot","LedgerIndex":"D2A650E94DB886C4F67DA2B45DB1FCEA09E56812D4385A7753A3C315E634F355","PreviousFields":{"Balance":"999999990","MintedNFTokens":1,"Sequence":2383274},"PreviousTxnID":"72C40C6DE1ECC164B6EB2F73DE465F804A1262BD2157712B9450FFB5597EDE40","PreviousTxnLgrSeq":2383368}},{"ModifiedNode":{"FinalFields":{"Flags":0,"NFTokens":[{"NFToken":{"NFTokenID":"00090000E3E2649FB84DFB055036605B49DE305618BA72970000099B00000000","URI":"697066733A2F2F516D615A73545269666970547237764C5177666257575948645034344474487079426D757931793842315A584B37"}},{"NFToken":{"NFTokenID":"00090000E3E2649FB84DFB055036605B49DE305618BA729716E5DA9C00000001","URI":"697066733A2F2F516D614374444B5A4656767666756676626479346573745A626851483744586831364354707631686F776D424779"}}]},"LedgerEntryType":"NFTokenPage","LedgerIndex":"E3E2649FB84DFB055036605B49DE305618BA7297FFFFFFFFFFFFFFFFFFFFFFFF","PreviousFields":{"NFTokens":[{"NFToken":{"NFTokenID":"00090000E3E2649FB84DFB055036605B49DE305618BA72970000099B00000000","URI":"697066733A2F2F516D615A73545269666970547237764C5177666257575948645034344474487079426D757931793842315A584B37"}}]},"PreviousTxnID":"72C40C6DE1ECC164B6EB2F73DE465F804A1262BD2157712B9450FFB5597EDE40","PreviousTxnLgrSeq":2383368}}],"TransactionIndex":0,"TransactionResult":"tesSUCCESS"
//       },
//       "validated": true
//     },
//     "type": "response"
//   }
  

export interface NFTokenData {
    NFTokenID: string;
    URI: string;
}

export interface NFToken {
    NFToken: NFTokenData;
}

export interface FinalFields {
    Account: string;
    Balance: string;
    Flags: number;
    MintedNFTokens: number;
    OwnerCount: number;
    Sequence: number;
    NFTokens: NFToken[];
}


export interface PreviousFields {
    Balance: string;
    MintedNFTokens: number;
    Sequence: number;
    NFTokens: NFToken[];
}

export interface ModifiedNode {
    FinalFields: FinalFields;
    LedgerEntryType: string;
    LedgerIndex: string;
    PreviousFields: PreviousFields;
    PreviousTxnID: string;
    PreviousTxnLgrSeq: number;
}

export interface AffectedNode {
    ModifiedNode: ModifiedNode;
}

export interface Meta {
    AffectedNodes: AffectedNode[];
    TransactionIndex: number;
    TransactionResult: string;
}

export interface XrplResult {
    Account: string;
    Fee: string;
    Flags: number;
    LastLedgerSequence: number;
    NFTokenTaxon: number;
    Sequence: number;
    SigningPubKey: string;
    TransactionType: string;
    TransferFee: number;
    TxnSignature: string;
    URI: string;
    date: number;
    hash: string;
    inLedger: number;
    ledger_index: number;
    meta: Meta;
    validated: boolean;
}

export interface NFTokenOffer {
    amount: number;
    flags: number;
    nft_offer_index: string;
    owner: number;
}

export interface AccountNFToken {
    Flags: number;
    Issuer: string;
    NFTokenID: string;
    NFTokenTaxon: number;
    URI?: string;
    nft_serial: number;
  }