export interface Collection {
    name: string;
    issuer: string;
    taxon: number;
    family: string;
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