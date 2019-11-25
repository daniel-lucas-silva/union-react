import React from 'react'

import {UsersStore} from "./UsersStore";
import {AuthStore} from "./AuthStore";

export const store = {
  authStore: new AuthStore("auth"),
  usersStore: new UsersStore("users")
};

export const storesContext = React.createContext(store);

export const useStores = () => React.useContext(storesContext);
