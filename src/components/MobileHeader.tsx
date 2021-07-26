import React from "react";
import Menu from "../assets/side-menu/menu.svg";
import Logo from "../assets/side-menu/logo.svg";
import Notification from "../assets/side-menu/notifications.svg";
import Close from "../assets/side-menu/close.svg";

interface Props {
  toggle: boolean;
  setToggle: (x: boolean) => void;
}
export const MobileHeader: React.FC<Props> = ({ setToggle, toggle }) => {
  return (
    <div id="nav" className={"mobile-header"}>
      <img
        alt="menu"
        onClick={() => setToggle(!toggle)}
        src={toggle ? Close : Menu}
      />
      <img alt="logo" src={Logo} />
      <img alt="notifications" src={Notification} />
    </div>
  );
};
