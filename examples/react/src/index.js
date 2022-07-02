import React, { useState } from "react";
import { render } from "react-dom";
import { styled } from '@mui/material/styles';
import { Alert, Grid, Box, Stack, TextField, Typography } from '@mui/material';
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

const GET_CARBONLAND_ACCOUNT = (account) => gql`
  query CarbonlandCredit {
    carbonland_account(account: "${account}") {
      ecoProject {
        URI
      }
    }
  }
`;
const GET_ACCOUNT_MINTED = (account) => gql`
  query AccountNFToken {
    minted_nfts(account: "${account}") {
      NFTokenID
    }
  }
`;
const GET_ACCOUNT_NFTS = (account, taxon) => gql`
  query AccountNFToken {
    account_nfts(account: "${account}", taxon: ${taxon || 0}) {
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

function AccountNFTokenResults({ account }) {
  const { loading, error, data } = useQuery(GET_ACCOUNT_NFTS(account));

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.log(error);
    console.log(error?.networkError?.result?.errors);
    return <Alert severity="error">{error.message}</Alert>
  };
  return (
    <>
      <Typography gutterBottom>
        Account Owned
      </Typography>
      <ReactJson
        style={{overflow: 'scroll'}}
        name={false}
        theme="eighties"
        src={data.account_nfts}
      />
    </>
  )
}

function AccountMinitedResults({ account }) {
  const { loading, error, data } = useQuery(GET_ACCOUNT_MINTED(account));

  if (loading) return <p>Loading...</p>;
  if (error) {
    return <Alert severity="error">{error.message}</Alert>
  };
  return (
    <>
      <Typography gutterBottom>
        Account Minted
      </Typography>
      <ReactJson
        style={{overflow: 'scroll'}}
        name={false}
        theme="eighties"
        src={data.minted_nfts}
      />
    </>
  )
}

function App() {
  const [value, setValue] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const handleChange = (e) => {
    const {
      value
    } = e.target;
    console.log(value);
    setValue(value);
    setRefresh(false);
  }

  const handleSubmit = () => {
    setRefresh(false);
    setRefresh(true);
  }

  return (
    <Grid p={8} container spacing={1}>
      <Grid item md={2}/>
      <Grid item md={8} >
        <Stack spacing={3}>
          <h2>🚀 XRPL Graph QL 🚀</h2>
          <AppStyle value={value} onChange={handleChange} id="account" label="Address" variant="outlined" />
          <Box>
          <LoadingButton
            size="large"
            variant="contained"
            sx={{
              height: 60,
            }}
            disabled={refresh}
            loading={isSubmitting} 
            onClick={handleSubmit} 
          >
            Run Query
          </LoadingButton>
          </Box>
          {refresh && value && (
            <AccountNFTokenResults account={value} />
          )}
          {refresh && value && (
            <AccountMinitedResults account={value} />
          )}
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
