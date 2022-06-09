import React from "react";
import { render } from "react-dom";
import ReactJson from 'react-json-view';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  port: 4000,
  cache: new InMemoryCache()
});

const GET_ACCOUNT_NFTS = gql`
  query AccountNFToken {
    account_nfts(account: "rMmAbcTBnZXFTwEXG2GiGrcQWDj9p7s25C") {
      Flags
      Issuer
      NFTokenID
      NFTokenTaxon
      URI
      nft_serial
      ipfs {
        schema
        nftType
        name
      }
      buy_offers {
        amount
        nft_offer_index
      }
      sell_offers {
        amount
        nft_offer_index
      }
    }
  }
`;

function AccountNFTokenResults() {
  const { loading, error, data } = useQuery(GET_ACCOUNT_NFTS);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    console.log(error?.networkError?.result?.errors);
    return <p>{error.message}</p>;
  };
  console.log(data.account_nfts);
  

  return (
    <ReactJson
      style={{overflow: 'scroll'}}
      name={false}
      theme="eighties"
      src={data.account_nfts}
    />
  )
}

function App() {
  return (
    <div>
      <h2>🚀 XRPL Graph QL 🚀</h2>
      <AccountNFTokenResults />
    </div>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
