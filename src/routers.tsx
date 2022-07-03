// eslint-disable-next-line
import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Notfound } from "./screens/Notfound";
import { MiningData } from "./screens/MiningData/MiningData";
import { Header } from "./components/Header";
import { AddressDetails } from "./screens/MiningData/AddressDetails";
import { Upgrading } from "./screens/Upgrading";
import { Explorer } from "./screens/Explorer/Explorer";
import { ExplorerAddressDetails } from "./screens/Explorer/ExplorerAddressDetails";
import { STXTransferDetails } from "./screens/Explorer/STXTransferDetails";
import { Blockdetails } from "./screens/MiningData/Blockdetails";
import { Protocol } from "./screens/Protocol";
import { Terms } from "./screens/Terms";
import { MicroblockDetails } from "./screens/Explorer/MicroblockDetails";
import { Footer } from "./components/Footer";
import { ContractDetails } from "./screens/Explorer/ContractDetails";
import { useOverview } from "./hooks/useOverview";
import useAmplitude from "./hooks/useAmplitude";
import { Watchlist } from "./screens/Watchlist";

export const Routers: React.FC<{ theme: any; themeToggler: any }> = ({
  theme,
  themeToggler,
}) => {
  const { overviewData, blocks, totalWinners, winnersAddresses, failure } =
    useOverview();
  const { logEvent } = useAmplitude();

  return (
    <Router>
      <Header themeToggler={themeToggler} theme={theme} />
      <Switch>
        <Route exact path="/explorer">
          <Explorer
            logEvent={logEvent}
            failure={failure}
            overviewData={overviewData}
            theme={theme}
            themeToggler={themeToggler}
          />
        </Route>
        <Route exact path="/protocol">
          <Protocol logEvent={logEvent} />
        </Route>
        <Route exact path="/watchlist">
          <Watchlist />
        </Route>
        <Route exact path="/terms">
          <Terms />
        </Route>
        <Route exact path="/explorer/address/:address">
          <ExplorerAddressDetails
            logEvent={logEvent}
            failure={failure}
            themeToggler={themeToggler}
            theme={theme}
          />
        </Route>
        <Route exact path="/explorer/txId/:txId">
          <STXTransferDetails
            logEvent={logEvent}
            failure={failure}
            theme={theme}
            themeToggler={themeToggler}
          />
        </Route>
        <Route exact path="/explorer/contract/:txId">
          <ContractDetails
            logEvent={logEvent}
            failure={failure}
            theme={theme}
            themeToggler={themeToggler}
          />
        </Route>
        <Route exact path="/explorer/block/:block">
          <Blockdetails
            logEvent={logEvent}
            failure={failure}
            theme={theme}
            themeToggler={themeToggler}
          />
        </Route>

        <Route exact path="/explorer/microblock/:microblock">
          <MicroblockDetails
            logEvent={logEvent}
            failure={failure}
            theme={theme}
            themeToggler={themeToggler}
          />
        </Route>
        <Route exact path="/">
          <MiningData
            logEvent={logEvent}
            failure={failure}
            themeToggler={themeToggler}
            blocks={blocks}
            totalWinners={totalWinners}
            winnerAddresses={winnersAddresses}
            overviewData={overviewData}
            theme={theme}
          />
        </Route>
        <Route exact path="/:index/:block">
          <MiningData
            logEvent={logEvent}
            failure={failure}
            themeToggler={themeToggler}
            totalWinners={totalWinners}
            winnerAddresses={winnersAddresses}
            blocks={blocks}
            overviewData={overviewData}
            theme={theme}
          />
        </Route>
        <Route exact path="/miner/address/:address">
          <AddressDetails
            logEvent={logEvent}
            failure={failure}
            themeToggler={themeToggler}
            theme={theme}
          />
        </Route>
        <Route exact path="/upgrading">
          <Upgrading />
        </Route>
        <Route
          exact
          path="/"
          render={() => {
            return <Redirect to="/" />;
          }}
        />
        <Route path="*">
          <Notfound />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};
