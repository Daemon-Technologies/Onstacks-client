// eslint-disable-next-line
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Notfound } from "./screens/Notfound";
import { MiningData } from "./screens/MiningData";
import { Header } from "./components/Header";
import { AddressDetails } from "./screens/AddressDetails";
import { Upgrading } from "./screens/Upgrading";
import { Explorer } from "./screens/Explorer";
import { ExplorerAddressDetails } from "./screens/ExplorerAddressDetails";
import { STXTransferDetails } from "./screens/STXTransferDetails";
import { Blockdetails } from "./screens/Blockdetails";
import { Protocol } from "./screens/Protocol";
import { Terms } from "./screens/Terms";
import { MicroblockDetails } from "./screens/MicroblockDetails";
import { Footer } from "./components/Footer";
import { ContractDetails } from "./screens/ContractDetails";
import { useOverview } from "./hooks/useOverview";
import { useMiningData } from "./hooks/useMiningData";
import useAmplitude from "./hooks/useAmplitude";

export const Routers: React.FC<{ theme: any; themeToggler: any }> = ({
  theme,
  themeToggler,
}) => {
  const {
    overviewData,
    tokens,
    satsCommitted,
    areaBlocks,
    areaSeries,
    blocks,
    totalWinners,
    winnersAddresses,
    failure,
  } = useOverview();
  const { logEvent } = useAmplitude();
  const { getBlockByNumber, currentBlock } = useMiningData();

  return (
    <Router>
      <Header themeToggler={themeToggler} tokens={tokens} theme={theme} />
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
          <Protocol theme={theme} logEvent={logEvent} />
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
        <Route exact path="/mining">
          <MiningData
            logEvent={logEvent}
            failure={failure}
            themeToggler={themeToggler}
            tokens={tokens}
            blocks={blocks}
            areaBlocks={areaBlocks}
            areaSeries={areaSeries}
            satsCommitted={satsCommitted}
            totalWinners={totalWinners}
            winnerAddresses={winnersAddresses}
            overviewData={overviewData}
            theme={theme}
          />
        </Route>
        <Route exact path="/mining/:index/:block">
          <MiningData
            logEvent={logEvent}
            failure={failure}
            themeToggler={themeToggler}
            tokens={tokens}
            satsCommitted={satsCommitted}
            totalWinners={totalWinners}
            winnerAddresses={winnersAddresses}
            blocks={blocks}
            areaBlocks={areaBlocks}
            areaSeries={areaSeries}
            overviewData={overviewData}
            theme={theme}
          />
        </Route>
        <Route exact path="/miner/address/:address">
          <AddressDetails
            logEvent={logEvent}
            failure={failure}
            currentBlock={currentBlock}
            getBlockByNumber={getBlockByNumber}
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
            return <Redirect to="/explorer" />;
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
