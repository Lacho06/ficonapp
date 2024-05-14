import { Breadcrumb, Button, CustomFlowbiteTheme, Table } from "flowbite-react";
import {
  ROUTE_CREATE_PRE_PAYROLL_URL,
  ROUTE_HOME_URL,
  ROUTE_PRE_PAYROLL_DETAILS_PREFIX,
  ROUTE_PRE_PAYROLL_URL,
} from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { GET_LIST_PRE_PAYROLLS } from "./../../constants/endpoints/prepayroll";
import { HiHome } from "react-icons/hi";
import { Link } from "react-router-dom";
import { PrePayroll } from "../../constants/types/prepayroll";
import axios from "axios";

// const initialNewPrepayrollWorker: PrePayrollWorker = {
//   hoursWorked: -1,
//   hoursNotWorked: -1,
//   tardiness: -1,
//   hoursCertificate: -1,
//   hoursMaternityLicence: -1,
//   hoursResolution: -1,
//   hoursInterrupted: -1,
//   hoursExtra: -1,
//   anotherTpoPay: -1,
//   vacationDays: -1,
//   prepayrollId: -1,
//   workerId: -1,
// };

// type ErrorPrePayrollWorkerFields = {
//   hoursWorked: string;
//   hoursNotWorked: string;
//   tardiness: string;
//   hoursCertificate: string;
//   hoursMaternityLicence: string;
//   hoursResolution: string;
//   hoursInterrupted: string;
//   hoursExtra: string;
//   anotherTpoPay: string;
//   vacationDays: string;
//   prepayrollId: string;
//   workerId: string;
// };

const PrePayrollPage = () => {
  const [prePayrolls, setPrePayrolls] = useState<PrePayroll[]>([]);
  // const [error, setError] = useState<ErrorPrePayrollWorkerFields>({
  //   hoursWorked: "",
  //   hoursNotWorked: "",
  //   tardiness: "",
  //   hoursCertificate: "",
  //   hoursMaternityLicence: "",
  //   hoursResolution: "",
  //   hoursInterrupted: "",
  //   hoursExtra: "",
  //   anotherTpoPay: "",
  //   vacationDays: "",
  //   prepayrollId: "",
  //   workerId: "",
  // });

  useEffect(() => {
    // llamada a la api
    axios.get(GET_LIST_PRE_PAYROLLS).then(({ data }) => setPrePayrolls(data));
  }, []);

  // const createNewOccupation = () => {
  //   // validar los datos
  //   let newError = {
  //     name: "",
  //     salary: "",
  //   };

  //   if (newOccupation.name.trim() === "") {
  //     newError = {
  //       ...newError,
  //       name: ERROR_MESSAGES.EMPTY_FIELD,
  //     };
  //     setError(newError);
  //   } else {
  //     newError = {
  //       ...newError,
  //       name: "",
  //     };
  //     setError(newError);
  //   }

  //   if (newOccupation.salary === -1) {
  //     newError = {
  //       ...newError,
  //       salary: ERROR_MESSAGES.EMPTY_FIELD,
  //     };
  //     setError(newError);
  //   } else if (
  //     newOccupation.salary < 0 ||
  //     Number.parseFloat(newOccupation.salary.toString()) < 0
  //   ) {
  //     newError = {
  //       ...newError,
  //       salary: ERROR_MESSAGES.INCORRECT_FIELD,
  //     };
  //     setError(newError);
  //   } else {
  //     newError = {
  //       ...newError,
  //       salary: "",
  //     };
  //     setError(newError);
  //   }

  //   if (newError.name === "" && newError.salary === "") {
  //     // todo llamada a la api para obtener un id disponible
  //     const newId = 100;
  //     setOccupations([...occupations, { id: newId, ...newOccupation }]);
  //     setNewOccupation(initialNewOccupation);
  //     closeModalAdd();
  //   }
  // };

  // const editOccupation = () => {
  //   if (!occupationSelected) return;
  //   // validar los datos
  //   let newError = {
  //     name: "",
  //     salary: "",
  //   };

  //   if (occupationSelected.name.trim() === "") {
  //     newError = {
  //       ...newError,
  //       name: ERROR_MESSAGES.EMPTY_FIELD,
  //     };
  //     setError(newError);
  //   } else {
  //     newError = {
  //       ...newError,
  //       name: "",
  //     };
  //     setError(newError);
  //   }

  //   if (occupationSelected.salary === -1) {
  //     newError = {
  //       ...newError,
  //       salary: ERROR_MESSAGES.EMPTY_FIELD,
  //     };
  //     setError(newError);
  //   } else if (
  //     occupationSelected.salary < 0 ||
  //     Number.parseFloat(occupationSelected.salary.toString()) < 0
  //   ) {
  //     newError = {
  //       ...newError,
  //       salary: ERROR_MESSAGES.INCORRECT_FIELD,
  //     };
  //     setError(newError);
  //   } else {
  //     newError = {
  //       ...newError,
  //       salary: "",
  //     };
  //     setError(newError);
  //   }

  //   if (newError.name === "" && newError.salary === "") {
  //     // todo llamada a la api para modificar los datos
  //     const occupationsFiltered = occupations.filter(
  //       (occupation) => occupation.id !== occupationSelected.id
  //     );
  //     const sortedOccupations = [
  //       ...occupationsFiltered,
  //       occupationSelected,
  //     ].sort((a: Occupation, b: Occupation) => a.id - b.id);
  //     setOccupations(sortedOccupations);
  //     setOccupationSelected(undefined);
  //     closeModalEdit();
  //   }
  // };

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
              <Link to={ROUTE_PRE_PAYROLL_URL}>Prenóminas</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Button color="success" size="xs" href={ROUTE_CREATE_PRE_PAYROLL_URL}>
            Agregar prenómina
          </Button>
        </div>
        <Table theme={customTheme}>
          <Table.Head>
            <Table.HeadCell className="text-center">ID</Table.HeadCell>
            <Table.HeadCell className="text-center">Mes / Año</Table.HeadCell>
            <Table.HeadCell className="text-center">Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {prePayrolls.length > 0 ? (
              prePayrolls.map((prePayroll, i) => {
                return (
                  <Table.Row
                    key={i}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                      {prePayroll.id}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {`${prePayroll.month} de ${prePayroll.year}`}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center gap-4">
                        <Link
                          to={`${ROUTE_PRE_PAYROLL_DETAILS_PREFIX}/${prePayroll.id}`}
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
                  No hay prenóminas disponibles
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>
    </>
  );
};

export default PrePayrollPage;
