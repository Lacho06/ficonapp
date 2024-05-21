import { ROUTE_HOME_URL, ROUTE_LOGIN_URL } from "../constants/routes/routes";
import { User, UserFormLogin } from "../constants/types/user";

import { POST_USER_LOGIN } from "../constants/endpoints/user";
import axios from "axios";
import { useAuth } from "react-auth-utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useLogin(initialPath?: string) {
  const { user, isAuthenticated, signIn, signOut } = useAuth<User>();
  const navigate = useNavigate();

  const login = (newUser: UserFormLogin, action: () => void) => {
    // se llama a la api y esta devuelve un JWT
    axios.post(POST_USER_LOGIN, newUser).then(({ data }) => {
      const JWT = data.jwt;
      signIn(JWT, undefined, {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        password: data.user.password,
        role: data.user.role,
        image: data.user.image,
      });
      action();
    });
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
