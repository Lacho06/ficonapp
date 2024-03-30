import { CustomFlowbiteTheme, Sidebar } from "flowbite-react"
import { ROUTE_ADMIN_PANEL_URL, ROUTE_USERS_URL } from "../constants/routes/routes";

import { Link } from 'react-router-dom';

const SideBar = () => {

    const customTheme: CustomFlowbiteTheme["sidebar"] = {
        "root": {
            "inner": 'fixed top-0 left-0 bottom-0 overflow-y-auto overflow-x-hidden rounded px-3 pt-20 pb-4 bg-accent-500 dark:bg-gray-800'
        },
        "item": {
            "base": 'flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-800 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700 cursor-pointer'
        }
    }

    return (
        <Sidebar theme={customTheme}>
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    <Link to={ROUTE_ADMIN_PANEL_URL}>
                        <Sidebar.Item>
                            Panel Administrativo
                        </Sidebar.Item>
                    </Link>
                    <Link to={ROUTE_USERS_URL}>
                        <Sidebar.Item>
                            Usuarios
                        </Sidebar.Item>
                    </Link>
                    <Link to={ROUTE_ADMIN_PANEL_URL}>
                        <Sidebar.Item>
                            Plantilla
                        </Sidebar.Item>
                    </Link>
                    <Link to={ROUTE_ADMIN_PANEL_URL}>
                        <Sidebar.Item>
                            Cargos
                        </Sidebar.Item>
                    </Link>
                    <Link to={ROUTE_ADMIN_PANEL_URL}>
                        <Sidebar.Item>
                            Departamentos
                        </Sidebar.Item>
                    </Link>
                    <Link to={ROUTE_ADMIN_PANEL_URL}>
                        <Sidebar.Item>
                            Areas
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup>
                    <Link to={ROUTE_ADMIN_PANEL_URL}>
                        <Sidebar.Item>
                            Impuestos
                        </Sidebar.Item>
                    </Link>
                    <Link to={ROUTE_ADMIN_PANEL_URL}>
                        <Sidebar.Item>
                            Configuraciones
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}

export default SideBar