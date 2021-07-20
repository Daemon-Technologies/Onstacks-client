import React from "react";
import Notification from "../assets/side-menu/notifications.svg";
import Logo from "../assets/side-menu/logo.svg";

export const Header: React.FC = () => {
  return (
    <div id="nav" className={"header"}>
      <img className="logo" alt="notifications" src={Logo} />
      <img className="notification" alt="notifications" src={Notification} />
    </div>
  );
};
