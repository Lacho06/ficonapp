import {
  Breadcrumb,
  CustomFlowbiteTheme,
  Spinner,
  Table,
} from "flowbite-react";
import { Fragment, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  PayrollTable,
  PayrollWorkerTable,
} from "../../constants/types/payroll";
import {
  ROUTE_HOME_URL,
  ROUTE_PAYROLL_DETAILS_PREFIX,
  ROUTE_PAYROLL_URL,
} from "../../constants/routes/routes";
import { getLimitDay, getNumberMonth } from "../../services/app";

import { GET_PAYROLL_DETAILS } from "../../constants/endpoints/payrolls";
import { HiHome } from "react-icons/hi";
import axios from "axios";
import { useMiddleware } from "../../hooks/useMiddleware";

const PayrollDetailsPage = () => {
  const { id } = useParams();
  const [payrollDetails, setPayrollDetails] = useState<PayrollTable>();
  const [loading, setLoading] = useState<boolean>(true);

  useMiddleware("economia");

  const getTotalDepartments = (payrollWorker: PayrollWorkerTable) => {
    if (!payrollDetails) return [];
    let totalSalaryRate = 0;
    let totalHours = 0;
    let totalToCollect = 0;
    let totalBonus = 0;
    let totalPAT = 0;
    let totalEarnedSalary = 0;
    let totalSalaryTax = 0;
    let totalWithHoldings = 0;
    let totalPaid = 0;

    const payrollWorkersFiltereds = payrollDetails.workers.filter(
      (worker) => worker.department.code === payrollWorker.department.code
    );
    payrollWorkersFiltereds.map((worker) => {
      totalSalaryRate += worker.salaryRate;
      totalHours += worker.hours;
      totalToCollect += worker.toCollect;
      totalBonus += worker.bonus;
      totalPAT += worker.pat;
      totalEarnedSalary += worker.earnedSalary;
      totalSalaryTax += worker.salaryTax;
      totalWithHoldings += worker.withHoldings;
      totalPaid += worker.paid;
    });

    return [
      totalSalaryRate,
      totalHours,
      totalToCollect,
      totalBonus,
      totalPAT,
      totalEarnedSalary,
      totalSalaryTax,
      totalWithHoldings,
      totalPaid,
    ];
  };

  useEffect(() => {
    axios.get(`${GET_PAYROLL_DETAILS}/${id}`).then(({ data }) => {
      setPayrollDetails(data);
      setLoading(false);
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
              <Link to={ROUTE_PAYROLL_URL}>Nóminas</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={`${ROUTE_PAYROLL_DETAILS_PREFIX}/${id}`}>
                {`${payrollDetails?.month} de ${payrollDetails?.year}`}
              </Link>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="overflow-x-auto col-span-12">
          {!loading && (
            <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-3">
              <div className="flex flex-col gap-1">
                <p className="font-bold">GEIC - MINCOM</p>
                <p className="font-bold">161.0.2652 - SOFTEL</p>
                <p className="font-bold">890 - SOFTEL</p>
                <p>
                  <span className="font-bold">34 - Nómina de salario</span>{" "}
                  {`${payrollDetails?.month} ${payrollDetails?.year}`}
                </p>
                <p>
                  <span className="font-bold">Período de pago</span>{" "}
                  {`1/${
                    payrollDetails && getNumberMonth(payrollDetails.month)
                  }/${payrollDetails?.year} al ${
                    payrollDetails && getLimitDay(payrollDetails.month)
                  }/${payrollDetails && getNumberMonth(payrollDetails.month)}/${
                    payrollDetails?.year
                  }`}
                </p>
              </div>
              <div className="flex flex-col gap-1 font-bold">
                <p>
                  Elaborada por:{" "}
                  <span className="font-normal">
                    {payrollDetails && payrollDetails.buildedBy.name}
                  </span>
                </p>
                <p>
                  Revisada por:{" "}
                  <span className="font-normal">
                    {payrollDetails && payrollDetails.reviewBy.name}
                  </span>
                </p>
                <p>
                  Aprobada por:{" "}
                  <span className="font-normal">
                    {payrollDetails && payrollDetails.approvedBy.name}
                  </span>
                </p>
                <p>
                  Contabilizada por:{" "}
                  <span className="font-normal">
                    {payrollDetails && payrollDetails.doneBy.name}
                  </span>
                </p>
              </div>
            </div>
          )}
          {loading ? (
            <div className="flex w-full justify-center py-5">
              <Spinner color="warning" aria-label="Cargando..." size="lg" />
            </div>
          ) : (
            <div className="w-full overflow-auto">
              <Table theme={customTheme}>
                <Table.Head>
                  <Table.HeadCell colSpan={13} className="text-center">
                    Nómina
                  </Table.HeadCell>
                </Table.Head>
                <Table.Head>
                  <Table.HeadCell className="text-center">
                    Código
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center">
                    Nombre y Apellidos
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center">C.I.</Table.HeadCell>
                  <Table.HeadCell className="text-center">
                    Cat. Ocup.
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center">
                    Tarf. Sal.
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center">Horas</Table.HeadCell>
                  <Table.HeadCell className="text-center">
                    A cobrar
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center">Bon.</Table.HeadCell>
                  <Table.HeadCell className="text-center">
                    P.A.T.
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center">
                    Deven.
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center">
                    Imp. S.
                  </Table.HeadCell>
                  <Table.HeadCell className="text-center">Ret.</Table.HeadCell>
                  <Table.HeadCell className="text-center">
                    Pagado
                  </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                  {payrollDetails && payrollDetails.workers.length > 0 ? (
                    payrollDetails.workers.map((payrollWorker, i, array) => {
                      if (
                        i === 0 ||
                        (i > 0 &&
                          payrollWorker.department.code !==
                            array[i - 1].department.code)
                      ) {
                        // primera iteracion y primer elemento de diferente departamento
                        return (
                          <Fragment key={i}>
                            <Table.Row className="bg-accent-700 dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell
                                colSpan={13}
                                className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white"
                              >
                                {`${payrollWorker.department.code} - ${payrollWorker.department.name}`}
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                                {payrollWorker.worker.code}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.worker.name}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.worker.ci}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.occupation.name}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.salaryRate}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.hours}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.toCollect}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.bonus}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.pat}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.earnedSalary}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.salaryTax}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.withHoldings}
                              </Table.Cell>
                              <Table.Cell className="text-center font-bold">
                                {payrollWorker.paid}
                              </Table.Cell>
                            </Table.Row>
                          </Fragment>
                        );
                      } else if (
                        i === array.length - 1 ||
                        (i < array.length - 1 &&
                          payrollWorker.department.code !==
                            array[i + 1].department.code)
                      ) {
                        return (
                          <Fragment key={i}>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                                {payrollWorker.worker.code}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.worker.name}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.worker.ci}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.occupation.name}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.salaryRate}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.hours}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.toCollect}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.bonus}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.pat}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.earnedSalary}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.salaryTax}
                              </Table.Cell>
                              <Table.Cell className="text-center">
                                {payrollWorker.withHoldings}
                              </Table.Cell>
                              <Table.Cell className="text-center font-bold">
                                {payrollWorker.paid}
                              </Table.Cell>
                            </Table.Row>
                            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                              <Table.Cell
                                colSpan={4}
                                className="uppercase font-bold"
                              >
                                Total por C. Costo
                              </Table.Cell>
                              {getTotalDepartments(payrollWorker).map(
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
                      } else {
                        return (
                          <Table.Row
                            key={i}
                            className="bg-white dark:border-gray-700 dark:bg-gray-800"
                          >
                            <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                              {payrollWorker.worker.code}
                            </Table.Cell>
                            <Table.Cell className="text-center">
                              {payrollWorker.worker.name}
                            </Table.Cell>
                            <Table.Cell className="text-center">
                              {payrollWorker.worker.ci}
                            </Table.Cell>
                            <Table.Cell className="text-center">
                              {payrollWorker.occupation.name}
                            </Table.Cell>
                            <Table.Cell className="text-center">
                              {payrollWorker.salaryRate}
                            </Table.Cell>
                            <Table.Cell className="text-center">
                              {payrollWorker.hours}
                            </Table.Cell>
                            <Table.Cell className="text-center">
                              {payrollWorker.toCollect}
                            </Table.Cell>
                            <Table.Cell className="text-center">
                              {payrollWorker.bonus}
                            </Table.Cell>
                            <Table.Cell className="text-center">
                              {payrollWorker.pat}
                            </Table.Cell>
                            <Table.Cell className="text-center">
                              {payrollWorker.earnedSalary}
                            </Table.Cell>
                            <Table.Cell className="text-center">
                              {payrollWorker.salaryTax}
                            </Table.Cell>
                            <Table.Cell className="text-center">
                              {payrollWorker.withHoldings}
                            </Table.Cell>
                            <Table.Cell className="text-center font-bold">
                              {payrollWorker.paid}
                            </Table.Cell>
                          </Table.Row>
                        );
                      }
                    })
                  ) : (
                    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                      <Table.Cell
                        className="text-center bg-gray-50"
                        colSpan={13}
                      >
                        No hay nóminas disponibles
                      </Table.Cell>
                    </Table.Row>
                  )}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PayrollDetailsPage;
