import React from "react";
// import Notification from "../assets/side-menu/notifications.svg";
import LogoLight from "../assets/side-menu/stx-dark.svg";
import LogoDark from "../assets/side-menu/stx-light.svg";

export const Header: React.FC<{ theme: any }> = ({ theme }: any) => {
  return (
    <div id="nav" className={"header"}>
      <img
        className="logo"
        alt="logo"
        src={theme === "light" ? LogoDark : LogoLight}
      />
      {/* <img className="notification" alt="notifications" src={Notification} /> */}
    </div>
  );
};
