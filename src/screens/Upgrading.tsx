import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "../assets/side-menu/upgrading.svg";

export const Upgrading: React.FC = () => {
  const { push } = useHistory();

  const navigateToHome = () => {
    push("/");
  };
  return (
    <>
      <div className="upgrading">
        <img style={{ width: "auto", height: "auto" }} src={Logo} alt="404" />
        <p>We are currently upgrading this site. Please check back later</p>
        <div onClick={navigateToHome} className="button">
          <p>Refresh</p>
        </div>
      </div>
    </>
  );
};
