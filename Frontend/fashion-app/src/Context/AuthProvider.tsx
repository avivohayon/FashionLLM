import { useState, createContext, ReactNode } from "react";

type AuthProviderProps = {
  children: ReactNode;
};

export type AuthContextType = {
  auth: UserAuthProps;
  setAuth: (prev: (authData: UserAuthProps) => UserAuthProps) => void;
};

export type UserAuthProps = {
  username: string;
  password: string;
  accessToken: string;
  refreshToken?: string;
  roles: number[];
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<UserAuthProps>({
    username: "",
    password: "",
    accessToken: "",
    refreshToken: "",
    roles: [],
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
