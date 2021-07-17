import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode.js";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";
import { Overview } from "./screens/Overview";
import { Sidebar } from "./components/Sidebar";

const App: React.FC = () => {
  const { theme, themeToggler, mountedComponent } = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        <div className="container">
          <Sidebar theme={theme} themeToggler={themeToggler} />
          <Router>
            <Switch>
              <Route path="/">
                <Overview />
              </Route>
            </Switch>
          </Router>
        </div>
      </>
    </ThemeProvider>
  );
};

export default App;
