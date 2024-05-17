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
import { ERROR_MESSAGES, MONTHS } from "../../constants/app";
import { Link, useNavigate } from "react-router-dom";
import {
  PrePayrollBase,
  PrePayrollWorker,
} from "../../constants/types/prepayroll";
import {
  ROUTE_HOME_URL,
  ROUTE_PRE_PAYROLL_URL,
} from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { GET_LIST_WORKERS } from "../../constants/endpoints/worker";
import { HiHome } from "react-icons/hi";
import { Worker } from "../../constants/types/worker";
import axios from "axios";

const initialNewPrepayrollWorker: PrePayrollWorker = {
  code: -1,
  name: "",
  ci: -1,
  hTrab: -1,
  hNoTrab: -1,
  impunt: -1,
  hrsCertif: -1,
  hrsLicMatern: -1,
  hrsResol: -1,
  hrsInterr: -1,
  hrsExtras: -1,
  otroTpoPagar: -1,
  diasVac: -1,
};

const initialPrePayroll: PrePayrollBase = {
  month: "",
  year: -1,
};

type ErrorPrePayrollWorkerFields = {
  workerId: string;
  hTrab: string;
  hNoTrab: string;
  impunt: string;
  hrsCertif: string;
  hrsLicMatern: string;
  hrsResol: string;
  hrsInterr: string;
  hrsExtras: string;
  otroTpoPagar: string;
  diasVac: string;
};

type ErrorPrePayroll = {
  month: string;
  year: string;
};

