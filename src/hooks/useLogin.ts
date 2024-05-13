import { ROUTE_HOME_URL, ROUTE_LOGIN_URL } from "../constants/routes/routes";
import { User, UserFormLogin } from "../constants/types/user";

import { useAuth } from "react-auth-utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useLogin(initialPath?: string) {
  const { user, isAuthenticated, signIn, signOut } = useAuth<User>();
  const navigate = useNavigate();

  const login = (newUser: UserFormLogin, action: () => void) => {
    // todo se llama a la api y esta devuelve un JWT
    const JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.";
    signIn(JWT, undefined, {
      id: 1,
      name: "Ejemplo",
      email: newUser.email,
      password: newUser.password,
      role: "user",
      image: "",
    });
    action();
  };

  useEffect(() => {
    if (
      !isAuthenticated &&
      initialPath !== ROUTE_HOME_URL &&
      initialPath !== ROUTE_LOGIN_URL
    ) {
      navigate(ROUTE_LOGIN_URL);
    }
    if (isAuthenticated && initialPath === ROUTE_LOGIN_URL) {
      navigate(ROUTE_HOME_URL);
    }
  }, [isAuthenticated, initialPath]);

  return { user, isAuthenticated, login, signOut };
}
