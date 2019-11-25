import React, {useState} from 'react';

import AppContainer from "./containers/AppContainer";
import {IUser, Role} from "./models/user";

export interface IAuthContext {
  user?: IUser | undefined;
  role?: Role;
  login?: () => void;
  logout?: () => void;
}

export const AuthContext = React.createContext<IAuthContext>({});

export default function App() {

  const [user, setUser] = useState<IUser>();
  const [role, setRole] = useState<Role>("GUEST");

  const value: IAuthContext = {
    user,
    role,
    login() {
      console.log("aqui");
    },
    logout: () => {
      setRole("GUEST");
      setUser(undefined);
    },
  };


  return (
    <AuthContext.Provider value={value}>
      <AppContainer />
    </AuthContext.Provider>
  );
}
