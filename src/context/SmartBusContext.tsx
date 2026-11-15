import React, { createContext, useContext } from 'react';

const SmartBusContext = createContext({});

export const SmartBusProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SmartBusContext.Provider value={{}}>
      {children}
    </SmartBusContext.Provider>
  );
};
 
export const useSmartBus = () => useContext(SmartBusContext);