import { createContext, useContext } from "react";

type IProfile = { [key: string]: string | Array<any> } | null;

interface IAuth {
  isSign: boolean;
  profile: IProfile;
}

interface IAuthProvider {
  children: JSX.Element | JSX.Element[];
}

const AuthContext = createContext<IAuth>({
  isSign: false,
  profile: null,
});

const AuthProvider = ({ children }: IAuthProvider) => {
  const profile: IProfile = {
    name: "홍길동",
    data: [],
  };

  return (
    <AuthContext.Provider
      value={{ isSign: profile !== null, profile: profile }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
