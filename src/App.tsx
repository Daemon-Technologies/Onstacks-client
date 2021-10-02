import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode.js";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";
import { Overview } from "./screens/Overview";
import { useOverview } from "./hooks/useOverview";
import { Notfound } from "./screens/Notfound";
import { MiningData } from "./screens/MiningData";
import { Header } from "./components/Header";
import { AddressDetails } from "./screens/AddressDetails";
import { Upgrading } from "./screens/Upgrading";
import { useMiningData } from "./hooks/useMiningData";

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
            <Route exact path="/">
              <Overview
                failure={failure}
                themeToggler={themeToggler}
                tokens={tokens}
                totalWinners={totalWinners}
                winnerAddresses={winnersAddresses}
                blocks={blocks}
                areaBlocks={areaBlocks}
                areaSeries={areaSeries}
                satsCommitted={satsCommitted}
                overviewData={overviewData}
                theme={theme}
              />
            </Route>
            <Route exact path="/mining-data">
              <MiningData
                failure={failure}
                themeToggler={themeToggler}
                tokens={tokens}
                blocks={blocks}
                areaBlocks={areaBlocks}
                areaSeries={areaSeries}
                overviewData={overviewData}
                theme={theme}
              />
            </Route>
            <Route exact path="/mining-data/:index/:block">
              <MiningData
                failure={failure}
                themeToggler={themeToggler}
                tokens={tokens}
                blocks={blocks}
                areaBlocks={areaBlocks}
                areaSeries={areaSeries}
                overviewData={overviewData}
                theme={theme}
              />
            </Route>
            <Route exact path="/address/:address">
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
            <Route path="*">
              <Notfound />
            </Route>
          </Switch>
        </Router>
      </>
    </ThemeProvider>
  );
};

export default App;
