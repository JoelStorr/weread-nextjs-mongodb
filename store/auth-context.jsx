'use client'
import { createContext } from "react";

const AuthContext = createContext({
  authPopUp: null,
  showAuthPopUp: function () {},
  hideAuthPopUp: function () {},
});

export function AuthContextProvider(props) {
  return <AuthContext>{props.children}</AuthContext>;
}

export default AuthContextProvider;
