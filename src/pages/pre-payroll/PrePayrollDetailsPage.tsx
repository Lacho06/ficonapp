import { Breadcrumb, CustomFlowbiteTheme, Table } from "flowbite-react";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  PrePayrollTable,
  PrePayrollWorkerTable,
} from "../../constants/types/prepayroll";
import {
  ROUTE_HOME_URL,
  ROUTE_PRE_PAYROLL_DETAILS_PREFIX,
  ROUTE_PRE_PAYROLL_URL,
} from "../../constants/routes/routes";

import { GET_PRE_PAYROLL_WORKERS_BY_ID } from "../../constants/endpoints/prepayroll";
import { HiHome } from "react-icons/hi";
import axios from "axios";
import { getLimitDay } from "../../services/app";
import { getNumberMonth } from "./../../services/app";
import { useMiddleware } from "../../hooks/useMiddleware";

const PrePayrollDetailsPage = () => {
  const { id } = useParams();
  const [prePayrollDetails, setPrePayrollDetails] = useState<PrePayrollTable>();

  useMiddleware("rec. humanos");

  useEffect(() => {
    axios.get(`${GET_PRE_PAYROLL_WORKERS_BY_ID}/${id}`).then(({ data }) => {
      setPrePayrollDetails(data);
    });
  }, []);

  useEffect(() => {
    if (prePayrollDetails) {
      sortPrePayrollWorkers(prePayrollDetails.workers);
    }
  }, [prePayrollDetails]);

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

  const sortPrePayrollWorkers = (
    prePayrollWorkers: PrePayrollWorkerTable[]
  ) => {
    prePayrollWorkers.sort(
      (a: PrePayrollWorkerTable, b: PrePayrollWorkerTable) => {
        if (a.area.code > b.area.code) {
          return 1;
        }
        if (a.area.code < b.area.code) {
          return -1;
        }
        if (a.area.code === b.area.code) {
          if (a.department.code > b.department.code) {
            return 1;
          }
          if (a.department.code < b.department.code) {
            return -1;
          }
        }

        return 0;
      }
    );
  };

  const getTotalDepartments = (prePayrollWorker: PrePayrollWorkerTable) => {
    if (!prePayrollDetails) return [];
    let totalHTrab = 0;
    let totalHNoTrab = 0;
    let totalImpunt = 0;
    let totalDiasVac = 0;
    let totalHrsCertif = 0;
    let totalHrsLicMatern = 0;
    let totalHrsResol = 0;
    let totalHrsInterr = 0;
    let totalOtroTpoPagar = 0;
    let totalHrsExtras = 0;

    const prePayrollWorkersFiltereds = prePayrollDetails.workers.filter(
      (worker) =>
        worker.department.code === prePayrollWorker.department.code &&
        worker.area.code === prePayrollWorker.area.code
    );
    prePayrollWorkersFiltereds.map((worker) => {
      totalHTrab += worker.hTrab;
      totalHNoTrab += worker.hNoTrab;
      totalImpunt += worker.impunt;
      totalDiasVac += worker.diasVac;
      totalHrsCertif += worker.hrsCertif;
      totalHrsLicMatern += worker.hrsLicMatern;
      totalHrsResol += worker.hrsResol;
      totalHrsInterr += worker.hrsInterr;
      totalOtroTpoPagar += worker.otroTpoPagar;
      totalHrsExtras += worker.hrsExtras;
    });

    return [
      totalHTrab,
      totalHNoTrab,
      totalImpunt,
      totalDiasVac,
      totalHrsCertif,
      totalHrsLicMatern,
      totalHrsResol,
      totalHrsInterr,
      totalOtroTpoPagar,
      totalHrsExtras,
    ];
  };
  const getTotalAreas = (prePayrollWorker: PrePayrollWorkerTable) => {
    if (!prePayrollDetails) return [];
    let totalHTrab = 0;
    let totalHNoTrab = 0;
    let totalImpunt = 0;
    let totalDiasVac = 0;
    let totalHrsCertif = 0;
    let totalHrsLicMatern = 0;
    let totalHrsResol = 0;
    let totalHrsInterr = 0;
    let totalOtroTpoPagar = 0;
    let totalHrsExtras = 0;

    const prePayrollWorkersFiltereds = prePayrollDetails.workers.filter(
      (worker) => worker.area.code === prePayrollWorker.area.code
    );
    prePayrollWorkersFiltereds.map((worker) => {
      totalHTrab += worker.hTrab;
      totalHNoTrab += worker.hNoTrab;
      totalImpunt += worker.impunt;
      totalDiasVac += worker.diasVac;
      totalHrsCertif += worker.hrsCertif;
      totalHrsLicMatern += worker.hrsLicMatern;
      totalHrsResol += worker.hrsResol;
      totalHrsInterr += worker.hrsInterr;
      totalOtroTpoPagar += worker.otroTpoPagar;
      totalHrsExtras += worker.hrsExtras;
    });

    return [
      totalHTrab,
      totalHNoTrab,
      totalImpunt,
      totalDiasVac,
      totalHrsCertif,
      totalHrsLicMatern,
      totalHrsResol,
      totalHrsInterr,
      totalOtroTpoPagar,
      totalHrsExtras,
    ];
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
              <Table.HeadCell colSpan={8} className="text-center">
                {`Desde 1/${
                  prePayrollDetails && getNumberMonth(prePayrollDetails.month)
                }/${prePayrollDetails?.year} - Hasta ${
                  prePayrollDetails && getLimitDay(prePayrollDetails.month)
                }/${
                  prePayrollDetails && getNumberMonth(prePayrollDetails.month)
                }/${prePayrollDetails?.year}`}
              </Table.HeadCell>
              <Table.HeadCell colSpan={4} className="text-center">
                SC-4-05
              </Table.HeadCell>
            </Table.Head>
            <Table.Head>
              <Table.HeadCell colSpan={12} className="text-center">
                Prenómina
              </Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {prePayrollDetails && prePayrollDetails.workers.length > 0 ? (
                prePayrollDetails.workers.map((prePayrollWorker, i, array) => {
                  if (
                    i === 0 ||
                    (i > 0 &&
                      prePayrollWorker.area.code !== array[i - 1].area.code)
                  ) {
                    // primera iteracion y primer elemento de diferente area
                    return (
                      <Fragment key={i}>
                        <Table.Row className="bg-accent-700 dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell
                            colSpan={12}
                            className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white"
                          >
                            {`Área: ${prePayrollWorker.area.code} ${prePayrollWorker.area.name}`}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-accent-700 dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell
                            colSpan={12}
                            className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white"
                          >
                            {`Departamento: ${prePayrollWorker.department.code} ${prePayrollWorker.department.name}`}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-accent-700 dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="text-center font-bold">
                            Código
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            CI - Nombres (Categ. Ocup.)
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            H. Trab
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            H.N. Trab
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Impunt.
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Días Vac.
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Horas Certif.
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Hrs. Lic.Matern.
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Hrs. Resol.
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Hrs. Interr.
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Otro Tpo a Pagar
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Hrs. Extras
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                      </Fragment>
                    );
                  } else if (
                    i > 0 &&
                    prePayrollWorker.area.code === array[i - 1].area.code &&
                    prePayrollWorker.department.code !==
                      array[i - 1].department.code
                  ) {
                    // primer elemento de la misma area pero diferente departamento
                    return (
                      <Fragment key={i}>
                        <Table.Row className="bg-accent-700 dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell
                            colSpan={12}
                            className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white"
                          >
                            {`Departamento: ${prePayrollWorker.department.code} ${prePayrollWorker.department.name}`}
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-accent-700 dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell className="text-center font-bold">
                            Código
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            CI - Nombres (Categ. Ocup.)
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            H. Trab
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            H.N. Trab
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Impunt.
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Días Vac.
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Horas Certif.
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Hrs. Lic.Matern.
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Hrs. Resol.
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Hrs. Interr.
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Otro Tpo a Pagar
                          </Table.Cell>
                          <Table.Cell className="text-center font-bold">
                            Hrs. Extras
                          </Table.Cell>
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                      </Fragment>
                    );
                  } else if (
                    i < array.length - 1 &&
                    prePayrollWorker.area.code === array[i + 1].area.code &&
                    prePayrollWorker.department.code !==
                      array[i + 1].department.code
                  ) {
                    // ultimo elemento de la misma area pero diferente departamento
                    return (
                      <Fragment key={i}>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell colSpan={2}>
                            Total por departamento
                          </Table.Cell>
                          {getTotalDepartments(prePayrollWorker).map(
                            (total, j) => {
                              return (
                                <Table.Cell
                                  key={j}
                                  className="text-center font-bold"
                                >
                                  {total}
                                </Table.Cell>
                              );
                            }
                          )}
                        </Table.Row>
                      </Fragment>
                    );
                  } else if (
                    i === array.length - 1 ||
                    (i < array.length - 1 &&
                      prePayrollWorker.area.code !== array[i + 1].area.code &&
                      prePayrollWorker.department.code !==
                        array[i + 1].department.code)
                  ) {
                    // ultimo elemento o ultimo elemento del area
                    return (
                      <Fragment key={i}>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
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
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell colSpan={2}>
                            Total por Departamento
                          </Table.Cell>
                          {getTotalDepartments(prePayrollWorker).map(
                            (total, j) => {
                              return (
                                <Table.Cell
                                  key={j}
                                  className="text-center font-bold"
                                >
                                  {total}
                                </Table.Cell>
                              );
                            }
                          )}
                        </Table.Row>
                        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                          <Table.Cell colSpan={2}>Total por Área</Table.Cell>
                          {getTotalAreas(prePayrollWorker).map((total, j) => {
                            return (
                              <Table.Cell
                                key={j}
                                className="text-center font-bold"
                              >
                                {total}
                              </Table.Cell>
                            );
                          })}
                        </Table.Row>
                      </Fragment>
                    );
                  } else {
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
                  }
                })
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="text-center bg-gray-50" colSpan={12}>
                    No hay trabajadores disponibles
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
