import React from "react";
import Menu from "../assets/side-menu/menu.svg";
// import Notification from "../assets/side-menu/notifications.svg";
import Close from "../assets/side-menu/close.svg";
import LogoLight from "../assets/side-menu/stx-dark.svg";
import LogoDark from "../assets/side-menu/stx-light.svg";
interface Props {
  toggle: boolean;
  setToggle: (x: boolean) => void;
  theme: any;
}
export const MobileHeader: React.FC<Props> = ({ setToggle, toggle, theme }) => {
  return (
    <div id="nav" className={"mobile-header"}>
      <img
        alt="menu"
        onClick={() => setToggle(!toggle)}
        src={toggle ? Close : Menu}
      />
      <img
        className="logo"
        alt="logo"
        src={theme === "light" ? LogoDark : LogoLight}
      />
      <div></div>
      {/* <img alt="notifications" src={Notification} /> */}
    </div>
  );
};
