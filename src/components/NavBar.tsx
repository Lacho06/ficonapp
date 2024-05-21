import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { ROUTE_HOME_URL, ROUTE_USERS_URL } from "../constants/routes/routes";

import { APP_NAME } from "../constants/app";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const NavBar = () => {
  const { user, signOut } = useLogin();
  return (
    <Navbar
      className="sticky top-0 left-0 right-0 z-50 shadow-md shadow-primary-400 bg-primary-200 text-white"
      fluid
    >
      <Navbar.Brand href={ROUTE_HOME_URL}>
        {/* <img src="/favicon.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite React Logo" /> */}
        <span className="self-center whitespace-nowrap text-3xl font-semibold dark:text-white">
          {APP_NAME}
        </span>
      </Navbar.Brand>
      {user && user.role === "admin" && (
        <Link to={ROUTE_USERS_URL}>Panel administrativo</Link>
      )}
      <div className="flex md:order-2">
        {user && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt={`Foto de perfil del usuario ${user.name}`}
                img="https://github.com/Lacho06.png"
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm">{user.name}</span>
              <span className="block truncate text-sm font-medium">
                {user.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item onClick={() => signOut()}>Sign out</Dropdown.Item>
          </Dropdown>
        )}
        <Navbar.Toggle className="text-accent-400 hover:text-accent-100" />
      </div>
    </Navbar>
  );
};

export default NavBar;
