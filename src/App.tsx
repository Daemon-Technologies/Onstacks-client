// eslint-disable-next-line
import React from "react";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode.js";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";
import useAmplitude from "./hooks/useAmplitude";
import { Routers } from "./routers";

const App: React.FC = () => {
  const { theme, themeToggler, mountedComponent } = useDarkMode();
  const { logEvent } = useAmplitude();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;
  logEvent("Logged App Event");

  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles theme={themeMode} />
        <Routers theme={theme} themeToggler={themeToggler} />
      </>
    </ThemeProvider>
  );
};

export default App;
