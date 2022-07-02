const projectId = "metaxrplorer";
const datasetName = "fullhistory";
const tableName = "transactions";

const { BigQuery } = require("@google-cloud/bigquery");
const bigquery = new BigQuery({ projectId: projectId });

import { AccountNFToken } from "../types/xrpl";

export const q_bigquery_tt = async (
  account: string,
  tt: string,
  limit: number
) => {
  const response = await bigquery.query({
    query: `SELECT *
                FROM metaxrplorer.fullhistory.transactions
                WHERE Account = "${account}"
                AND TransactionType = "${tt}"
                ORDER BY LedgerIndex
                LIMIT ${limit}`,
    useLegacySql: false, // Use standard SQL syntax for queries.
  });
  return response[0].map((t: Record<string, any>) => {
    const nft: AccountNFToken = {
      Flags: t.Flags,
      Issuer: t.Issuer,
      NFTokenID: t.NFTokenID,
      NFTokenTaxon: t.NFTokenTaxon,
      URI: t.URI,
      nft_serial: parseInt(t.NFTokenID.slice(t.NFTokenID.length - 8, t.NFTokenID.length), 10),
    };
    return nft;
  })
};
