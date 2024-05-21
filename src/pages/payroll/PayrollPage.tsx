import { Breadcrumb, Button, CustomFlowbiteTheme, Table } from "flowbite-react";
import {
  ROUTE_CREATE_PAYROLL_URL,
  ROUTE_HOME_URL,
  ROUTE_PAYROLL_DETAILS_PREFIX,
  ROUTE_PAYROLL_URL,
} from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { GET_LIST_PAYROLLS } from "../../constants/endpoints/payrolls";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Payroll } from "../../constants/types/payroll";
import axios from "axios";
import { useMiddleware } from "../../hooks/useMiddleware";

const PayrollPage = () => {
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);

  useMiddleware("economia");

  useEffect(() => {
    // llamada a la api
    axios.get(GET_LIST_PAYROLLS).then(({ data }) => setPayrolls(data));
  }, []);

  const customTheme: CustomFlowbiteTheme["table"] = {
    root: {
      base: "w-full text-left text-sm text-gray-500 dark:text-gray-400",
      shadow:
        "absolute left-0 top-0 -z-10 h-full w-full rounded-lg bg-white drop-shadow-md dark:bg-black",
      wrapper: "relative",
    },
    head: {
      base: "group/head text-xs uppercase text-gray-700 dark:text-gray-400",
      cell: {
        base: "bg-accent-700 px-6 py-3 group-first/head:first:rounded-tl-lg group-first/head:last:rounded-tr-lg dark:bg-gray-700",
      },
    },
  };

  return (
    <>
      <div className="overflow-x-auto">
        <div className="flex mt-2 mb-10 p-3 rounded-md bg-gray-50 dark:bg-gray-800 items-center justify-between">
          <Breadcrumb className="mx-4">
            <Breadcrumb.Item icon={HiHome}>
              <Link to={ROUTE_HOME_URL}>Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={ROUTE_PAYROLL_URL}>Nóminas</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Button color="success" size="xs" href={ROUTE_CREATE_PAYROLL_URL}>
            Agregar nómina
          </Button>
        </div>
        <Table theme={customTheme}>
          <Table.Head>
            <Table.HeadCell className="text-center">ID</Table.HeadCell>
            <Table.HeadCell className="text-center">Mes / Año</Table.HeadCell>
            <Table.HeadCell className="text-center">Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {payrolls.length > 0 ? (
              payrolls.map((payroll, i) => {
                return (
                  <Table.Row
                    key={i}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                      {payroll.id}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {`${payroll.month} de ${payroll.year}`}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center gap-4">
                        <Link
                          to={`${ROUTE_PAYROLL_DETAILS_PREFIX}/${payroll.id}`}
                        >
                          <button
                            type="button"
                            className="font-medium text-cyan-600 dark:text-cyan-500"
                          >
                            Ver detalles
                          </button>
                        </Link>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="text-center bg-gray-50" colSpan={3}>
                  No hay nóminas disponibles
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default PayrollPage;
