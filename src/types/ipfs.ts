// {
//   "schema": "URI://UriToXRArt.v0Schema",
//   "nftType": "crc.v1",
//   "name": "Carbonland Trust QmXaL MRVR II",
//   "description": "Carbonland Trust Issuance II",
//   "image": "ipfs://QmQYZve64WtZxW4yRzhfvDdC3hKxzELivgGqRwSemndvR7",
//   "collection": {
//     "name": "Asset QmXaL MRV Record Collection",
//     "issuer": "rMmAbcTBnZXFTwEXG2GiGrcQWDj9p7s25C",
//     "taxon": 0,
//     "family": "carbonland"
//   },
//   "attributes": [],
// }

export interface Collection {
    name: string;
    issuer: string;
    taxon: number;
    family: string;
}

export interface Domain {
    source: string;
    merchant: string;
    network: string;
    accountId: string;
    userId: string;
    type: string;
    id: string;
    version: string;
}

export interface Attribute {
    name: string;
    description?: string;
    value: any;
}

export interface XLS20Schema {
    schema: string;
    nftType: string;
    name: string;
    description: string;
    image: string;
    collection: Collection;
    attributes: Attribute[];
}