import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode.js";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";
import { Overview } from "./screens/Overview";
import { useOverview } from "./hooks/useOverview";
import { Notfound } from "./screens/Notfound";

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
  } = useOverview();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <Router>
          <Switch>
            <Route exact path="/">
              <Overview
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
