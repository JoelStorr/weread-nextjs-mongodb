'use client'
import { createContext } from "react";

interface AuthInterface {
  authPopUp: null | boolean;
  showAuthPopUp(): void;
  hideAuthPopUp():void;
}

const AuthContext = createContext<AuthInterface>({
  authPopUp: null,
  showAuthPopUp: function () {},
  hideAuthPopUp: function () {},
});

export const AuthContextProvider: React.FC = (props) => {
  return <AuthContext>{props.children}</AuthContext>;
}

export default AuthContextProvider;
