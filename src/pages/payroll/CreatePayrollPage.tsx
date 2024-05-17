import {
  Breadcrumb,
  Button,
  CustomFlowbiteTheme,
  Label,
  Select,
  Table,
} from "flowbite-react";
import {
  GET_LIST_PRE_PAYROLLS,
  GET_PRE_PAYROLL_WORKERS_BY_ID,
} from "../../constants/endpoints/prepayroll";
import { Link, useNavigate } from "react-router-dom";
import { PayrollWithoutId, PayrollWorker } from "../../constants/types/payroll";
import {
  PrePayrollBaseWithId,
  PrePayrollWorkerTable,
} from "../../constants/types/prepayroll";
import {
  ROUTE_HOME_URL,
  ROUTE_PAYROLL_URL,
} from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { ERROR_MESSAGES } from "../../constants/app";
import { HiHome } from "react-icons/hi";
import axios from "axios";
import { toDecimal } from "../../services/app";

type ErrorPrePayroll = {
  prePayrollId: string;
};

const CreatePayrollPage = () => {
  const navigate = useNavigate();
  const [prePayrollSelected, setPrePayrollSelected] =
    useState<PrePayrollBaseWithId>();
  const [prePayrolls, setPrePayrolls] = useState<PrePayrollBaseWithId[]>();
  const [payroll, setPayroll] = useState<PayrollWithoutId>();
  const [showTable, setShowTable] = useState(false);
  const [errorPrePayroll, setErrorPrePayroll] = useState<ErrorPrePayroll>({
    prePayrollId: "",
  });

  useEffect(() => {
    axios.get(GET_LIST_PRE_PAYROLLS).then(({ data }) => {
      setPrePayrolls(data);
    });
  }, []);

  useEffect(() => {
    if (prePayrollSelected && showTable) {
      axios
        .get(`${GET_PRE_PAYROLL_WORKERS_BY_ID}/${prePayrollSelected.id}`)
        .then(({ data }) => {
          // hacer los calculos de la nomina
          calcPayroll(data.workers);
        });
    }
  }, [prePayrollSelected, showTable]);

  const [openModalEdit, setOpenModalEdit] = useState(false);

  const closeModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!prePayrolls) return;

    const prePayroll = prePayrolls.find(
      (prePayroll) => prePayroll.id === Number.parseInt(e.target.value)
    );

    setPrePayrollSelected(prePayroll);
  };

  const handleEdit = (payrollWorker: PayrollWorker) => {
    console.log(payrollWorker.worker.name);
  };

  const savePayroll = () => {
    // llamar a la api para guardar los datos
    navigate(ROUTE_PAYROLL_URL);
  };

  const calcPayroll = (prePayrollWorkers: PrePayrollWorkerTable[]) => {
    if (!prePayrollSelected) return;

    const payrollWorkers: PayrollWorker[] = [];

    // iteramos los trabajadores de la prenomina, por cada uno se haran los calculos y se agregaran a la nomina
    prePayrollWorkers.map((prePayrollWorker) => {
      // calculos de cada trabajador

      // tarifa salarial
      const salaryRate = toDecimal(prePayrollWorker.occupation.salary);
      // horas trabajadas
      const hours = toDecimal(prePayrollWorker.hTrab);
      // a cobrar = tarifa salarial * horas trabajadas
      const toCollect = toDecimal(salaryRate * hours);
      // bonificaciones
      const bonus = 0;
      // pat
      const pat = 0;
      // salario devengado
      const earnedSalary = toDecimal(toCollect + bonus + pat);

      const vacaciones = toDecimal((earnedSalary * 9.09) / 100);
      const fondoSalario = toDecimal(earnedSalary + vacaciones + bonus);

      const fuerzaTrabajo = toDecimal((fondoSalario * 5) / 100);
      const segSocial = toDecimal((fondoSalario * 12.5) / 100);
      const provicion = toDecimal((fondoSalario * 1.5) / 100);
      const totalGasto = toDecimal(fuerzaTrabajo + segSocial + provicion);

      const ret = 0;

      const paid = toDecimal(earnedSalary - totalGasto - ret);

      payrollWorkers.push({
        salaryRate: salaryRate,
        hours: hours,
        toCollect: toCollect,
        bonus: bonus,
        pat: pat,
        earnedSalary: earnedSalary,
        salaryTax: totalGasto,
        withHoldings: ret,
        paid: paid,
        worker: prePayrollWorker.worker,
      });

      // se agregan a los trabajadores de la nomina
    });

    setPayroll({
      month: prePayrollSelected.month,
      year: prePayrollSelected.year,
      prePayrollId: prePayrollSelected.id,
      workers: payrollWorkers,
    });
  };

  const checkPrePayroll = () => {
    if (!prePayrollSelected || !prePayrolls) return;
    // validar los datos
    let newError = {
      prePayrollId: "",
    };

    if (prePayrollSelected.id.toString() === "") {
      newError = {
        ...newError,
        prePayrollId: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setErrorPrePayroll(newError);
    } else if (
      !prePayrolls.some((prePayroll) => prePayroll.id === prePayrollSelected.id)
    ) {
      newError = {
        ...newError,
        prePayrollId: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setErrorPrePayroll(newError);
    } else {
      setErrorPrePayroll(newError);
    }

    if (newError.prePayrollId === "") {
      setShowTable(true);
    }
  };

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
      <div className="flex mt-2 mb-10 p-3 rounded-md bg-gray-50 dark:bg-gray-800 items-center justify-between">
        <Breadcrumb className="mx-4">
          <Breadcrumb.Item icon={HiHome}>
            <Link to={ROUTE_HOME_URL}>Inicio</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <Link to={ROUTE_PAYROLL_URL}>Nóminas</Link>
          </Breadcrumb.Item>
        </Breadcrumb>
        <Button color="success" size="xs" onClick={savePayroll}>
          Guardar nómina
        </Button>
      </div>
      {showTable ? (
        <div className="overflow-x-auto">
          <Table theme={customTheme}>
            <Table.Head>
              <Table.HeadCell colSpan={14} className="text-center">
                Nómina{" "}
                {`${prePayrollSelected?.month.toUpperCase()} de ${
                  prePayrollSelected?.year
                }`}
              </Table.HeadCell>
            </Table.Head>
            <Table.Head>
              <Table.HeadCell className="text-center">Código</Table.HeadCell>
              <Table.HeadCell className="text-center">
                Nombres y apellidos
              </Table.HeadCell>
              <Table.HeadCell className="text-center">C.I.</Table.HeadCell>
              <Table.HeadCell className="text-center">
                Cat. Ocup.
              </Table.HeadCell>
              <Table.HeadCell className="text-center">
                Tarf. Sal.
              </Table.HeadCell>
              <Table.HeadCell className="text-center">Horas</Table.HeadCell>
              <Table.HeadCell className="text-center">A cobrar</Table.HeadCell>
              <Table.HeadCell className="text-center">Bon.</Table.HeadCell>
              <Table.HeadCell className="text-center">P.A.T.</Table.HeadCell>
              <Table.HeadCell className="text-center">Deven.</Table.HeadCell>
              <Table.HeadCell className="text-center">Imp. S.</Table.HeadCell>
              <Table.HeadCell className="text-center">Ret.</Table.HeadCell>
              <Table.HeadCell className="text-center">Pagado</Table.HeadCell>
              <Table.HeadCell className="text-center">Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {payroll && payroll.workers.length > 0 ? (
                payroll.workers.map((payrollWorker, i) => {
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
                        {payrollWorker.worker.category}
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
                      <Table.Cell>
                        <div className="flex justify-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleEdit(payrollWorker)}
                            className="font-medium text-yellow-300 dark:text-yellow-400"
                          >
                            Editar
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  );
                })
              ) : (
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <Table.Cell className="text-center bg-gray-50" colSpan={14}>
                    No hay nóminas disponibles
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
      ) : (
        <form className="flex gap-4">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="prePayrollId" value="Seleccione la prenómina" />
            </div>
            <Select
              id="prePayrollId"
              name="prePayrollId"
              value={prePayrollSelected && prePayrollSelected.id}
              onChange={handleChange}
              color={errorPrePayroll.prePayrollId !== "" ? "failure" : "gray"}
              helperText={
                errorPrePayroll.prePayrollId !== "" && (
                  <>
                    <span className="font-medium">
                      {errorPrePayroll.prePayrollId}
                    </span>
                  </>
                )
              }
              required
            >
              <option value="">Seleccione un mes</option>
              {prePayrolls &&
                prePayrolls.map((prePayroll, i) => {
                  return (
                    <option key={i} value={prePayroll.id}>
                      {`${prePayroll.month.toUpperCase()} de ${
                        prePayroll.year
                      }`}
                    </option>
                  );
                })}
            </Select>
          </div>
          <Button
            type="button"
            color="success"
            className="mt-auto"
            disabled={prePayrolls && prePayrolls.length === 0}
            onClick={checkPrePayroll}
          >
            Aceptar
          </Button>
        </form>
      )}
    </>
  );
};

export default CreatePayrollPage;
