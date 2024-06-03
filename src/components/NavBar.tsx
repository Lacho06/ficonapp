import { Avatar, Dropdown, Navbar } from "flowbite-react";
import {
  ROUTE_AREAS_URL,
  ROUTE_DEPARTMENTS_URL,
  ROUTE_HOME_URL,
  ROUTE_OCCUPATIONS_URL,
  ROUTE_PAYROLL_URL,
  ROUTE_PRE_PAYROLL_URL,
  ROUTE_TAX_URL,
  ROUTE_USERS_URL,
  ROUTE_WORKERS_URL,
} from "../constants/routes/routes";

import { APP_NAME } from "../constants/app";
import { Fragment } from "react/jsx-runtime";
import { Link } from "react-router-dom";
import { MdDashboard } from "react-icons/md";
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
        <Fragment>
          <div className="hidden md:block m-auto">
            <Link
              to={ROUTE_USERS_URL}
              className="text-accent-400 flex items-center gap-2 md:text-white hover:text-accent-400"
            >
              <MdDashboard />
              Panel administrativo
            </Link>
          </div>
          <div className="md:hidden m-auto">
            <Link
              to={ROUTE_USERS_URL}
              className="text-accent-400 md:text-white hover:text-accent-400"
            >
              <MdDashboard />
            </Link>
          </div>
        </Fragment>
      )}
      <div className="flex md:order-2">
        {user && (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt={`Foto de perfil del usuario ${user.name}`}
                img={
                  user.image && user.image !== ""
                    ? user.image
                    : "../../src/assets/icons/user.svg"
                }
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
        <Navbar.Toggle className="text-accent-400 hover:text-accent-100 ml-2 md:ml-4" />
      </div>
      <Navbar.Collapse className="md:hidden">
        {user && user.role === "admin" && (
          <Fragment>
            <Navbar.Link className="text-accent-300" href={ROUTE_USERS_URL}>
              Usuarios
            </Navbar.Link>
          </Fragment>
        )}
        {user && user.role === "rec. humanos" && (
          <Fragment>
            <Navbar.Link className="text-accent-300" href={ROUTE_WORKERS_URL}>
              Plantilla
            </Navbar.Link>
            <Navbar.Link
              className="text-accent-300"
              href={ROUTE_OCCUPATIONS_URL}
            >
              Cargos
            </Navbar.Link>
            <Navbar.Link
              className="text-accent-300"
              href={ROUTE_DEPARTMENTS_URL}
            >
              Departamentos
            </Navbar.Link>
            <Navbar.Link className="text-accent-300" href={ROUTE_AREAS_URL}>
              Áreas
            </Navbar.Link>
            <Navbar.Link
              className="text-accent-300"
              href={ROUTE_PRE_PAYROLL_URL}
            >
              Prenómina
            </Navbar.Link>
          </Fragment>
        )}
        {user && user.role === "economia" && (
          <Fragment>
            <Navbar.Link className="text-accent-300" href={ROUTE_TAX_URL}>
              Impuestos
            </Navbar.Link>
            <Navbar.Link className="text-accent-300" href={ROUTE_PAYROLL_URL}>
              Nómina
            </Navbar.Link>
          </Fragment>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
