import { CustomFlowbiteTheme, Sidebar } from "flowbite-react";
import {
  ROUTE_AREAS_URL,
  ROUTE_OCCUPATIONS_URL,
  ROUTE_PAYROLL_URL,
  ROUTE_PRE_PAYROLL_URL,
  ROUTE_TAX_URL,
  ROUTE_USERS_URL,
  ROUTE_WORKERS_URL,
} from "../constants/routes/routes";

import { Link } from "react-router-dom";
import { ROUTE_DEPARTMENTS_URL } from "./../constants/routes/routes";
import { useLogin } from "../hooks/useLogin";

const SideBar = () => {
  const { user, isAuthenticated } = useLogin();

  const customTheme: CustomFlowbiteTheme["sidebar"] = {
    root: {
      inner:
        "fixed top-0 left-0 bottom-0 overflow-y-auto overflow-x-hidden rounded px-3 pt-20 pb-4 bg-accent-500 dark:bg-gray-800",
    },
    item: {
      base: "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer",
    },
  };

  return (
    <Sidebar theme={customTheme}>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item className="hover:bg-transparent cursor-default mb-3">
            Panel Administrativo
          </Sidebar.Item>
          {isAuthenticated && user?.role === "admin" && (
            <Link to={ROUTE_USERS_URL}>
              <Sidebar.Item>Usuarios</Sidebar.Item>
            </Link>
          )}
          {isAuthenticated && user?.role === "economia" && (
            <>
              <Link to={ROUTE_TAX_URL}>
                <Sidebar.Item>Impuestos</Sidebar.Item>
              </Link>
              <Link to={ROUTE_PAYROLL_URL}>
                <Sidebar.Item>Nómina</Sidebar.Item>
              </Link>
            </>
          )}
          {isAuthenticated && user?.role === "rec. humanos" && (
            <>
              <Link to={ROUTE_WORKERS_URL}>
                <Sidebar.Item>Plantilla</Sidebar.Item>
              </Link>
              <Link to={ROUTE_OCCUPATIONS_URL}>
                <Sidebar.Item>Cargos</Sidebar.Item>
              </Link>
              <Link to={ROUTE_DEPARTMENTS_URL}>
                <Sidebar.Item>Departamentos</Sidebar.Item>
              </Link>
              <Link to={ROUTE_AREAS_URL}>
                <Sidebar.Item>Areas</Sidebar.Item>
              </Link>
              <Link to={ROUTE_PRE_PAYROLL_URL}>
                <Sidebar.Item>Prenómina</Sidebar.Item>
              </Link>
            </>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default SideBar;
