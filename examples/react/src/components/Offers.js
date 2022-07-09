import React from "react";
import PropTypes from "prop-types";
import { Grid, Box, Typography } from "@mui/material";

// import OfferTable from "./OfferTable";

function Offers({ offers, collectionDesc }) {
  return (
    <Grid style={{ marginTop: 20 }} container spacing={3}>
      <Grid item lg={6} xs={12}>
        <Box>
          <Typography color="primary" variant="h3">
            Details
          </Typography>
        </Box>
        <Box mt={1}>
          <Typography
            style={{ padding: 20, fontSize: 16, fontWeight: 400 }}
            color="textSecondary"
            gutterBottom
          >
            {collectionDesc}
          </Typography>
        </Box>
      </Grid>
      <Grid item md={6} xs={12}>
        <Grid container spacing={3}>
          <Grid item md={12} xs={12}>
            <Box>
              <Typography color="primary" variant="h3">
                Past Sales
              </Typography>
            </Box>
          </Grid>
          <Grid item md={12} xs={12}>
            <Box>
              {/* <OfferTable offers={offers} /> */}
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

Offers.defaultProps = {
  collectionDesc: "",
  offers: [],
};

Offers.propTypes = {
  collectionDesc: PropTypes.string,
  offers: PropTypes.array,
};

export default Offers;
