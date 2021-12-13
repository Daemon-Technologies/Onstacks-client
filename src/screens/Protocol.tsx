import React from "react";
import { useHistory } from "react-router-dom";
import Protocols from "../assets/explorer/protocols.svg";

export const Protocol: React.FC = () => {
  const { push } = useHistory();

  const navigateToHome = () => {
    push("/");
  };
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
        </p>
        <div onClick={navigateToHome} className="button">
          <p>Home</p>
        </div>
      </div>
    </>
  );
};
