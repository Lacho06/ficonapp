import { ROUTE_HOME_URL } from "../constants/routes/routes";
import { UserRole } from "../constants/types/user";
import { useEffect } from "react";
import { useLogin } from "./useLogin";
import { useNavigate } from "react-router-dom";

export function useMiddleware(role: UserRole) {
  const { user } = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== role) {
      navigate(ROUTE_HOME_URL);
    }
  }, []);
}
