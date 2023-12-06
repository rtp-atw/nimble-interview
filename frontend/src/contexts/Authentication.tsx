import { COOKIE_KEY } from "@/hooks";
import { Cookie } from "@/utils/cookie";
import { useRouter } from "next/router";
import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

type Profile = {
  id: number;
  uuid: string;
  email: string;
  token: string;
  exp: number;
};

const defaultProfile: Profile = {
  id: 0,
  uuid: "",
  email: "",
  token: "",
  exp: new Date().getTime(),
};

type AuthicationContextValue = {
  profile?: Profile;
  jwt?: string;
  loading?: boolean;
  onLogout: () => void;
};

const defaulContextValues: AuthicationContextValue = {
  profile: defaultProfile,
  loading: false,
  onLogout: () => {},
};
export const AuthenticationContext = createContext(defaulContextValues);
export const AuthenticationProvider: FC<PropsWithChildren> = ({ children }) => {
  const router = useRouter();

  const [ctx, setCtx] = useState<AuthicationContextValue>(defaulContextValues);

  const cookieJWT = Cookie.get(COOKIE_KEY);

  const handleLogout = useCallback(() => {
    router
      .push("/")
      .then(() => Cookie.remove(COOKIE_KEY))
      .catch(() => Cookie.remove(COOKIE_KEY));
  }, [router]);

  const ctxValues = useMemo(() => {
    return { ...ctx, onLogout: handleLogout, jwt: cookieJWT };
  }, [cookieJWT, ctx, handleLogout]);

  return (
    <AuthenticationContext.Provider value={ctxValues}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationProvider;
