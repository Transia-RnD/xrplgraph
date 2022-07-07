import type { ObjectWithObjectID } from '@algolia/client-search'
import { Maybe } from 'graphql/jsutils/Maybe';
 
// Types for our algolia records (for demonstration only)
 
interface BaseAlgoliaTypes {
	AlgoliaProduct: {
		name: string // String!
		description?: Maybe<string> // String
		bundleSize?: Maybe<number> // Int
		starRating: number // Float!
	}
}
 
export type AlgoliaTypes = {
	[P in keyof BaseAlgoliaTypes]: BaseAlgoliaTypes[P] & ObjectWithObjectID
}