import React, { ReactNode, useState, useEffect, createContext } from "react";
// apollo
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

// export type XrplGraphContextProps = {
//   graph: ApolloClient<NormalizedCacheObject> | undefined;
//   method: "xrplgraph";
// };

// const initialState: XrplGraphContextProps = {
//   graph: undefined,
//   method: "xrplgraph",
// };

const initialState = {
  graph: undefined,
  method: 'xrplgraph'
};

const XrplGraphContext = createContext(initialState);

export function XrplGraphProvider({ children }) {
  const httpProvider = process.env.WSS_XRPL_CHAIN;

  const [client, setClient] = useState(undefined);

  useEffect(() => {
    // Connect to network
    const connectToNetwork = async () => {
      const client = new ApolloClient({
        uri: "http://localhost:4000",
        // uri: httpProvider,
        cache: new InMemoryCache(),
      });
      setClient(client);
    };
    connectToNetwork();
  }, [httpProvider]);

  if (!client) {
    return null;
  }

  return (
    <XrplGraphContext.Provider
      value={{
        method: "xrplgraph",
        graph: client,
      }}
    >
      <ApolloProvider client={client}>{children}</ApolloProvider>
    </XrplGraphContext.Provider>
  );
}

// type XrplGraphProviderProps = {
//   children: ReactNode;
// };

export const XrpGraphConsumer = XrplGraphContext.Consumer;

export default XrplGraphContext;
