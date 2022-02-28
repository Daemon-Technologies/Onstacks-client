// eslint-disable-next-line
import React from "react";
import { ThemeProvider } from "styled-components";
import { useDarkMode } from "./components/useDarkMode.js";
import { GlobalStyles } from "./components/Globalstyle";
import { lightTheme, darkTheme } from "./components/Themes";
import useAmplitude from "./hooks/useAmplitude";
import { Routers } from "./routers";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const { theme, themeToggler, mountedComponent } = useDarkMode();
  const { logEvent } = useAmplitude();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  if (!mountedComponent) return <div />;
  logEvent("Logged App Event");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={themeMode}>
        <>
          <GlobalStyles theme={themeMode} />
          <Routers theme={theme} themeToggler={themeToggler} />
        </>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
