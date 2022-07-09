/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import PropTypes from "prop-types";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow
} from "@mui/material";

import AppTableCell from "../../../../components/Global/AppTableCell";
import { formatTimeFromNow } from "../../../../utils/dateHelpers";
import { formatWalletAddress } from "../../../../utils/walletHelpers";

function applyPagination(offers, page, limit) {
  return offers.slice(page * limit, page * limit + limit);
}

const OfferHolder = ({ holder }) => (
  <TableRow hover key={String(holder.address)}>
    <AppTableCell element={formatWalletAddress(holder.address) || "N/A"} />
    <AppTableCell element={`# ${holder.tokenId || 0}`} />
    <AppTableCell
      element={formatTimeFromNow(holder.timestamp) || "MM/DD/YYYY"}
    />
    <AppTableCell element={holder.price || "N/A"} />
  </TableRow>
);

OfferHolder.propTypes = {
  holder: PropTypes.object.isRequired,
};

function OfferTable({
  className,
  selectedHolders,
  onSelectOne,
  offers,
  ...rest
}) {
  const [selectedOffers, setSelectedOffers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const handlePageChange = (offer, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (offer) => {
    setLimit(offer.target.value);
  };

  const paginatedOffers = applyPagination(offers, page, limit);
  const enableBulkOperations = selectedOffers.length > 0;
  const selectedSomeOffers =
    selectedOffers.length > 0 && selectedOffers.length < offers.length;
  const selectedAllOffers = selectedOffers.length === offers.length;

  return (
    <>
      <PerfectScrollbar>
        <Box>
          <Table size="small">
            <TableHead>
              <TableRow>
                <AppTableCell element="Buyer" />
                <AppTableCell element="Edition" />
                <AppTableCell element="Date" />
                <AppTableCell element="Total" />
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedOffers.map((offer, index) => (
                <OfferHolder holder={offer} />
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={offers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </>
  );
}

OfferTable.propTypes = {
  className: PropTypes.string,
  selectedHolders: PropTypes.array.isRequired,
  onSelectOne: PropTypes.func.isRequired,
  offers: PropTypes.array,
};

OfferTable.defaultProps = {
  offers: [],
};

export default OfferTable;
