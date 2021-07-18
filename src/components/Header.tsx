import React from "react";
import Notification from "../assets/side-menu/notifications.svg";

export const Header: React.FC = () => {
  return (
    <div className={"header"}>
      <img alt="notifications" src={Notification} />
    </div>
  );
};
