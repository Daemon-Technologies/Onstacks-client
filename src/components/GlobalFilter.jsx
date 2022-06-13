// eslint-disable-next-line
import React from "react";
import { useState } from "react";
import { useAsyncDebounce } from "react-table";
import { Popover } from "react-tiny-popover";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
// Component for Global Filter
const GlobalFilter = ({
  // filter,
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter,
  headers,
  cols,
  setCols,
}) => {
  const [value, setValue] = useState(globalFilter);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined);
  }, 200);

  const [state, setTheState] = useState(0);
  const toggleColumn = (n) => {
    const columns = cols.map((col, i) =>
      n === i ? { ...col, isVisible: !col.isVisible } : col
    );
    setCols(columns);
  };
  const [rewardState, setRewardState] = useState(0);
  const [participationState, setParticipationState] = useState(0);
  const [blockState, setBlockWonState] = useState(0);
  const [satsState, setSatsState] = useState(0);
  const options = ["Greater Than >", "Lesser Than <"];
  const [optionsState, setOptionsState] = useState(options[0]);
  const _onSelect = (e) => {
    setOptionsState(e.value);
  };

  const filterWithMinAndMax = (index, state) => {
    if (optionsState === options[0]) {
      headers[index].setFilter(() => [state, 9999999999999999]);
    } else if (optionsState === options[1]) {
      headers[index].setFilter(() => [0, state]);
    }
  };
  return (
    <div style={{ display: "flex", background: "transparent" }}>
      <input
        className="search-bar"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setValue(e.target.value);
        }}
        type="text"
        id="header-search"
        style={{ borderRadius: 4 }}
        placeholder="Search for Address"
        name="s"
      />
      <div
        style={{ marginRight: 10 }}
        className="search-button"
        onClick={() => toggleColumn(1)}
      >
        Export CSV
      </div>
      <Popover
        isOpen={isPopoverOpen}
        // onClickOutside={() => setIsPopoverOpen(false)} // handle click events outside of the popover/target here!
        positions={["bottom"]}
        padding={10} // adjust padding here!
        reposition={false} // prevents automatic readjustment of content position that keeps your popover content within its parent's bounds
        content={(
          { position } // you can also provide a render function that injects some useful stuff!
        ) => (
          <div className="pop-over-container">
            {state === 0 ? (
              <>
                <>
                  <div className="row-space">
                    <p className="title">Filter</p>
                    <p className="title">Reset all</p>
                  </div>
                  <div className="row-space">
                    <div
                      onClick={() => {
                        setTheState(1);
                      }}
                      className="row"
                    >
                      <img
                        className="icon"
                        src={require("../assets/drop-down/Currency Dollar.svg")}
                        alt=""
                      />
                      <p className="sub-title">Total Rewards</p>
                    </div>
                    <p className="sub-title">{rewardState}</p>
                  </div>
                  <div className="row-space">
                    <div
                      onClick={() => {
                        setTheState(2);
                      }}
                      className="row"
                    >
                      <img
                        className="icon"
                        src={require("../assets/drop-down/Cursor click.svg")}
                        alt=""
                      />
                      <p className="sub-title">Total Participation</p>
                    </div>
                    <p className="sub-title">{participationState}</p>
                  </div>
                  <div className="row-space">
                    <div
                      onClick={() => {
                        setTheState(3);
                      }}
                      className="row"
                    >
                      <img
                        className="icon"
                        src={require("../assets/drop-down/Fire.svg")}
                        alt=""
                      />
                      <p className="sub-title">Total Spent</p>
                    </div>
                    <p className="sub-title">{satsState}</p>
                  </div>
                  <div className="row-space">
                    <div
                      onClick={() => {
                        setTheState(4);
                      }}
                      className="row"
                    >
                      <img
                        className="icon"
                        src={require("../assets/drop-down/Cube.svg")}
                        alt=""
                      />
                      <p className="sub-title">Total Blocks Won</p>
                    </div>
                    <p className="sub-title">{blockState}</p>
                  </div>
                  {/* <div className="row">
              <img
                className="icon"
                src={require("../assets/drop-down/Calendar.svg")}
                alt=""
              />
              <p className="sub-title">Date</p>
            </div> */}
                  <hr style={{ marginBottom: 16 }}></hr>
                  <div className="row-space">
                    <p className="title">Filter</p>
                    <p
                      className="title"
                      onClick={() =>
                        setCols([
                          {
                            Header: `Address.`,
                            accessor: "stx_address", // accessor is the "key" in the data
                            isVisible: true,
                          },
                          {
                            Header: "Total Spent (sats)",
                            accessor: "total_burnfee",
                            isVisible: true,
                            filter: "between",
                          },
                          {
                            Header: "Total Participation",
                            accessor: "total_participation",
                            isVisible: true,
                            filter: "between",
                          },
                          {
                            Header: "Total Block Won",
                            accessor: "total_block_reward",
                            isVisible: true,
                            filter: "between",
                          },
                          {
                            Header: "Total Reward (STX)",
                            accessor: "total_stx_reward",
                            isVisible: true,
                            filter: "between",
                          },
                        ])
                      }
                    >
                      Reset all
                    </p>
                  </div>
                  {cols.map((col, i) => {
                    return (
                      <div
                        onClick={() => toggleColumn(i)}
                        className="row-space"
                      >
                        <p className="sub-title">{col.Header}</p>
                        <img
                          className="icon"
                          src={
                            col.isVisible
                              ? require("../assets/drop-down/Eye.svg")
                              : require("../assets/drop-down/Eye off.svg")
                          }
                          alt=""
                        />
                      </div>
                    );
                  })}
                </>
              </>
            ) : (
              <>
                {state === 1 && (
                  <>
                    <div>
                      <div onClick={() => setTheState(0)} className="row">
                        <img
                          className="icon"
                          src={require("../assets/drop-down/Chevron left.svg")}
                          alt=""
                        />
                        <p className="sub-title">Total Rewards</p>
                      </div>
                      <Dropdown
                        controlClassName="dropdown-cont dropdown-ss"
                        options={options}
                        value={optionsState}
                        onChange={_onSelect}
                        placeholder="Select an option"
                      />
                      <input
                        type={"number"}
                        value={rewardState}
                        onChange={(e) => setRewardState(+e.target.value)}
                      />
                      <div
                        style={{
                          marginLeft: 0,
                          width: "100%",
                          textAlign: "center",
                        }}
                        className="search-button"
                        onClick={() => {
                          headers[4].setFilter(() => [
                            rewardState,
                            9999999999999999,
                          ]);
                          filterWithMinAndMax(4, rewardState);
                          setTheState(0);
                        }}
                      >
                        Save
                      </div>
                    </div>
                  </>
                )}
                {state === 2 && (
                  <>
                    <div>
                      <div onClick={() => setTheState(0)} className="row">
                        <img
                          className="icon"
                          src={require("../assets/drop-down/Chevron left.svg")}
                          alt=""
                        />
                        <p className="sub-title">Total Participation</p>
                      </div>
                      <Dropdown
                        controlClassName="dropdown-cont dropdown-ss"
                        options={options}
                        value={optionsState}
                        onChange={_onSelect}
                        placeholder="Select an option"
                      />
                      <input
                        type={"number"}
                        value={participationState}
                        onChange={(e) => setParticipationState(+e.target.value)}
                      />
                      <div
                        style={{
                          marginLeft: 0,
                          width: "100%",
                          textAlign: "center",
                        }}
                        className="search-button"
                        onClick={() => {
                          filterWithMinAndMax(2, participationState);
                          setTheState(0);
                        }}
                      >
                        Save
                      </div>
                    </div>
                  </>
                )}
                {state === 3 && (
                  <>
                    <div>
                      <div onClick={() => setTheState(0)} className="row">
                        <img
                          className="icon"
                          src={require("../assets/drop-down/Chevron left.svg")}
                          alt=""
                        />
                        <p className="sub-title">Total Spent</p>
                      </div>
                      <Dropdown
                        controlClassName="dropdown-cont dropdown-ss"
                        options={options}
                        value={optionsState}
                        onChange={_onSelect}
                        placeholder="Select an option"
                      />
                      <input
                        type={"number"}
                        value={satsState}
                        onChange={(e) => setSatsState(+e.target.value)}
                      />
                      <div
                        style={{
                          marginLeft: 0,
                          width: "100%",
                          textAlign: "center",
                        }}
                        className="search-button"
                        onClick={() => {
                          filterWithMinAndMax(1, satsState);
                          setTheState(0);
                        }}
                      >
                        Save
                      </div>
                    </div>
                  </>
                )}
                {state === 4 && (
                  <>
                    <div>
                      <div onClick={() => setTheState(0)} className="row">
                        <img
                          className="icon"
                          src={require("../assets/drop-down/Chevron left.svg")}
                          alt=""
                        />
                        <p className="sub-title">Total Block won</p>
                      </div>
                      <Dropdown
                        controlClassName="dropdown-cont dropdown-ss"
                        options={options}
                        value={optionsState}
                        onChange={_onSelect}
                        placeholder="Select an option"
                      />
                      <input
                        type={"number"}
                        value={blockState}
                        onChange={(e) => setBlockWonState(+e.target.value)}
                      />
                      <div
                        style={{
                          marginLeft: 0,
                          width: "100%",
                          textAlign: "center",
                        }}
                        className="search-button"
                        onClick={() => {
                          filterWithMinAndMax(3, blockState);
                          setTheState(0);
                        }}
                      >
                        Save
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        )}
      >
        <div
          style={{ curser: "pointer", marginTop: 10 }}
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          <img src={require("../assets/drop-down/Icon-right.svg")} alt="" />
        </div>
      </Popover>
    </div>
  );
};

export default GlobalFilter;
