import React, { createContext, useState, useContext, ReactNode } from 'react';
import { UserData } from './types/UserTypes'

interface GlobalState {
    token: string;
    profile_picture: string
    // user: UserData
}
export const AppContext = createContext<{
    globalState: GlobalState;
    setGlobalState: React.Dispatch<React.SetStateAction<GlobalState>>;
  }>({
    globalState: { token: '', profile_picture: '' },
    setGlobalState: () => {},
  });

  export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [globalState, setGlobalState] = useState<GlobalState>({
      token: '',
      profile_picture: '',
    });
    return (
      <AppContext.Provider value={{ globalState, setGlobalState }}>
        {children}
      </AppContext.Provider>
    );
  };