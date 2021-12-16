/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Protocols from "../assets/explorer/protocols.svg";

export const Protocol: React.FC<{ logEvent: any }> = ({ logEvent }) => {
  const { push } = useHistory();

  const navigateToHome = () => {
    push("/");
  };

  useEffect(() => {
    logEvent("Protocol");
  }, []);

  return (
    <>
      <div className="not-found">
        <img
          style={{ width: 530, height: "auto", marginBottom: 0 }}
          src={Protocols}
          alt="404"
        />
        <h1 style={{ marginTop: -30, marginBottom: 10 }}>Coming Soon</h1>
        <p>
          This page is current under developement and will be releasing soon.
          Launching your own dapp and looking to access on chain data?{" "}
          <span
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              window.open(`https://forms.gle/EPKzaWekfSc4pp956`, "_blank");
            }}
          >
            Register interest.
          </span>
        </p>
        <div onClick={navigateToHome} className="button">
          <p>Home</p>
        </div>
      </div>
    </>
  );
};
