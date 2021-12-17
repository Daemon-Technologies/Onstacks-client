// eslint-disable-next-line
import React from "react";

interface Props {
  setTabIndex: (index: number) => void;
  tabIndex: number;
  logEvent: any;
}

export const Tabs: React.FC<Props> = ({ tabIndex, setTabIndex, logEvent }) => {
  return (
    <div className={"tabs"}>
      <div
        onClick={() => {
          setTabIndex(0);
          logEvent("Mining Overview Tab");
        }}
        className={tabIndex === 0 ? "active" : ""}
      >
        Overview
      </div>
      <div
        onClick={() => {
          setTabIndex(1);
          logEvent("Mining Data Tab");
        }}
        className={tabIndex === 1 ? "active" : ""}
      >
        Mining data
      </div>
      <div
        onClick={() => {
          setTabIndex(2);
          logEvent("Miners Tab");
        }}
        className={tabIndex === 2 ? "active" : ""}
      >
        Miners
      </div>
      <div
        onClick={() => {
          setTabIndex(3);
          logEvent("Mining Blocks Tab");
        }}
        className={tabIndex === 3 ? "active" : ""}
      >
        Blocks
      </div>
    </div>
  );
};
