import React, { useEffect, useState } from "react";
import { OverviewProps, TokenPriceProps } from "../hooks/useOverview";
import { useHistory } from "react-router-dom";

interface Props {
  theme: any;
  overviewData: OverviewProps;
  themeToggler: any;
  tokens: TokenPriceProps;
}

export const MiningData: React.FC<Props> = ({
  theme,
  overviewData,
  tokens,
  themeToggler,
}) => {
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    const { innerWidth: width } = window;
    setToggle(width >= 1025);
  }, [toggle]);
  const { push } = useHistory();

  const navigateToHome = () => {
    push("/");
  };
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100vh",
        background: "transparent",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontSize: 34, marginBottom: 11 }}>Coming soon!</h1>
      <p>This page currently under development and will be releasing soon</p>
      <div onClick={navigateToHome} className="button">
        <p>Home</p>
      </div>
    </div>
  );
};
