import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode.js";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";
import { useOverview } from "./hooks/useOverview";
import { Notfound } from "./screens/Notfound";
import { MiningData } from "./screens/MiningData";
import { Header } from "./components/Header";
import { AddressDetails } from "./screens/AddressDetails";
import { Upgrading } from "./screens/Upgrading";
import { useMiningData } from "./hooks/useMiningData";
import { Explorer } from "./screens/Explorer";
import { ExplorerAddressDetails } from "./screens/ExplorerAddressDetails";
import { STXTransferDetails } from "./screens/STXTransferDetails";

const App: React.FC = () => {
  const { theme, themeToggler, mountedComponent } = useDarkMode();
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

  const { getBlockByNumber, currentBlock } = useMiningData();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Router>
          <Header themeToggler={themeToggler} tokens={tokens} theme={theme} />
          <Switch>
            <Route exact path="/explorer">
              <Explorer
                failure={failure}
                overviewData={overviewData}
                theme={theme}
                themeToggler={themeToggler}
              />
            </Route>
            <Route exact path="/explorer/address/:address">
              <ExplorerAddressDetails
                failure={failure}
                themeToggler={themeToggler}
                theme={theme}
              />
            </Route>
            <Route exact path="/explorer/txId/:txId">
              <STXTransferDetails
                failure={failure}
                theme={theme}
                themeToggler={themeToggler}
              />
            </Route>
            <Route exact path="/mining">
              <MiningData
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
        </Router>
        <div className="footer">
          Terms of services • Privacy Policy • Daemon Technologies 2021
        </div>
      </>
    </ThemeProvider>
  );
};

export default App;
