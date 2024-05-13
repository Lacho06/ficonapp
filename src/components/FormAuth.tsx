import { Alert, Button, Label, TextInput } from "flowbite-react";
import { FormEvent, useState } from "react";
import { ROUTE_HOME_URL, ROUTE_LOGIN_URL } from "../constants/routes/routes";

import { ERROR_MESSAGES } from "../constants/app";
import { UserFormLogin } from "../constants/types/user";
import { useLogin } from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const FormAuth = () => {
  const { login } = useLogin(ROUTE_LOGIN_URL);
  const initialUser = {
    email: "",
    password: "",
  };
  const [user, setUser] = useState<UserFormLogin>(initialUser);
  const changeData = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const { email, password } = user;

  const [error, setError] = useState("");

  const validateData = () => {
    let isValidData = true;

    if (email.trim() === "" || password.trim() === "") {
      setError(ERROR_MESSAGES.EMPTY);
      isValidData = false;
    }

    if (!email.trim().includes("@") || password.trim().length < 8) {
      setError(ERROR_MESSAGES.INCORRECT);
      isValidData = false;
    }

    return isValidData;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // se validan los datos
    const isValidData = validateData();

    // si no hay errores se loguea el usuario
    if (isValidData) {
      login(user, () => navigate(ROUTE_HOME_URL));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex sm:w-full max-w-md flex-col gap-4 mx-4 sm:mx-0"
    >
      {error !== "" && (
        <Alert color="failure" onDismiss={() => setError("")} withBorderAccent>
          <span className="font-medium">{error}</span>
        </Alert>
      )}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="email" value="Correo" />
        </div>
        <TextInput
          id="email"
          name="email"
          value={email}
          onChange={changeData}
          type="text"
          placeholder="usuario1"
          required
          shadow
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="password" value="Contraseña" />
        </div>
        <TextInput
          id="password"
          name="password"
          value={password}
          onChange={changeData}
          type="password"
          placeholder="********"
          required
          shadow
        />
      </div>
      <Button
        type="submit"
        className="bg-primary-500 enabled:hover:bg-accent-400"
      >
        Entrar
      </Button>
    </form>
  );
};

export default FormAuth;
