import { createContext } from "react";

export const UserContext = createContext({
  userSession: undefined,
  setUserSession: (userSession: any) => userSession,
  userData: undefined,
});
