import React from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Box,
  Card,
  CardMedia,
  Typography,
  Button,
  // SvgIcon,
  Alert,
} from "@mui/material";

// import ShoppingCartIcon from "@mui/icons/ShoppingCart";
import Offers from './Offers';

// const useStyles = makeStyles((theme) => ({
//   root: {},
//   smallBox: {
//     height: 75,
//     width: 75,
//   },
//   symbol: {
//     // height: '100%',
//     marginRight: -20,
//     transform: "rotate(-90deg) translateX(-100%)",
//   },
//   media: {
//     height: 75,
//     backgroundColor: theme.palette.background.dark,
//   },
//   largeMedia: {
//     margin: "auto",
//     height: 300,
//     width: "100%",
//   },
//   image: {
//     height: "100%",
//   },
//   actionIcon: {
//     marginRight: theme.spacing(1),
//   },
// }));

const BoxArray = ({ price, editions, forSale }) => (
  <Box display="flex">
    <Box m={2} style={{ textAlign: "center" }} display="block">
      <Typography
        style={{ fontSize: 14, fontWeight: 400 }}
        color="textSecondary"
      >
        Floor price
      </Typography>
      <Typography style={{ fontSize: 20, fontWeight: 700 }} color="primary">
        {`${price}`}
      </Typography>
    </Box>
    <Box m={2} style={{ textAlign: "center" }} display="block">
      <Typography
        style={{ fontSize: 14, fontWeight: 400 }}
        color="textSecondary"
      >
        Total Editions
      </Typography>
      <Typography style={{ fontSize: 20, fontWeight: 700 }} color="primary">
        {editions}
      </Typography>
    </Box>
    <Box m={2} style={{ textAlign: "center" }} display="block">
      <Typography
        style={{ fontSize: 14, fontWeight: 400 }}
        color="textSecondary"
      >
        Total For Sale
      </Typography>
      <Typography style={{ fontSize: 20, fontWeight: 700 }} color="primary">
        {forSale}
      </Typography>
    </Box>
  </Box>
);

BoxArray.propTypes = {
  price: PropTypes.string.isRequired,
  editions: PropTypes.string.isRequired,
  forSale: PropTypes.string.isRequired,
};

function CrowdsaleDetails({
  className,
  onBuy,
  isSuccess,
  isError,
  offers,
  xls20,
  ...rest
}) {

  return (
    <Grid
      container
      spacing={3}
      {...rest}
    >
      <Grid item lg={6} xs={12}>
        <Grid container spacing={3}>
          <Box direction="column">
            <Typography
              sx={{
                marginRight: -20,
                transform: "rotate(-90deg) translateX(-100%)",
              }}
              color="primary">
              {`# ${parseInt(xls20.currentId, 10) + 1} / ${xls20.maxSupply}`}
            </Typography>
          </Box>
          <Grid item md={10} xs={12} display="block">
            <Box
              component={Card}
              width={1}
              height={1}
              display="flex"
              flexDirection="column"
            >
              <CardMedia
                image={xls20.imageUrl}
                sx={{
                  position: "relative",
                  height: { xs: 240, sm: 340, md: 400 },
                  overflow: "hidden",
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Box>
              <Box>
                <Typography
                  style={{ marginTop: 5, fontSize: 14, fontWeight: 500 }}
                  color="primary"
                >
                  {xls20.name}
                </Typography>
              </Box>
              <Box mt={2}>
                <Typography
                  style={{ fontSize: 24, fontWeight: 550 }}
                  color="textPrimary"
                >
                  {xls20.subname}
                </Typography>
              </Box>
              <Box mt={1}>
                <Typography
                  style={{ fontSize: 16, fontWeight: 500 }}
                  color="textSecondary"
                >
                  Issuer:{" "}
                  <span style={{ fontWeight: 700 }}>{xls20.owner}</span>
                </Typography>
              </Box>
              <Box mt={1}>
                <Typography
                  style={{ fontSize: 16, fontWeight: 400 }}
                  color="textSecondary"
                  gutterBottom
                >
                  {xls20.description}
                </Typography>
              </Box>
              <Box mt={2} display="flex">
                <BoxArray
                  price={xls20.currentPrice}
                  editions={xls20.currentId}
                  forSale={xls20.maxSupply}
                  style={{ textAlign: "center" }}
                />
              </Box>
              {isError && (
                <Box mt={2} display="flex">
                  <Alert severity="error">
                    <div>{isError}</div>
                  </Alert>
                </Box>
              )}
              {isSuccess && (
                <Box mt={2} display="flex">
                  <Alert severity="success">
                    <div>{isSuccess}</div>
                  </Alert>
                </Box>
              )}
              <Box mt={4}>
                <Button color="secondary" variant="contained" onClick={onBuy}>
                  Buy now!
                </Button>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12}>
        <Offers
          offers={offers}
          collectionDesc={"xls20.metaData.collectionDesc"}
        />
      </Grid>
    </Grid>
  );
}

CrowdsaleDetails.propTypes = {
  onBuy: PropTypes.func.isRequired,
  isSuccess: PropTypes.string.isRequired,
  isError: PropTypes.string.isRequired,
  offers: PropTypes.array.isRequired,
  xls20: PropTypes.object.isRequired,
};

export default CrowdsaleDetails;
