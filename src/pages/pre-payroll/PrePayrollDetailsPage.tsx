import { Breadcrumb, CustomFlowbiteTheme, Table } from "flowbite-react";
import { Link, useParams } from "react-router-dom";
import {
  ROUTE_HOME_URL,
  ROUTE_PRE_PAYROLL_DETAILS_PREFIX,
  ROUTE_PRE_PAYROLL_URL,
} from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { GET_PRE_PAYROLL_WORKERS_BY_ID } from "../../constants/endpoints/prepayroll";
import { HiHome } from "react-icons/hi";
import { PrePayrollTable } from "../../constants/types/prepayroll";
import axios from "axios";

const PrePayrollDetailsPage = () => {
  const { id } = useParams();
  const [prePayrollDetails, setPrePayrollDetails] = useState<PrePayrollTable>();

  useEffect(() => {
    axios.get(`${GET_PRE_PAYROLL_WORKERS_BY_ID}/${id}`).then(({ data }) => {
      setPrePayrollDetails(data);
    });
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
      <div className="overflow-x-auto grid grid-cols-12 gap-2">
        <div className="col-span-12 flex mt-2 mb-10 p-3 rounded-md bg-gray-50 dark:bg-gray-800 items-center justify-between">
          <Breadcrumb className="mx-4">
            <Breadcrumb.Item icon={HiHome}>
              <Link to={ROUTE_HOME_URL}>Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={ROUTE_PRE_PAYROLL_URL}>Prenóminas</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`${ROUTE_PRE_PAYROLL_DETAILS_PREFIX}/${id}`}>
                {`${prePayrollDetails?.month} de ${prePayrollDetails?.year}`}
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="overflow-x-auto col-span-12">
          <Table theme={customTheme}>
            <Table.Head>
              <Table.HeadCell colSpan={12} className="text-center">
                Prenómina
              </Table.HeadCell>
            </Table.Head>
            <Table.Head>
              <Table.HeadCell className="text-center">Código</Table.HeadCell>
              <Table.HeadCell className="text-center">
                CI - Nombres (Categ. Ocup.)
              </Table.HeadCell>
              <Table.HeadCell className="text-center">H. Trab</Table.HeadCell>
              <Table.HeadCell className="text-center">H.N. Trab</Table.HeadCell>
              <Table.HeadCell className="text-center">Impunt.</Table.HeadCell>
              <Table.HeadCell className="text-center">Días Vac.</Table.HeadCell>
              <Table.HeadCell className="text-center">
                Horas Certif.
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Hrs. Lic.Matern.
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Hrs. Resol.
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Hrs. Interr.
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Otro Tpo a Pagar
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Hrs. Extras
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {prePayrollDetails && prePayrollDetails.workers.length > 0 ? (
                prePayrollDetails.workers.map((prePayrollWorker, i) => {
                  return (
                    <Table.Row
                      key={i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                        {prePayrollWorker.code}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {`${prePayrollWorker.ci} - ${prePayrollWorker.name} (${prePayrollWorker.occupation.name})`}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {prePayrollWorker.hTrab}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {prePayrollWorker.hNoTrab}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {prePayrollWorker.impunt}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {prePayrollWorker.diasVac}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {prePayrollWorker.hrsCertif}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {prePayrollWorker.hrsLicMatern}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {prePayrollWorker.hrsResol}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {prePayrollWorker.hrsInterr}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {prePayrollWorker.otroTpoPagar}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {prePayrollWorker.hrsExtras}
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="text-center bg-gray-50" colSpan={12}>
                    No hay prenóminas disponibles
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      </div>
    </>
  );
};

export default PrePayrollDetailsPage;
