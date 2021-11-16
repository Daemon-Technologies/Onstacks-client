/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

interface Props {
  theme: any;
  themeToggler: any;
  failure: boolean;
}

export const STXTransferDetails: React.FC<Props> = ({
  theme,
  themeToggler,
  failure,
}) => {
  const params: any = useParams();
  const [toggle, setToggle] = useState(false);
  const [txId, setTxId] = useState("");

  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);
  const { push } = useHistory();

  useEffect(() => {
    if (params?.txId) {
      setTxId(params.txId);
    }
  }, [params]);

  useEffect(() => {
    if (txId) {
      // getMinerInfo(address);
      // getAddressSatsCommitted(address);
      // getBlocksMiner(address);
      // getBlocksForAddress(address);
    }
  }, [txId]);

  useEffect(() => {
    if (failure) {
      push("/upgrading");
    }
  }, [failure]);

  return (
    <div className="explorer">
      <div id="main">
        <div className={"info-card"}>
          <div className="inner-info-card">
            <p className="title">BTC Spent *</p>
            <p className="sub-title">
              {/* {(+overviewData.total_sats_committed / 100000000).toLocaleString()}{" "} */}
              BTC
            </p>
          </div>
          <div className="inner-info-card">
            <p className="title">BTC Spent All Time</p>
            {/* <p className="sub-title">{overviewData.btc_total} BTC</p> */}
          </div>
          <div className="inner-info-card">
            <p className="title">Tx Fee Per Block *</p>
            {/* <p className="sub-title">{overviewData.avg_tx_fees_per_block} STX</p> */}
          </div>
          <div className="inner-info-card">
            <p className="title">Current BTC hashrate</p>
            {/* <p className="sub-title">{overviewData.btc_hash_rate} EH/s</p> */}
          </div>
          <div className="inner-info-card">
            <p className="title">Active miners *</p>
            {/* <p className="sub-title">{overviewData.active_miners}</p> */}
          </div>
        </div>
      </div>
      <div id="transactionContainer" className="transaction-container"></div>
    </div>
  );
};
