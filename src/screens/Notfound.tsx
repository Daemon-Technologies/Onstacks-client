import React from "react";
import { useHistory } from "react-router-dom";
import Logo from "../assets/side-menu/not-found.svg";

export const Notfound: React.FC = () => {
  const { push } = useHistory();

  const navigateToHome = () => {
    push("/");
  };
  return (
    <>
      <div className="not-found">
        <img src={Logo} alt="404" />
        <p>Page not found, please return to home</p>
        <div onClick={navigateToHome} className="button">
          <p>Home</p>
        </div>
      </div>
    </>
  );
};
