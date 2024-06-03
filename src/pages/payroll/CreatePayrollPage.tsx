import {
  Breadcrumb,
  Button,
  CustomFlowbiteTheme,
  Label,
  Modal,
  Select,
  Table,
  TextInput,
} from "flowbite-react";
import {
  GET_LIST_PRE_PAYROLLS_NOT_ADDED,
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
  ROUTE_PAYROLL_DETAILS_PREFIX,
  ROUTE_PAYROLL_URL,
} from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { ERROR_MESSAGES } from "../../constants/app";
import { FaSave } from "react-icons/fa";
import { GET_LIST_USERS } from "../../constants/endpoints/user";
import { HiHome } from "react-icons/hi";
import { POST_CREATE_PAYROLL } from "../../constants/endpoints/payrolls";
import { User } from "../../constants/types/user";
import axios from "axios";
import { toDecimal } from "../../services/app";
import { useMiddleware } from "../../hooks/useMiddleware";

type ErrorPrePayroll = {
  prePayrollId: string;
};

type ErrorPayrollEdit = {
  bonus: string;
  pat: string;
  withHoldings: string;
};

type ErrorPayrollForm = {
  buildedBy: string;
  reviewBy: string;
  approvedBy: string;
  doneBy: string;
};

const CreatePayrollPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [prePayrollSelected, setPrePayrollSelected] =
    useState<PrePayrollBaseWithId>();
  const [prePayrolls, setPrePayrolls] = useState<PrePayrollBaseWithId[]>();
  const [payroll, setPayroll] = useState<PayrollWithoutId>();
  const [payrollWorkerSelected, setPayrollWorkerSelected] =
    useState<PayrollWorker>();
  const [showTable, setShowTable] = useState(false);
  const [errorPrePayroll, setErrorPrePayroll] = useState<ErrorPrePayroll>({
    prePayrollId: "",
  });
  const [errorPayrollForm, setErrorPayrollForm] = useState<ErrorPayrollForm>({
    buildedBy: "",
    reviewBy: "",
    approvedBy: "",
    doneBy: "",
  });
  const [errorPayroll, setErrorPayroll] = useState<ErrorPayrollEdit>({
    bonus: "",
    pat: "",
    withHoldings: "",
  });

  useMiddleware("economia");

  useEffect(() => {
    axios.get(GET_LIST_PRE_PAYROLLS_NOT_ADDED).then(({ data }) => {
      setPrePayrolls(data);
    });
    axios.get(GET_LIST_USERS).then(({ data }) => {
      setUsers(data);
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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (!payroll) return;

    const changeUser = users.find(
      (user) => user.id === Number.parseInt(e.target.value)
    );

    if (!changeUser) return;

    setPayroll({
      ...payroll,
      [e.target.name]: changeUser.id,
    });
  };

  const handleEdit = (payrollWorker: PayrollWorker) => {
    setPayrollWorkerSelected(payrollWorker);
    setOpenModalEdit(true);
  };

  const savePayroll = () => {
    if (!payroll) return;
    // validar los datos
    let newError = {
      buildedBy: "",
      reviewBy: "",
      approvedBy: "",
      doneBy: "",
    };

    if (!payroll.buildedBy || payroll.buildedBy <= 0) {
      newError = {
        ...newError,
        buildedBy: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setErrorPayrollForm(newError);
    } else if (users.every((user) => user.id !== payroll.buildedBy)) {
      newError = {
        ...newError,
        buildedBy: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setErrorPayrollForm(newError);
    } else {
      newError = {
        ...newError,
        buildedBy: "",
      };
      setErrorPayrollForm(newError);
    }

    if (!payroll.reviewBy || payroll.reviewBy <= 0) {
      newError = {
        ...newError,
        reviewBy: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setErrorPayrollForm(newError);
    } else if (users.every((user) => user.id !== payroll.reviewBy)) {
      newError = {
        ...newError,
        reviewBy: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setErrorPayrollForm(newError);
    } else {
      newError = {
        ...newError,
        reviewBy: "",
      };
      setErrorPayrollForm(newError);
    }

    if (!payroll.approvedBy || payroll.approvedBy <= 0) {
      newError = {
        ...newError,
        approvedBy: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setErrorPayrollForm(newError);
    } else if (users.every((user) => user.id !== payroll.approvedBy)) {
      newError = {
        ...newError,
        approvedBy: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setErrorPayrollForm(newError);
    } else {
      newError = {
        ...newError,
        approvedBy: "",
      };
      setErrorPayrollForm(newError);
    }

    if (!payroll.doneBy || payroll.doneBy <= 0) {
      newError = {
        ...newError,
        doneBy: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setErrorPayrollForm(newError);
    } else if (users.every((user) => user.id !== payroll.doneBy)) {
      newError = {
        ...newError,
        doneBy: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setErrorPayrollForm(newError);
    } else {
      newError = {
        ...newError,
        doneBy: "",
      };
      setErrorPayrollForm(newError);
    }

    if (
      newError.buildedBy === "" &&
      newError.reviewBy === "" &&
      newError.approvedBy === "" &&
      newError.doneBy === ""
    ) {
      // llamar a la api para guardar los datos
      axios.post(POST_CREATE_PAYROLL, payroll).then(({ data }) => {
        navigate(`${ROUTE_PAYROLL_DETAILS_PREFIX}/${data.id}`);
      });
    }
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
      buildedBy: -1,
      reviewBy: -1,
      approvedBy: -1,
      doneBy: -1,
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

  const editPayrollWorker = () => {
    if (!payrollWorkerSelected || !payroll) return;
    // validar los datos
    let newError = {
      bonus: "",
      pat: "",
      withHoldings: "",
    };

    if (payrollWorkerSelected.bonus < 0) {
      newError = {
        ...newError,
        bonus: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setErrorPayroll(newError);
    } else {
      newError = {
        ...newError,
        bonus: "",
      };
      setErrorPayroll(newError);
    }

    if (payrollWorkerSelected.pat < 0) {
      newError = {
        ...newError,
        pat: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setErrorPayroll(newError);
    } else {
      newError = {
        ...newError,
        pat: "",
      };
      setErrorPayroll(newError);
    }

    if (payrollWorkerSelected.withHoldings < 0) {
      newError = {
        ...newError,
        withHoldings: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setErrorPayroll(newError);
    } else {
      newError = {
        ...newError,
        withHoldings: "",
      };
      setErrorPayroll(newError);
    }

    if (
      newError.bonus === "" &&
      newError.pat === "" &&
      newError.withHoldings === ""
    ) {
      const payrollWorkerFiltereds = payroll.workers.filter(
        (payrollWorker) =>
          payrollWorker.worker.name !== payrollWorkerSelected.worker.name
      );

      setPayroll({
        ...payroll,
        workers: [...payrollWorkerFiltereds, payrollWorkerSelected].sort(
          (a: PayrollWorker, b: PayrollWorker) => {
            return a.worker.ci - b.worker.ci;
          }
        ),
      });
      setPayrollWorkerSelected(undefined);

      closeModalEdit();
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
        <div className="hidden md:block">
          <Button color="success" size="xs" onClick={savePayroll}>
            Guardar nómina
          </Button>
        </div>
        <div className="md:hidden">
          <FaSave onClick={savePayroll} />
        </div>
      </div>
      {showTable ? (
        <div className="overflow-x-auto pb-4">
          <form className="flex flex-col md:flex-row gap-4 mb-10">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="buildedBy" value="Elaborada por:" />
              </div>
              <Select
                id="buildedBy"
                name="buildedBy"
                value={payroll && payroll.buildedBy}
                onChange={handleSelectChange}
                color={errorPayrollForm.buildedBy !== "" ? "failure" : "gray"}
                helperText={
                  errorPayrollForm.buildedBy !== "" && (
                    <>
                      <span className="font-medium">
                        {errorPayrollForm.buildedBy}
                      </span>
                    </>
                  )
                }
                required
              >
                <option value="">Seleccione un usuario</option>
                {users.map((user, i) => {
                  return (
                    <option key={i} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="reviewBy" value="Revisada por:" />
              </div>
              <Select
                id="reviewBy"
                name="reviewBy"
                value={payroll && payroll.reviewBy}
                onChange={handleSelectChange}
                color={errorPayrollForm.reviewBy !== "" ? "failure" : "gray"}
                helperText={
                  errorPayrollForm.reviewBy !== "" && (
                    <>
                      <span className="font-medium">
                        {errorPayrollForm.reviewBy}
                      </span>
                    </>
                  )
                }
                required
              >
                <option value="">Seleccione un usuario</option>
                {users.map((user, i) => {
                  return (
                    <option key={i} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="approvedBy" value="Aprobada por:" />
              </div>
              <Select
                id="approvedBy"
                name="approvedBy"
                value={payroll && payroll.approvedBy}
                onChange={handleSelectChange}
                color={errorPayrollForm.approvedBy !== "" ? "failure" : "gray"}
                helperText={
                  errorPayrollForm.approvedBy !== "" && (
                    <>
                      <span className="font-medium">
                        {errorPayrollForm.approvedBy}
                      </span>
                    </>
                  )
                }
                required
              >
                <option value="">Seleccione un usuario</option>
                {users.map((user, i) => {
                  return (
                    <option key={i} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="doneBy" value="Contabilizada por:" />
              </div>
              <Select
                id="doneBy"
                name="doneBy"
                value={payroll && payroll.doneBy}
                onChange={handleSelectChange}
                color={errorPayrollForm.doneBy !== "" ? "failure" : "gray"}
                helperText={
                  errorPayrollForm.doneBy !== "" && (
                    <>
                      <span className="font-medium">
                        {errorPayrollForm.doneBy}
                      </span>
                    </>
                  )
                }
                required
              >
                <option value="">Seleccione un usuario</option>
                {users.map((user, i) => {
                  return (
                    <option key={i} value={user.id}>
                      {user.name}
                    </option>
                  );
                })}
              </Select>
            </div>
          </form>
          <div className="w-full overflow-auto">
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
                <Table.HeadCell className="text-center">
                  A cobrar
                </Table.HeadCell>
                <Table.HeadCell className="text-center">Bon.</Table.HeadCell>
                <Table.HeadCell className="text-center">P.A.T.</Table.HeadCell>
                <Table.HeadCell className="text-center">Deven.</Table.HeadCell>
                <Table.HeadCell className="text-center">Imp. S.</Table.HeadCell>
                <Table.HeadCell className="text-center">Ret.</Table.HeadCell>
                <Table.HeadCell className="text-center">Pagado</Table.HeadCell>
                <Table.HeadCell className="text-center">
                  Acciones
                </Table.HeadCell>
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

      {/* Modal editar */}
      <Modal show={openModalEdit} size="md" onClose={closeModalEdit} popup>
        <Modal.Header className="px-2 mb-5 flex items-center">
          <h3 className="ml-5 text-xl font-medium text-gray-900 dark:text-white">
            Editar fila
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="bonus" value="Bonus" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="bonus"
                type="number"
                name="bonus"
                placeholder="0"
                value={payrollWorkerSelected && payrollWorkerSelected.bonus}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  payrollWorkerSelected &&
                  setPayrollWorkerSelected({
                    ...payrollWorkerSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  payrollWorkerSelected &&
                  payrollWorkerSelected.bonus < 0 &&
                  errorPayroll.bonus === ""
                    ? "warning"
                    : errorPayroll.bonus !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  errorPayroll.bonus !== "" && (
                    <>
                      <span className="font-medium">{errorPayroll.bonus}</span>
                    </>
                  )
                }
              />
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="pat" value="P.A.T." />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="pat"
                type="number"
                name="pat"
                placeholder="0"
                value={payrollWorkerSelected && payrollWorkerSelected.pat}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  payrollWorkerSelected &&
                  setPayrollWorkerSelected({
                    ...payrollWorkerSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  payrollWorkerSelected &&
                  payrollWorkerSelected.pat < 0 &&
                  errorPayroll.pat === ""
                    ? "warning"
                    : errorPayroll.pat !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  errorPayroll.pat !== "" && (
                    <>
                      <span className="font-medium">{errorPayroll.pat}</span>
                    </>
                  )
                }
              />
            </div>
            <div className="w-full">
              <div className="mb-2">
                <Label htmlFor="withHoldings" value="Ret." />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="withHoldings"
                type="number"
                name="withHoldings"
                placeholder="0"
                value={
                  payrollWorkerSelected && payrollWorkerSelected.withHoldings
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  payrollWorkerSelected &&
                  setPayrollWorkerSelected({
                    ...payrollWorkerSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  payrollWorkerSelected &&
                  payrollWorkerSelected.withHoldings < 0 &&
                  errorPayroll.withHoldings === ""
                    ? "warning"
                    : errorPayroll.withHoldings !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  errorPayroll.withHoldings !== "" && (
                    <>
                      <span className="font-medium">
                        {errorPayroll.withHoldings}
                      </span>
                    </>
                  )
                }
              />
            </div>
            <div className="w-full">
              <Button
                className="px-4"
                color="warning"
                onClick={editPayrollWorker}
              >
                Editar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CreatePayrollPage;
