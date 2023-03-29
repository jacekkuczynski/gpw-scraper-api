import { useState, useCallback, useEffect } from "react";

export const useLoadScreen = () => {
  const [userActive, setUserActive] = useState(false);

  const launchApp = useCallback(() => {
    if (!userActive) setUserActive(true);
  }, [userActive]);

  useEffect(() => {
    window.addEventListener("mousemove", launchApp);

    return () => {
      window.removeEventListener("mousemove", launchApp);
    };
  }, [launchApp]);

  useEffect(() => {
    window.addEventListener("keydown", launchApp);

    return () => {
      window.removeEventListener("keydown", launchApp);
    };
  }, [launchApp]);

  return { userActive };
};
