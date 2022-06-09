
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