const CreatePrePayrollPage = () => {
  const navigate = useNavigate();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [workersReserved, setWorkersReserved] = useState<Worker[]>([]);
  const [newPrePayrollWorker, setNewPrePayrollWorker] =
    useState<PrePayrollWorker>(initialNewPrepayrollWorker);
  const [prePayrollWorkerSelected, setPrePayrollWorkerSelected] =
    useState<PrePayrollWorker>();
  const [error, setError] = useState<ErrorPrePayrollWorkerFields>({
    workerId: "",
    hTrab: "",
    hNoTrab: "",
    impunt: "",
    hrsCertif: "",
    hrsLicMatern: "",
    hrsResol: "",
    hrsInterr: "",
    hrsExtras: "",
    otroTpoPagar: "",
    diasVac: "",
  });
  const [prePayrollWorkers, setPrePayrollWorkers] = useState<
    PrePayrollWorker[]
  >([]);

  const [prePayroll, setPrePayroll] =
    useState<PrePayrollBase>(initialPrePayroll);

  const [errorPrePayroll, setErrorPrePayroll] = useState<ErrorPrePayroll>({
    month: "",
    year: "",
  });

  useEffect(() => {
    axios.get(GET_LIST_WORKERS).then(({ data }) => setWorkers(data));
  }, []);

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);

  const closeModalAdd = () => {
    setOpenModalAdd(false);
  };

  const closeModalEdit = () => {
    setOpenModalEdit(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === "") return;
    // worker seleccionado
    const worker = workers.filter(
      (worker) => worker.name === e.target.value
    )[0];

    setNewPrePayrollWorker({
      ...newPrePayrollWorker,
      ci: worker.ci,
      code: worker.code,
      name: worker.name,
    });
  };

  const handleEdit = (prePayrollWorker: PrePayrollWorker) => {
    setPrePayrollWorkerSelected(prePayrollWorker);
    setOpenModalEdit(true);
  };

  const createNewPrePayrollWorker = () => {
    if (!newPrePayrollWorker) return;
    // validar los datos
    let newError = {
      workerId: "",
      hTrab: "",
      hNoTrab: "",
      impunt: "",
      hrsCertif: "",
      hrsLicMatern: "",
      hrsResol: "",
      hrsInterr: "",
      hrsExtras: "",
      otroTpoPagar: "",
      diasVac: "",
    };

    if (newPrePayrollWorker.name.trim() === "") {
      newError = {
        ...newError,
        workerId: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        workerId: "",
      };
      setError(newError);
    }

    if (newPrePayrollWorker.hTrab === 0) {
      newError = {
        ...newError,
        hTrab: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (newPrePayrollWorker.hTrab <= 0) {
      newError = {
        ...newError,
        hTrab: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hTrab: "",
      };
      setError(newError);
    }

    if (newPrePayrollWorker.hNoTrab === 0) {
      newError = {
        ...newError,
        hNoTrab: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (newPrePayrollWorker.hNoTrab <= 0) {
      newError = {
        ...newError,
        hNoTrab: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hNoTrab: "",
      };
      setError(newError);
    }

    if (newPrePayrollWorker.impunt === 0) {
      newError = {
        ...newError,
        impunt: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (newPrePayrollWorker.impunt <= 0) {
      newError = {
        ...newError,
        impunt: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        impunt: "",
      };
      setError(newError);
    }

    if (newPrePayrollWorker.diasVac === 0) {
      newError = {
        ...newError,
        diasVac: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (newPrePayrollWorker.diasVac <= 0) {
      newError = {
        ...newError,
        diasVac: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        diasVac: "",
      };
      setError(newError);
    }

    if (newPrePayrollWorker.hrsCertif === 0) {
      newError = {
        ...newError,
        hrsCertif: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (newPrePayrollWorker.hrsCertif <= 0) {
      newError = {
        ...newError,
        hrsCertif: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hrsCertif: "",
      };
      setError(newError);
    }

    if (newPrePayrollWorker.hrsLicMatern === 0) {
      newError = {
        ...newError,
        hrsLicMatern: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (newPrePayrollWorker.hrsLicMatern <= 0) {
      newError = {
        ...newError,
        hrsLicMatern: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hrsLicMatern: "",
      };
      setError(newError);
    }

    if (newPrePayrollWorker.hrsResol === 0) {
      newError = {
        ...newError,
        hrsResol: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (newPrePayrollWorker.hrsResol <= 0) {
      newError = {
        ...newError,
        hrsResol: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hrsResol: "",
      };
      setError(newError);
    }

    if (newPrePayrollWorker.hrsInterr === 0) {
      newError = {
        ...newError,
        hrsInterr: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (newPrePayrollWorker.hrsInterr <= 0) {
      newError = {
        ...newError,
        hrsInterr: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hrsInterr: "",
      };
      setError(newError);
    }

    if (newPrePayrollWorker.otroTpoPagar === 0) {
      newError = {
        ...newError,
        otroTpoPagar: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (newPrePayrollWorker.otroTpoPagar <= 0) {
      newError = {
        ...newError,
        otroTpoPagar: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        otroTpoPagar: "",
      };
      setError(newError);
    }

    if (newPrePayrollWorker.hrsExtras === 0) {
      newError = {
        ...newError,
        hrsExtras: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (newPrePayrollWorker.hrsExtras <= 0) {
      newError = {
        ...newError,
        hrsExtras: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hrsExtras: "",
      };
      setError(newError);
    }

    if (
      newError.workerId === "" &&
      newError.hTrab === "" &&
      newError.hNoTrab === "" &&
      newError.impunt === "" &&
      newError.diasVac === "" &&
      newError.hrsCertif === "" &&
      newError.hrsLicMatern === "" &&
      newError.hrsResol === "" &&
      newError.hrsInterr === "" &&
      newError.otroTpoPagar === "" &&
      newError.hrsExtras === ""
    ) {
      // todo llamada a la api para obtener un id disponible
      // worker seleccionado
      const worker = workers.filter(
        (worker) => worker.name === newPrePayrollWorker.name
      )[0];

      if (worker) {
        // workers no seleccionados
        const workerFiltereds = workers.filter(
          (worker) => worker.name !== newPrePayrollWorker.name
        );

        setWorkers(
          workerFiltereds.sort((a: PrePayrollWorker, b: PrePayrollWorker) => {
            return a.name - b.name;
          })
        );

        setWorkersReserved(
          [...workersReserved, worker].sort(
            (a: PrePayrollWorker, b: PrePayrollWorker) => {
              return a.name - b.name;
            }
          )
        );
        setPrePayrollWorkers(
          [...prePayrollWorkers, newPrePayrollWorker].sort(
            (a: PrePayrollWorker, b: PrePayrollWorker) => {
              return a.name - b.name;
            }
          )
        );
        setNewPrePayrollWorker(initialNewPrepayrollWorker);
      }

      closeModalAdd();
    }
  };

  const editPrePayrollWorker = () => {
    if (!prePayrollWorkerSelected) return;
    // validar los datos
    let newError = {
      workerId: "",
      hTrab: "",
      hNoTrab: "",
      impunt: "",
      hrsCertif: "",
      hrsLicMatern: "",
      hrsResol: "",
      hrsInterr: "",
      hrsExtras: "",
      otroTpoPagar: "",
      diasVac: "",
    };

    if (prePayrollWorkerSelected.hTrab === 0) {
      newError = {
        ...newError,
        hTrab: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (prePayrollWorkerSelected.hTrab <= 0) {
      newError = {
        ...newError,
        hTrab: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hTrab: "",
      };
      setError(newError);
    }

    if (prePayrollWorkerSelected.hNoTrab === 0) {
      newError = {
        ...newError,
        hNoTrab: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (prePayrollWorkerSelected.hNoTrab <= 0) {
      newError = {
        ...newError,
        hNoTrab: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hNoTrab: "",
      };
      setError(newError);
    }

    if (prePayrollWorkerSelected.impunt === 0) {
      newError = {
        ...newError,
        impunt: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (prePayrollWorkerSelected.impunt <= 0) {
      newError = {
        ...newError,
        impunt: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        impunt: "",
      };
      setError(newError);
    }

    if (prePayrollWorkerSelected.diasVac === 0) {
      newError = {
        ...newError,
        diasVac: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (prePayrollWorkerSelected.diasVac <= 0) {
      newError = {
        ...newError,
        diasVac: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        diasVac: "",
      };
      setError(newError);
    }

    if (prePayrollWorkerSelected.hrsCertif === 0) {
      newError = {
        ...newError,
        hrsCertif: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (prePayrollWorkerSelected.hrsCertif <= 0) {
      newError = {
        ...newError,
        hrsCertif: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hrsCertif: "",
      };
      setError(newError);
    }

    if (prePayrollWorkerSelected.hrsLicMatern === 0) {
      newError = {
        ...newError,
        hrsLicMatern: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (prePayrollWorkerSelected.hrsLicMatern <= 0) {
      newError = {
        ...newError,
        hrsLicMatern: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hrsLicMatern: "",
      };
      setError(newError);
    }

    if (prePayrollWorkerSelected.hrsResol === 0) {
      newError = {
        ...newError,
        hrsResol: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (prePayrollWorkerSelected.hrsResol <= 0) {
      newError = {
        ...newError,
        hrsResol: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hrsResol: "",
      };
      setError(newError);
    }

    if (prePayrollWorkerSelected.hrsInterr === 0) {
      newError = {
        ...newError,
        hrsInterr: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (prePayrollWorkerSelected.hrsInterr <= 0) {
      newError = {
        ...newError,
        hrsInterr: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hrsInterr: "",
      };
      setError(newError);
    }

    if (prePayrollWorkerSelected.otroTpoPagar === 0) {
      newError = {
        ...newError,
        otroTpoPagar: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (prePayrollWorkerSelected.otroTpoPagar <= 0) {
      newError = {
        ...newError,
        otroTpoPagar: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        otroTpoPagar: "",
      };
      setError(newError);
    }

    if (prePayrollWorkerSelected.hrsExtras === 0) {
      newError = {
        ...newError,
        hrsExtras: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (prePayrollWorkerSelected.hrsExtras <= 0) {
      newError = {
        ...newError,
        hrsExtras: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        hrsExtras: "",
      };
      setError(newError);
    }

    if (
      newError.workerId === "" &&
      newError.hTrab === "" &&
      newError.hNoTrab === "" &&
      newError.impunt === "" &&
      newError.diasVac === "" &&
      newError.hrsCertif === "" &&
      newError.hrsLicMatern === "" &&
      newError.hrsResol === "" &&
      newError.hrsInterr === "" &&
      newError.otroTpoPagar === "" &&
      newError.hrsExtras === ""
    ) {
      // todo llamada a la api para obtener un id disponible
      const prePayrollWorkerFiltereds = prePayrollWorkers.filter(
        (worker) => worker.name !== prePayrollWorkerSelected.name
      );

      setPrePayrollWorkers(
        [...prePayrollWorkerFiltereds, prePayrollWorkerSelected].sort(
          (a: PrePayrollWorker, b: PrePayrollWorker) => {
            return a.name - b.name;
          }
        )
      );
      setPrePayrollWorkerSelected(undefined);

      closeModalEdit();
    }
  };

  const submitPrePayroll = () => {
    // validar los datos
    let newError = {
      month: "",
      year: "",
    };

    if (prePayroll.month.trim() === "") {
      newError = {
        ...newError,
        month: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setErrorPrePayroll(newError);
    } else {
      setErrorPrePayroll(newError);
    }

    if (prePayroll.year === 0) {
      newError = {
        ...newError,
        year: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setErrorPrePayroll(newError);
    } else if (prePayroll.year < 2000 || prePayroll.year > 9999) {
      newError = {
        ...newError,
        year: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setErrorPrePayroll(newError);
    } else {
      setErrorPrePayroll(newError);
    }

    if (newError.month === "" && newError.year === "") {
      // todo llamar a la api para guardar los datos
      navigate(ROUTE_PRE_PAYROLL_URL);
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
      <div className="w-full">
        <div className="flex mt-2 mb-10 p-3 rounded-md bg-gray-50 dark:bg-gray-800 items-center justify-between">
          <Breadcrumb className="mx-4">
            <Breadcrumb.Item icon={HiHome}>
              <Link to={ROUTE_HOME_URL}>Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={ROUTE_PRE_PAYROLL_URL}>Prenóminas</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Button
            color="success"
            size="xs"
            onClick={() => setOpenModalAdd(true)}
          >
            Agregar fila
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Table theme={customTheme}>
            <Table.Head>
              <Table.HeadCell colSpan={13} className="text-center">
                Prenómina
              </Table.HeadCell>
            </Table.Head>
            <Table.Head>
              <Table.HeadCell className="text-center">Código</Table.HeadCell>
              <Table.HeadCell className="text-center">
                CI - Nombres
              </Table.HeadCell>
              <Table.HeadCell className="text-center">H.Trab</Table.HeadCell>
              <Table.HeadCell className="text-center">H.N.Trab</Table.HeadCell>
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
              <Table.HeadCell className="text-center">Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {prePayrollWorkers.length > 0 ? (
                prePayrollWorkers.map((prePayrollWorker, i) => {
                  return (
                    <Table.Row
                      key={i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                        {prePayrollWorker.code}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {`${prePayrollWorker.ci} - ${prePayrollWorker.name}`}
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
                      <Table.Cell>
                        <div className="flex justify-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleEdit(prePayrollWorker)}
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
                  <Table.Cell className="text-center bg-gray-50" colSpan={13}>
                    No hay prenóminas disponibles
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
        <form className="flex gap-4 mt-20">
          <div>
            <div className="mb-2 block">
              <Label htmlFor="month" value="Seleccione el mes" />
            </div>
            <Select
              id="month"
              name="month"
              value={prePayroll.month}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setPrePayroll({ ...prePayroll, month: e.target.value })
              }
              color={errorPrePayroll.month !== "" ? "failure" : "gray"}
              helperText={
                errorPrePayroll.month !== "" && (
                  <>
                    <span className="font-medium">{errorPrePayroll.month}</span>
                  </>
                )
              }
              required
            >
              <option value="">Seleccione un mes</option>
              {MONTHS.map((month, i) => {
                return (
                  <option key={i} value={month}>
                    {month.toUpperCase()}
                  </option>
                );
              })}
            </Select>
          </div>
          <div>
            <div className="mb-2 block">
              <Label htmlFor="year" value="Año" />
            </div>
            <TextInput
              id="year"
              type="number"
              name="year"
              min={2000}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPrePayroll({
                  ...prePayroll,
                  year: Number.parseInt(e.target.value),
                })
              }
              color={errorPrePayroll.year !== "" ? "failure" : "gray"}
              helperText={
                errorPrePayroll.year !== "" && (
                  <>
                    <span className="font-medium">{errorPrePayroll.year}</span>
                  </>
                )
              }
              required
            />
          </div>
          <Button
            type="button"
            color="success"
            className="mt-auto"
            disabled={prePayrollWorkers.length === 0}
            onClick={submitPrePayroll}
          >
            Aceptar
          </Button>
        </form>
      </div>

      {/* Modal agregar */}
      <Modal show={openModalAdd} size="md" onClose={closeModalAdd} popup>
        <Modal.Header className="px-2 mb-5 flex items-center">
          <h3 className="ml-5 text-xl font-medium text-gray-900 dark:text-white">
            Agregar nueva fila
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="workerId" value="Nombre del trabajador" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <Select
                id="workerId"
                name="workerId"
                value={newPrePayrollWorker.name}
                required
                onChange={handleChange}
                color={error.workerId !== "" ? "failure" : "gray"}
                helperText={
                  error.workerId !== "" && (
                    <>
                      <span className="font-medium">{error.workerId}</span>
                    </>
                  )
                }
              >
                <option value="" disabled>
                  Seleccione una opción
                </option>
                {workers.map((worker, i) => {
                  return (
                    <option value={worker.name} key={i}>
                      {`${worker.name} | ${worker.ci}`}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hTrab" value="Horas trabajadas" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hTrab"
                  type="number"
                  name="hTrab"
                  placeholder="0"
                  value={
                    newPrePayrollWorker && newPrePayrollWorker.hTrab > 0
                      ? newPrePayrollWorker.hTrab
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPrePayrollWorker({
                      ...newPrePayrollWorker,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    newPrePayrollWorker.hTrab <= 0 && error.hTrab === ""
                      ? "warning"
                      : error.hTrab !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hTrab !== "" && (
                      <>
                        <span className="font-medium">{error.hTrab}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hNoTrab" value="Horas no trabajadas" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hNoTrab"
                  type="number"
                  name="hNoTrab"
                  placeholder="0"
                  value={
                    newPrePayrollWorker && newPrePayrollWorker.hNoTrab > 0
                      ? newPrePayrollWorker.hNoTrab
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPrePayrollWorker({
                      ...newPrePayrollWorker,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    newPrePayrollWorker.hNoTrab <= 0 && error.hNoTrab === ""
                      ? "warning"
                      : error.hNoTrab !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hNoTrab !== "" && (
                      <>
                        <span className="font-medium">{error.hNoTrab}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="impunt" value="Impunt." />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="impunt"
                  type="number"
                  name="impunt"
                  placeholder="0"
                  value={
                    newPrePayrollWorker && newPrePayrollWorker.impunt > 0
                      ? newPrePayrollWorker.impunt
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPrePayrollWorker({
                      ...newPrePayrollWorker,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    newPrePayrollWorker.impunt <= 0 && error.impunt === ""
                      ? "warning"
                      : error.impunt !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.impunt !== "" && (
                      <>
                        <span className="font-medium">{error.impunt}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="diasVac" value="Días vac." />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="diasVac"
                  type="number"
                  name="diasVac"
                  placeholder="0"
                  value={
                    newPrePayrollWorker && newPrePayrollWorker.diasVac > 0
                      ? newPrePayrollWorker.diasVac
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPrePayrollWorker({
                      ...newPrePayrollWorker,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    newPrePayrollWorker.diasVac <= 0 && error.diasVac === ""
                      ? "warning"
                      : error.diasVac !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.diasVac !== "" && (
                      <>
                        <span className="font-medium">{error.diasVac}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hrsCertif" value="Hrs. certif." />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hrsCertif"
                  type="number"
                  name="hrsCertif"
                  placeholder="0"
                  value={
                    newPrePayrollWorker && newPrePayrollWorker.hrsCertif > 0
                      ? newPrePayrollWorker.hrsCertif
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPrePayrollWorker({
                      ...newPrePayrollWorker,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    newPrePayrollWorker.hrsCertif <= 0 && error.hrsCertif === ""
                      ? "warning"
                      : error.hrsCertif !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hrsCertif !== "" && (
                      <>
                        <span className="font-medium">{error.hrsCertif}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hrsLicMatern" value="Hrs. lic. matern." />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hrsLicMatern"
                  type="number"
                  name="hrsLicMatern"
                  placeholder="0"
                  value={
                    newPrePayrollWorker && newPrePayrollWorker.hrsLicMatern > 0
                      ? newPrePayrollWorker.hrsLicMatern
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPrePayrollWorker({
                      ...newPrePayrollWorker,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    newPrePayrollWorker.hrsLicMatern <= 0 &&
                    error.hrsLicMatern === ""
                      ? "warning"
                      : error.hrsLicMatern !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hrsLicMatern !== "" && (
                      <>
                        <span className="font-medium">
                          {error.hrsLicMatern}
                        </span>
                      </>
                    )
                  }
                  required
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hrsResol" value="Hrs. resol." />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hrsResol"
                  type="number"
                  name="hrsResol"
                  placeholder="0"
                  value={
                    newPrePayrollWorker && newPrePayrollWorker.hrsResol > 0
                      ? newPrePayrollWorker.hrsResol
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPrePayrollWorker({
                      ...newPrePayrollWorker,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    newPrePayrollWorker.hrsResol <= 0 && error.hrsResol === ""
                      ? "warning"
                      : error.hrsResol !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hrsResol !== "" && (
                      <>
                        <span className="font-medium">{error.hrsResol}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hrsInterr" value="Hrs. interr." />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hrsInterr"
                  type="number"
                  name="hrsInterr"
                  placeholder="0"
                  value={
                    newPrePayrollWorker && newPrePayrollWorker.hrsInterr > 0
                      ? newPrePayrollWorker.hrsInterr
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPrePayrollWorker({
                      ...newPrePayrollWorker,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    newPrePayrollWorker.hrsInterr <= 0 && error.hrsInterr === ""
                      ? "warning"
                      : error.hrsInterr !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hrsInterr !== "" && (
                      <>
                        <span className="font-medium">{error.hrsInterr}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="otroTpoPagar" value="Otro tpo a pagar" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="otroTpoPagar"
                  type="number"
                  name="otroTpoPagar"
                  placeholder="0"
                  value={
                    newPrePayrollWorker && newPrePayrollWorker.otroTpoPagar > 0
                      ? newPrePayrollWorker.otroTpoPagar
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPrePayrollWorker({
                      ...newPrePayrollWorker,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    newPrePayrollWorker.otroTpoPagar <= 0 &&
                    error.otroTpoPagar === ""
                      ? "warning"
                      : error.otroTpoPagar !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.otroTpoPagar !== "" && (
                      <>
                        <span className="font-medium">
                          {error.otroTpoPagar}
                        </span>
                      </>
                    )
                  }
                  required
                />
              </div>
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hrsExtras" value="Hrs. extras" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hrsExtras"
                  type="number"
                  name="hrsExtras"
                  placeholder="0"
                  value={
                    newPrePayrollWorker && newPrePayrollWorker.hrsExtras > 0
                      ? newPrePayrollWorker.hrsExtras
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setNewPrePayrollWorker({
                      ...newPrePayrollWorker,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    newPrePayrollWorker.hrsExtras <= 0 && error.hrsExtras === ""
                      ? "warning"
                      : error.hrsExtras !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hrsExtras !== "" && (
                      <>
                        <span className="font-medium">{error.hrsExtras}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <Button
                className="px-4"
                onClick={createNewPrePayrollWorker}
                color="success"
              >
                Agregar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal editar */}
      <Modal show={openModalEdit} size="md" onClose={closeModalEdit} popup>
        <Modal.Header className="px-2 mb-5 flex items-center">
          <h3 className="ml-5 text-xl font-medium text-gray-900 dark:text-white">
            Editar fila del trabajador{" "}
            {prePayrollWorkerSelected && prePayrollWorkerSelected.name}
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div className="flex gap-8">
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hTrab" value="Horas trabajadas" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hTrab"
                  type="number"
                  name="hTrab"
                  placeholder="0"
                  value={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hTrab > 0
                      ? prePayrollWorkerSelected.hTrab
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    prePayrollWorkerSelected &&
                    setPrePayrollWorkerSelected({
                      ...prePayrollWorkerSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hTrab <= 0 &&
                    error.hTrab === ""
                      ? "warning"
                      : error.hTrab !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hTrab !== "" && (
                      <>
                        <span className="font-medium">{error.hTrab}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hNoTrab" value="Horas no trabajadas" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hNoTrab"
                  type="number"
                  name="hNoTrab"
                  placeholder="0"
                  value={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hNoTrab > 0
                      ? prePayrollWorkerSelected.hNoTrab
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    prePayrollWorkerSelected &&
                    setPrePayrollWorkerSelected({
                      ...prePayrollWorkerSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hNoTrab <= 0 &&
                    error.hNoTrab === ""
                      ? "warning"
                      : error.hNoTrab !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hNoTrab !== "" && (
                      <>
                        <span className="font-medium">{error.hNoTrab}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="impunt" value="Impunt." />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="impunt"
                  type="number"
                  name="impunt"
                  placeholder="0"
                  value={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.impunt > 0
                      ? prePayrollWorkerSelected.impunt
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    prePayrollWorkerSelected &&
                    setPrePayrollWorkerSelected({
                      ...prePayrollWorkerSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.impunt <= 0 &&
                    error.impunt === ""
                      ? "warning"
                      : error.impunt !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.impunt !== "" && (
                      <>
                        <span className="font-medium">{error.impunt}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="diasVac" value="Días vac." />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="diasVac"
                  type="number"
                  name="diasVac"
                  placeholder="0"
                  value={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.diasVac > 0
                      ? prePayrollWorkerSelected.diasVac
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    prePayrollWorkerSelected &&
                    setPrePayrollWorkerSelected({
                      ...prePayrollWorkerSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.diasVac <= 0 &&
                    error.diasVac === ""
                      ? "warning"
                      : error.diasVac !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.diasVac !== "" && (
                      <>
                        <span className="font-medium">{error.diasVac}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hrsCertif" value="Hrs. certif." />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hrsCertif"
                  type="number"
                  name="hrsCertif"
                  placeholder="0"
                  value={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hrsCertif > 0
                      ? prePayrollWorkerSelected.hrsCertif
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    prePayrollWorkerSelected &&
                    setPrePayrollWorkerSelected({
                      ...prePayrollWorkerSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hrsCertif <= 0 &&
                    error.hrsCertif === ""
                      ? "warning"
                      : error.hrsCertif !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hrsCertif !== "" && (
                      <>
                        <span className="font-medium">{error.hrsCertif}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hrsLicMatern" value="Hrs. lic. matern." />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hrsLicMatern"
                  type="number"
                  name="hrsLicMatern"
                  placeholder="0"
                  value={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hrsLicMatern > 0
                      ? prePayrollWorkerSelected.hrsLicMatern
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    prePayrollWorkerSelected &&
                    setPrePayrollWorkerSelected({
                      ...prePayrollWorkerSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hrsLicMatern <= 0 &&
                    error.hrsLicMatern === ""
                      ? "warning"
                      : error.hrsLicMatern !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hrsLicMatern !== "" && (
                      <>
                        <span className="font-medium">
                          {error.hrsLicMatern}
                        </span>
                      </>
                    )
                  }
                  required
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hrsResol" value="Hrs. resol." />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hrsResol"
                  type="number"
                  name="hrsResol"
                  placeholder="0"
                  value={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hrsResol > 0
                      ? prePayrollWorkerSelected.hrsResol
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    prePayrollWorkerSelected &&
                    setPrePayrollWorkerSelected({
                      ...prePayrollWorkerSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hrsResol <= 0 &&
                    error.hrsResol === ""
                      ? "warning"
                      : error.hrsResol !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hrsResol !== "" && (
                      <>
                        <span className="font-medium">{error.hrsResol}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hrsInterr" value="Hrs. interr." />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hrsInterr"
                  type="number"
                  name="hrsInterr"
                  placeholder="0"
                  value={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hrsInterr > 0
                      ? prePayrollWorkerSelected.hrsInterr
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    prePayrollWorkerSelected &&
                    setPrePayrollWorkerSelected({
                      ...prePayrollWorkerSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hrsInterr <= 0 &&
                    error.hrsInterr === ""
                      ? "warning"
                      : error.hrsInterr !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hrsInterr !== "" && (
                      <>
                        <span className="font-medium">{error.hrsInterr}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="otroTpoPagar" value="Otro tpo a pagar" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="otroTpoPagar"
                  type="number"
                  name="otroTpoPagar"
                  placeholder="0"
                  value={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.otroTpoPagar > 0
                      ? prePayrollWorkerSelected.otroTpoPagar
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    prePayrollWorkerSelected &&
                    setPrePayrollWorkerSelected({
                      ...prePayrollWorkerSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.otroTpoPagar <= 0 &&
                    error.otroTpoPagar === ""
                      ? "warning"
                      : error.otroTpoPagar !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.otroTpoPagar !== "" && (
                      <>
                        <span className="font-medium">
                          {error.otroTpoPagar}
                        </span>
                      </>
                    )
                  }
                  required
                />
              </div>
              <div className="w-full">
                <div className="mb-2">
                  <Label htmlFor="hrsExtras" value="Hrs. extras" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <TextInput
                  id="hrsExtras"
                  type="number"
                  name="hrsExtras"
                  placeholder="0"
                  value={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hrsExtras > 0
                      ? prePayrollWorkerSelected.hrsExtras
                      : ""
                  }
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    prePayrollWorkerSelected &&
                    setPrePayrollWorkerSelected({
                      ...prePayrollWorkerSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                  color={
                    prePayrollWorkerSelected &&
                    prePayrollWorkerSelected.hrsExtras <= 0 &&
                    error.hrsExtras === ""
                      ? "warning"
                      : error.hrsExtras !== ""
                      ? "failure"
                      : "gray"
                  }
                  helperText={
                    error.hrsExtras !== "" && (
                      <>
                        <span className="font-medium">{error.hrsExtras}</span>
                      </>
                    )
                  }
                  required
                />
              </div>
            </div>
            <div className="w-full">
              <Button
                className="px-4"
                color="warning"
                onClick={editPrePayrollWorker}
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

export default CreatePrePayrollPage;
