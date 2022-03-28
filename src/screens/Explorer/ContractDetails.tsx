/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTransaction } from "../../hooks/useTransaction";
import { truncateMiddle } from "../../utils/utils";
import { Events } from "../../components/Events";
import useWindowDimensions from "../../hooks/useWindowDimension";
import { LoadTransactions } from "../../components/LoadTransactions";

interface Props {
  theme: any;
  themeToggler: any;
  failure: boolean;
  logEvent: any;
}

export const ContractDetails: React.FC<Props> = ({
  theme,
  themeToggler,
  failure,
  logEvent,
}) => {
  const params: any = useParams();
  const [toggle, setToggle] = useState(false);
  const [txId, setTxId] = useState("");
  const {
    getTransaction,
    transaction,
    getContractDetails,
    contractTransactions,
    contractData,
    contractDetails,
    contractEvents,
    getContractById,
    getContractTransactions,
    getContractEvents,
    // contractCode,
    // getContractCode,
    isLoading,
    fails,
  } = useTransaction();
  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);
  const { push } = useHistory();

  useEffect(() => {
    if (fails) {
      push("/upgrading");
    }
  }, [fails]);

  useEffect(() => {
    logEvent("Contract Details");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (transaction && transaction.tx_id !== params.txId) {
        getTransaction(txId);
      }
    }, 5000);
  }, []);

  const dims = useWindowDimensions();
  useEffect(() => {
    if (params?.txId) {
      setTxId(params.txId);
    }
  }, [params]);
  useEffect(() => {
    if (txId) {
      getContractDetails(txId);
      getContractEvents(txId);
      // getContractCode(txId);
      getContractById(txId);
      getContractTransactions(txId);
    }
  }, [txId]);

  useEffect(() => {
    if (failure) {
      push("/upgrading");
    }
  }, [failure, theme]);
  return (
    <div className="explorer">
      {contractData && (
        <>
          <div id="transactionContainer" className="transaction-container">
            <div className="recent-transactions">
              <div style={{ height: "auto" }} className="rt-table">
                <div className="table-header">
                  <p>Overview</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Contract</p>
                  <p className="subtitle">{txId}</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Transaction ID</p>
                  <p className="subtitle">
                    {dims.width > 700
                      ? contractData?.tx_id
                      : truncateMiddle(contractData.tx_id, 8)}
                  </p>
                </div>
                <div
                  className="transaction-row"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    push("/explorer/address/" + txId.split(".")[0]);
                  }}
                >
                  <p className="title">Deployed by</p>
                  <p className="subtitle">
                    {dims.width > 700
                      ? txId.split(".")[0]
                      : truncateMiddle(txId.split(".")[0], 8)}
                  </p>
                </div>
                <div className="transaction-row">
                  <p className="title">Fees</p>
                  <p className="subtitle">{2.76} STX</p>
                </div>
                <div className="transaction-row">
                  <p className="title">Block Height</p>
                  <p className="subtitle">{contractData?.block_height}</p>
                </div>
              </div>
              {contractEvents && contractEvents.length > 0 && (
                <div style={{ height: "auto" }} className="rt-table">
                  <div className="table-header">
                    <p>Events</p>
                  </div>
                  <Events theme={theme} events={contractEvents} />
                </div>
              )}
              <div className="rt-table rtt-table">
                <div className="table-header">
                  <p>Transaction</p>
                </div>
                <LoadTransactions
                  recentTransactions={contractTransactions}
                  theme={theme}
                />
                {contractTransactions.length > 0 && (
                  <div
                    style={{
                      borderTop: "1px solid #84818A",
                      color: "#84818A",
                      fontSize: 12,
                      paddingTop: 15,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      getContractTransactions(txId);
                    }}
                  >
                    <p style={{ textAlign: "center", fontWeight: 600 }}>
                      {isLoading ? "Loading..." : "Load More"}
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="anchor-block">
              <div style={{ height: "auto" }} className="ab-table">
                <div className="table-header">
                  <p>Contract Detail</p>
                </div>
                <div style={{ borderTop: 0 }} className="transaction-row">
                  <p className="subtitle">{txId.split(".")[1]}</p>
                </div>
                {contractDetails && (
                  <>
                    <div className="transaction-row">
                      <p className="title">Function</p>
                      <p className="subtitle">
                        {contractDetails.functions.length}
                      </p>
                    </div>
                    <div className="transaction-row">
                      <p className="title">Variables</p>
                      <p className="subtitle">
                        {contractDetails.variables.length}
                      </p>
                    </div>
                    <div className="transaction-row">
                      <p className="title">Map</p>
                      <p className="subtitle">{contractDetails.maps.length}</p>
                    </div>
                    <div className="transaction-row">
                      <p className="title">Token</p>
                      <p className="subtitle">
                        {contractDetails.fungible_tokens.length}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
