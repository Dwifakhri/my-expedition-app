"use client";
import React, { useContext, useState } from "react";

interface StatusContextProps {
  status: object;
  setStatus: (status: object) => void;
}

const StatusContext = React.createContext<StatusContextProps>({
  status: {
    current: "",
    message: "",
  },
  setStatus: () => {},
});

export const ContextProvider = ({ children }: any) => {
  const [status, setStatus] = useState<Object>({ current: "", message: "" });

  return (
    <StatusContext.Provider
      value={{
        status: status,
        setStatus: setStatus,
      }}>
      {children}
    </StatusContext.Provider>
  );
};

export const useStatus = () => useContext(StatusContext);
