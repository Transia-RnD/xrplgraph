import React, { useCallback, useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import Page from '../components/Page';
import Container from '../components/Container';
// import LoginDrawer from "../../../components/Global/LoginDrawer";

// import { EthSigner } from "./components";

import OnboardXumm from '../components/OnboardXumm';
import CrowdsaleDetails from '../components/CrowdsaleDetails';

import useIsMountedRef from '../hooks/useIsMountedRef';
// import useEthereum from "../../../hooks/useEthereum";
// import useIpfs from "../../../hooks/useIpfs";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     minHeight: '100%',
//     paddingTop: theme.spacing(3),
//     paddingBottom: theme.spacing(3)
//   }
// }));

function CrowdsaleView() {
  // const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  // const { contractAddress } = useParams();

  // const tokenId = Boolean(new URLSearchParams(search).get("tokenId")) || null;

  // const [slr721, setSLR721] = useState(null);
  // const [offers, setOffers] = useState([]);
  // const [isSuccess, setIsSuccess] = useState(null);
  // const [isError, setIsError] = useState(null);

  // const parseEvent = (event) => ({
  //   address: event.returnValues.payer,
  //   tokenId: event.returnValues.tokenId,
  //   price: web3.utils.fromWei(`${event.returnValues.price}`, "ether"),
  //   timestamp: event.returnValues.timestamp,
  // });

  // const listenEvents = (contract) => {
  //   contract.events
  //     .Holder({
  //       fromBlock: 0,
  //     })
  //     .on("connected", () => {
  //       console.log("CONNECTED");
  //     })
  //     .on("data", async (event) => {
  //       console.log("DATA");
  //       const r = parseEvent(event);
  //       setOffers((prevOffers) => [...prevOffers, r]);
  //       const c = await getSLR721Contract(
  //         ipfs,
  //         web3,
  //         contractAddress,
  //         r.tokenId
  //       );
  //       setSLR721(c);
  //     })
  //     .on("error", (error) => {
  //       console.log("ERROR");
  //       console.log(error);
  //       setIsError(error.message);
  //     });
  // };

  // const getBlockchainNft = useCallback(async () => {
  //   if (isMountedRef.current) {
  //     try {
  //       const c = await getSLR721ContractInstance(web3, contractAddress);
  //       listenEvents(c);
  //       const contract = await getSLR721Contract(
  //         ipfs,
  //         web3,
  //         contractAddress,
  //         0
  //       );
  //       setSLR721(contract);
  //     } catch (error) {
  //       setIsError(error.message);
  //     }
  //   }
  // }, [isMountedRef]);

  // useEffect(() => {
  //   getBlockchainNft();
  // }, [getBlockchainNft]);

  // // Action
  // const [actionModal, setActionModal] = useState({
  //   open: false,
  //   tx: null,
  // });
  // const [login, setLogin] = useState(false);
  // const handleBuy = async () => {
  //   if (!web3.currentProvider.selectedAddress) {
  //     setLogin(true);
  //     return;
  //   }
  //   try {
  //     const tx = {};
  //     tx.to = slr721.address;
  //     tx.from = web3.currentProvider.selectedAddress;
  //     tx.amount = 1;
  //     tx.value = slr721.currentPrice;
  //     const preparedTx = await prepareSLR721Tx(web3, "buy", tx);
  //     setActionModal({ open: true, tx: preparedTx });
  //   } catch (error) {
  //     setIsError(error.message);
  //   }
  // };

  // const handleSubmit = async () => {
  //   setActionModal({ open: true, tx: null });
  //   setIsSuccess("Successful Purchase");
  //   setIsError(false);
  // };

  // if (!slr721) {
  //   return null;
  // }

  const xls20 = {
    currentId: 0,
    maxSupply: 100,
    currentPrice: 10,
    imageUrl: 'https://ipfs.io/ipfs/bafkreigtjbmwxkbaj4gnesjbq7yzwyat5xgg5wrjusymxvb4ratkdtylci',
    name: 'Name',
    subname: 'Some Sub Name',
    description: 'Some Description',
    owner: 'rAddress',
  }

  return (
    <Page sx={{ 
      minHeight: '100%',
      paddingTop: 3,
      paddingBottom: 3
     }} title="Crowdsale">
      <Container>
        <OnboardXumm />
      </Container>
      <Container>
        <CrowdsaleDetails
          onBuy={() => {}}
          isSuccess={'Success Message'}
          isError={'Fail Message'}
          offers={[]}
          xls20={xls20}
        />
      </Container>
    </Page>
  );
}

export default CrowdsaleView;
