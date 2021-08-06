import React from "react";
import Notification from "../assets/side-menu/notifications.svg";
import Logo from "../assets/side-menu/logo.svg";

export const Header: React.FC = () => {
  return (
    <div id="nav" className={"header"}>
      <div className={"headerLogo"}>
        <img className="logo" alt="notifications" src={Logo} />
        <p>STX Mining Monitor</p>
      </div>
      <img className="notification" alt="notifications" src={Notification} />
    </div>
  );
};
