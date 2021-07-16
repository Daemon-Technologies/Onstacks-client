import React, { useState } from "react";
import Menu from "../assets/side-menu/menu.svg";
import Logo from "../assets/side-menu/logo.svg";
import Notification from "../assets/side-menu/notifications.svg";

interface Props {
  toggle: boolean;
  setToggle: (x: boolean) => void;
}
export const MobileHeader: React.FC<Props> = ({ setToggle, toggle }) => {
  return (
    <div className={"mobile-header"}>
      <img onClick={() => setToggle(true)} src={Menu} />
      <img src={Logo} />
      <img src={Notification} />
    </div>
  );
};
