// eslint-disable-next-line
import React, { useState } from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/client";
import { useDarkMode } from "./components/useDarkMode.js";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";
import useAmplitude from "./hooks/useAmplitude";
import { Routers } from "./routers";
import { createMiningMonitorClient } from "./graphql/client";

const App: React.FC = () => {
  const { theme, themeToggler, mountedComponent } = useDarkMode();
  const { logEvent } = useAmplitude();
  const [client] = useState(createMiningMonitorClient());
  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;
  logEvent("Logged App Event");

  return (
    <ThemeProvider theme={themeMode}>
      <ApolloProvider client={client}>
        <GlobalStyles theme={themeMode} />
        <Routers theme={theme} themeToggler={themeToggler} />
      </ApolloProvider>
    </ThemeProvider>
  );
};

export default App;
