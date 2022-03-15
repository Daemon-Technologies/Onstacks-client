// eslint-disable-next-line
import React from "react";
import { useHistory } from "react-router";

export const Footer: React.FC = () => {
  const { push } = useHistory();
  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={() => push("/terms")}
      className="footer"
    >
      Terms of services • Privacy Policy • Daemon Technologies 2021
    </div>
  );
};
