import React, { useState } from "react";
import { render } from "react-dom";
import { styled } from '@mui/material/styles';
import { Alert, Grid, Box, Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
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

// ----------------------------------------------------------------------

const AppStyle = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    height: 49,
    borderRadius: 1,
  },
}));

// ipfs {
//   schema
//   nftType
//   name
// }
// buy_offers {
//   amount
//   nft_offer_index
// }
// sell_offers {
//   amount
//   nft_offer_index
// }

// const GET_CARBONLAND_ACCOUNT = gql`
//   query CarbonlandCredit {
//     carbonland_account(account: "rMmAbcTBnZXFTwEXG2GiGrcQWDj9p7s25C") {
//       ecoProject {
//         URI
//       }
//     }
//   }
// `;
const GET_ACCOUNT_MINTED = gql`
  query AccountNFToken {
    minted_nfts(account: "rsc5vNLRaQHnzRR6N6kgLRW436vACFz6gc") {
      NFTokenID
    }
  }
`;
const GET_ACCOUNT_NFTS = gql`
  query AccountNFToken {
    account_nfts(account: "rMmAbcTBnZXFTwEXG2GiGrcQWDj9p7s25C", taxon: 0) {
      Flags
      Issuer
      NFTokenID
      NFTokenTaxon
      URI
      nft_serial
    }
  }
`;

function AccountNFTokenResults() {
  const { loading, error, data } = useQuery(GET_ACCOUNT_MINTED);

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    console.log(error?.networkError?.result?.errors);
    return <Alert severity="error">{error.message}</Alert>
  };
  // console.log(data.account_nfts);
  console.log(data.minted_nfts);
  return (
    <ReactJson
      style={{overflow: 'scroll'}}
      name={false}
      theme="eighties"
      src={data.minted_nfts}
    />
  )
}

const handleClick = () => {
  console.log("SUBMIT");
}

function App() {
  const [isSubmitting, setSubmitting] = useState(false);
  return (
    <Grid p={8} container spacing={1}>
      <Grid item md={2}/>
      <Grid item md={8} >
        <Stack fullWidth spacing={3}>
          <h2>🚀 XRPL Graph QL 🚀</h2>
          <AppStyle id="account" label="Address" variant="outlined" />
          <Box>
          <LoadingButton
            fullWidth 
            size="large"
            variant="contained"
            sx={{
              height: 60,
            }}
            loading={isSubmitting} 
            onClick={handleClick} 
          >
            Get Account NFTokens
          </LoadingButton>
          </Box>
          <AccountNFTokenResults />
        </Stack>
      </Grid>
      <Grid item md={2}/>
    </Grid>
  );
}

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
