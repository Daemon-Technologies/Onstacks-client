import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode.js";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";
import { Overview } from "./screens/Overview";
import { Sidebar } from "./components/Sidebar";
import { useOverview } from "./hooks/useOverview";

const App: React.FC = () => {
  const { theme, themeToggler, mountedComponent } = useDarkMode();
  const { overviewData, tokens, satsCommitted, topMinerFees, blocks } =
    useOverview();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div className="container">
          <Sidebar
            tokens={tokens}
            overviewData={overviewData}
            theme={theme}
            themeToggler={themeToggler}
          />
          <Router>
            <Switch>
              <Route path="/">
                <Overview
                  blocks={blocks}
                  topMinerFees={topMinerFees}
                  satsCommitted={satsCommitted}
                  overviewData={overviewData}
                  theme={theme}
                />
              </Route>
            </Switch>
          </Router>
        </div>
      </>
    </ThemeProvider>
  );
};

export default App;
