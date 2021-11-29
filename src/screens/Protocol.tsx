import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "../assets/explorer/protocol.svg";

export const Protocol: React.FC = () => {
  const { push } = useHistory();

  const navigateToHome = () => {
    push("/");
  };
  return (
    <>
      <div className="not-found">
        <img src={Logo} alt="404" />
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
