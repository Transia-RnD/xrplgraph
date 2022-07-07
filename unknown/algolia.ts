// import type { ObjectWithObjectID, SearchOptions, SearchResponse } from '@algolia/client-search'
// import type { RequestOptions } from '@algolia/transporter'
// import type { ApolloClient, DocumentNode } from '@apollo/client'
// import type { SearchClient, SearchIndex } from 'algoliasearch'
// import { Maybe } from 'graphql/jsutils/Maybe'
// import { MaybePromise } from "graphql/jsutils/MaybePromise";
 
// // Narrowly type our indices for intellisense
// export type AlgoliaTypedIndex<TRecord> = Omit<SearchIndex, 'search'> & {
// 	search: (query: string) => Readonly<Promise<SearchResponse<TRecord & ObjectWithObjectID>>>
// }
 
// // Define the schema for configuring the custom mappings
// export interface AlgoliaToGraphQLFieldConfig<
// 	TIndex extends ObjectWithObjectID,
// 	TFragment extends Record<string, any>
// > {
// 	__typename: string
// 	fragment: DocumentNode
// 	fragmentName?: string
// 	id?: (value: TIndex) => string
// 	write: (value: TIndex) => MaybePromise<Maybe<TFragment>>
// }
 
// // Define how the custom mapping will type-translate to narrowly-typed indices
// export interface AlgoliaToGraphQLFields {
// 	[indexName: string]: AlgoliaToGraphQLFieldConfig<any, any>
// }
 
// export type AlgoliaToGraphQLResult<T extends AlgoliaToGraphQLFields> = {
// 	[P in keyof T]: T[P] extends AlgoliaToGraphQLFieldConfig<infer I, any>
// 		? AlgoliaTypedIndex<I>
// 		: never
// }
 
// // Create algolia-indices that will inject xrpl+ipfs data to our `@apollo/client` cache
// const createIndex = async <
// 	TIndex extends ObjectWithObjectID,
// 	TFragment extends Record<string, any>
// >(
// 	algolia: SearchClient,
// 	apollo: ApolloClient<object>,
// 	name: string,
// 	config: AlgoliaToGraphQLFieldConfig<TIndex, TFragment>
// ): Promise<AlgoliaTypedIndex<TIndex>> => {
// 	const {
// 		__typename,
// 		fragment,
// 		fragmentName,
// 		id = (value) => `${__typename}:${value.objectID}`,
// 		write,
// 	} = config
 
// 	const writeFragment = async (value: TIndex): Promise<void> => {
// 		const fragmentData = await write(value)
 
// 		!!fragmentData && apollo.writeFragment<TFragment>({
// 			fragment,
// 			fragmentName,
// 			data: { __typename, ...fragmentData },
// 			id: id(value),
// 		})
// 	}
 
// 	const index = algolia.initIndex(name) as AlgoliaTypedIndex<TIndex>
 
// 	return {
// 		...index,
// 		// Override search to write everything into cache.
// 		async search(query, opts) {
// 			const result = await index.search(query, opts)
 
// 			await Promise.all(result.hits.map(async (hit) => writeFragment(hit)))
 
// 			return result
// 		},
// 	}
// }
 
// // Generate all of the new algolia indices from a config
// export const algoliaToGraphQL = async <T extends AlgoliaToGraphQLFields>(
// 	algolia: SearchClient,
// 	apollo: ApolloClient<object>,
// 	config: T
// ): Promise<AlgoliaToGraphQLResult<T>> => {
// 	const indices = await Promise.all(
// 		Object.entries(config).map(async ([indexName, fieldConfig]) => {
// 			const index = await createIndex(algolia, apollo, indexName, fieldConfig)
 
// 			return [indexName, index] as readonly [string, AlgoliaTypedIndex<any>]
// 		})
// 	)
 
// 	return indices.reduce(
// 		(acc, [indexName, index]) => ({ ...acc, [indexName]: index }),
// 		{} as AlgoliaToGraphQLResult<T>
// 	)
// }