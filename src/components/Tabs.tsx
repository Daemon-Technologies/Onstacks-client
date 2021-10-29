import React from "react";

interface Props {
  setTabIndex: (index: number) => void;
  tabIndex: number;
}

export const Tabs: React.FC<Props> = ({ tabIndex, setTabIndex }) => {
  return (
    <div className={"tabs"}>
      <div
        onClick={() => setTabIndex(0)}
        className={tabIndex === 0 ? "active" : ""}
      >
        Overview
      </div>
      <div
        onClick={() => setTabIndex(1)}
        className={tabIndex === 1 ? "active" : ""}
      >
        Mining data
      </div>
      <div
        onClick={() => setTabIndex(2)}
        className={tabIndex === 2 ? "active" : ""}
      >
        Miners
      </div>
      <div
        onClick={() => setTabIndex(3)}
        className={tabIndex === 3 ? "active" : ""}
      >
        Blocks
      </div>
    </div>
  );
};
