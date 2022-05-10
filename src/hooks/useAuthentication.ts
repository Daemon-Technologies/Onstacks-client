import { getUserData, UserSession } from "@stacks/connect-react";

import { useEffect, useState } from "react";

export default function useAuthentication() {
  const [userSession, setUserSession] = useState<any>(new UserSession());
  const [userData, setUserData] = useState<any>();

  useEffect(() => {
    getUserData().then((d) => {
      setUserData(d);
    });
  }, []);

  return {
    userData,
    userSession,
    setUserData,
    setUserSession,
  };
}
