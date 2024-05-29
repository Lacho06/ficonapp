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
  DELETE_WORKER,
  GET_LIST_WORKERS,
  POST_CREATE_WORKER,
  PUT_UPDATE_WORKER,
} from "../../constants/endpoints/worker";
import { NewWorker, Worker } from "../../constants/types/worker";
import {
  ROUTE_HOME_URL,
  ROUTE_WORKERS_URL,
  ROUTE_WORKER_DETAILS_PREFIX,
} from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { Department } from "../../constants/types/department";
import { ERROR_MESSAGES } from "../../constants/app";
import { GET_LIST_DEPARTMENTS } from "../../constants/endpoints/department";
import { GET_LIST_OCCUPATIONS } from "../../constants/endpoints/occupation";
import { HiHome } from "react-icons/hi";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Occupation } from "../../constants/types/occupation";
import axios from "axios";
import { useMiddleware } from "../../hooks/useMiddleware";

const initialNewWorker: NewWorker = {
  name: "",
  ci: 0,
  category: "ingeniero",
  departmentCode: -1,
  occupationId: -1,
};

type ErrorWorkerFields = {
  name: string;
  ci: string;
  category: string;
  departmentCode: string;
  occupationId: string;
};

const WorkerPage = () => {
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [workerSelected, setWorkerSelected] = useState<Worker>();
  const [newWorker, setNewWorker] = useState<NewWorker>(initialNewWorker);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  const [error, setError] = useState<ErrorWorkerFields>({
    name: "",
    ci: "",
    category: "",
    departmentCode: "",
    occupationId: "",
  });

  useMiddleware("rec. humanos");

  useEffect(() => {
    // llamada a la api
    axios.get(GET_LIST_WORKERS).then(({ data }) => setWorkers(data));
    axios.get(GET_LIST_DEPARTMENTS).then(({ data }) => setDepartments(data));
    axios.get(GET_LIST_OCCUPATIONS).then(({ data }) => setOccupations(data));
  }, []);

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleEdit = (worker: Worker) => {
    setWorkerSelected(worker);
    setOpenModalEdit(true);
  };

  const handleDelete = (worker: Worker) => {
    setWorkerSelected(worker);
    setOpenModalDelete(true);
  };

  const closeModalAdd = () => {
    setOpenModalAdd(false);
  };

  const closeModalEdit = () => {
    setOpenModalEdit(false);
  };

  const closeModalDelete = () => {
    setOpenModalDelete(false);
  };

  const createNewWorker = () => {
    // validar los datos
    let newError = {
      name: "",
      ci: "",
      category: "",
      departmentCode: "",
      occupationId: "",
    };

    if (newWorker.name.trim() === "") {
      newError = {
        ...newError,
        name: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        name: "",
      };
      setError(newError);
    }

    if (newWorker.ci === 0) {
      newError = {
        ...newError,
        ci: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      newWorker.ci.toString().length !== 11 ||
      Number.parseInt(newWorker.ci.toString()).toString().length !== 11
    ) {
      newError = {
        ...newError,
        ci: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        ci: "",
      };
      setError(newError);
    }

    if (newWorker.category.trim() === "") {
      newError = {
        ...newError,
        category: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      newWorker.category.trim() !== "ingeniero" &&
      newWorker.category.trim() !== "master" &&
      newWorker.category.trim() !== "doctor"
    ) {
      newError = {
        ...newError,
        category: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        category: "",
      };
      setError(newError);
    }

    if (newWorker.departmentCode === -1) {
      newError = {
        ...newError,
        departmentCode: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      departments.every(
        (department) => department.code !== newWorker.departmentCode
      )
    ) {
      newError = {
        ...newError,
        departmentCode: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        departmentCode: "",
      };
      setError(newError);
    }

    if (newWorker.occupationId === -1) {
      newError = {
        ...newError,
        occupationId: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      occupations.every(
        (occupation) =>
          occupation.id.toString() !== newWorker.occupationId.toString()
      )
    ) {
      newError = {
        ...newError,
        occupationId: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        occupationId: "",
      };
      setError(newError);
    }

    if (
      newError.name === "" &&
      newError.ci === "" &&
      newError.category === "" &&
      newError.departmentCode === "" &&
      newError.occupationId === ""
    ) {
      // llamada a la api para obtener un id disponible
      axios.post(POST_CREATE_WORKER, newWorker).then(({ data }) => {
        const newCode = data.id;
        setWorkers([...workers, { code: newCode, ...newWorker }]);
        setNewWorker(initialNewWorker);
      });
      closeModalAdd();
    }
  };

  const editWorker = () => {
    if (!workerSelected) return;
    // validar los datos
    let newError = {
      name: "",
      ci: "",
      category: "",
      departmentCode: "",
      occupationId: "",
    };

    if (workerSelected.name.trim() === "") {
      newError = {
        ...newError,
        name: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        name: "",
      };
      setError(newError);
    }

    if (workerSelected.ci === 0) {
      newError = {
        ...newError,
        ci: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      workerSelected.ci.toString().length !== 11 ||
      Number.parseInt(workerSelected.ci.toString()).toString().length !== 11
    ) {
      newError = {
        ...newError,
        ci: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        ci: "",
      };
      setError(newError);
    }

    if (workerSelected.category.trim() === "") {
      newError = {
        ...newError,
        category: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      workerSelected.category.trim() !== "ingeniero" &&
      workerSelected.category.trim() !== "master" &&
      workerSelected.category.trim() !== "doctor"
    ) {
      newError = {
        ...newError,
        category: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        category: "",
      };
      setError(newError);
    }

    if (workerSelected.departmentCode === -1) {
      newError = {
        ...newError,
        departmentCode: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      departments.every(
        (department) => department.code !== workerSelected.departmentCode
      )
    ) {
      newError = {
        ...newError,
        departmentCode: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        departmentCode: "",
      };
      setError(newError);
    }

    if (workerSelected.occupationId === -1) {
      newError = {
        ...newError,
        occupationId: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      occupations.every(
        (occupation) =>
          occupation.id.toString() !== workerSelected.occupationId.toString()
      )
    ) {
      newError = {
        ...newError,
        occupationId: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        occupationId: "",
      };
      setError(newError);
    }

    if (
      newError.name === "" &&
      newError.ci === "" &&
      newError.category === "" &&
      newError.departmentCode === "" &&
      newError.occupationId === ""
    ) {
      // llamada a la api para modificar los datos
      axios.put(`${PUT_UPDATE_WORKER}/${workerSelected.code}`, workerSelected);
      const workersFiltered = workers.filter(
        (worker) => worker.code !== workerSelected.code
      );
      const sortedWorkers = [...workersFiltered, workerSelected].sort(
        (a: Worker, b: Worker) => a.code - b.code
      );
      setWorkers(sortedWorkers);
      setWorkerSelected(undefined);
      closeModalEdit();
    }
  };

  const deleteWorker = () => {
    if (!workerSelected) return;
    // llamada a la api para eliminar el trabajador
    axios.delete(`${DELETE_WORKER}/${workerSelected.code}`);
    const workerFiltered = workers.filter(
      (worker) => worker.code !== workerSelected.code
    );
    setWorkers(workerFiltered);
    setWorkerSelected(undefined);
    closeModalDelete();
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
      <div className="overflow-x-auto">
        <div className="flex mt-2 mb-10 p-3 rounded-md bg-gray-50 dark:bg-gray-800 items-center justify-between">
          <Breadcrumb className="mx-4">
            <Breadcrumb.Item icon={HiHome}>
              <Link to={ROUTE_HOME_URL}>Inicio</Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link to={ROUTE_WORKERS_URL}>Trabajadores</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Button
            color="success"
            size="xs"
            onClick={() => setOpenModalAdd(true)}
          >
            Agregar trabajador
          </Button>
        </div>
        <Table theme={customTheme}>
          <Table.Head>
            <Table.HeadCell className="text-center">Código</Table.HeadCell>
            <Table.HeadCell className="text-center">Nombre</Table.HeadCell>
            <Table.HeadCell className="text-center">Categoría</Table.HeadCell>
            <Table.HeadCell className="text-center">Acciones</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {workers.length > 0 ? (
              workers.map((worker, i) => {
                return (
                  <Table.Row
                    key={i}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                      {worker.code}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {worker.name}
                    </Table.Cell>
                    <Table.Cell className="text-center">
                      {worker.category}
                    </Table.Cell>
                    <Table.Cell>
                      <div className="flex justify-center gap-4">
                        <Link
                          to={`${ROUTE_WORKER_DETAILS_PREFIX}/${worker.code}`}
                        >
                          <button
                            type="button"
                            className="font-medium text-cyan-600 dark:text-cyan-500"
                          >
                            Ver detalles
                          </button>
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleEdit(worker)}
                          className="font-medium text-yellow-300 dark:text-yellow-400"
                        >
                          Editar
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(worker)}
                          className="font-medium text-red-600 dark:text-cyan-500"
                        >
                          Eliminar
                        </button>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })
            ) : (
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell className="text-center bg-gray-50" colSpan={4}>
                  No hay trabajadores disponibles
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      </div>

      {/* Modal agregar */}
      <Modal show={openModalAdd} size="md" onClose={closeModalAdd} popup>
        <Modal.Header className="px-2 mb-5 flex items-center">
          <h3 className="ml-5 text-xl font-medium text-gray-900 dark:text-white">
            Agregar nuevo trabajador
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nombre" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="name"
                name="name"
                placeholder="trabajador1"
                value={newWorker && newWorker.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewWorker({
                    ...newWorker,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  newWorker.name === "" && error.name === ""
                    ? "warning"
                    : error.name !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.name !== "" && (
                    <>
                      <span className="font-medium">{error.name}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="ci" value="Carnet de identidad" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="ci"
                type="number"
                name="ci"
                placeholder="12345678912"
                value={newWorker && newWorker.ci !== 0 ? newWorker.ci : ""}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewWorker({
                    ...newWorker,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  newWorker.ci === 0 && error.ci === ""
                    ? "warning"
                    : error.ci !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.ci !== "" && (
                    <>
                      <span className="font-medium">{error.ci}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category" value="Categoría" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <Select
                id="category"
                name="category"
                value={newWorker.category}
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNewWorker({
                    ...newWorker,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option value="ingeniero" defaultChecked>
                  Ingeniero
                </option>
                <option value="master">Máster</option>
                <option value="doctor">Doctor</option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="departmentCode" value="Departamento" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <Select
                id="departmentCode"
                name="departmentCode"
                value={newWorker.departmentCode}
                color={
                  newWorker.departmentCode === -1 && error.departmentCode === ""
                    ? "warning"
                    : error.departmentCode !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.departmentCode !== "" && (
                    <>
                      <span className="font-medium">
                        {error.departmentCode}
                      </span>
                    </>
                  )
                }
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNewWorker({
                    ...newWorker,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option value="" disabled>
                  Seleccione un departamento
                </option>
                {departments.map((department, i) => {
                  return (
                    <option key={i} value={department.code}>
                      {department.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="occupationId" value="Cargo" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <Select
                id="occupationId"
                name="occupationId"
                value={newWorker.occupationId}
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setNewWorker({
                    ...newWorker,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  newWorker.occupationId === -1 && error.occupationId === ""
                    ? "warning"
                    : error.occupationId !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.occupationId !== "" && (
                    <>
                      <span className="font-medium">{error.occupationId}</span>
                    </>
                  )
                }
              >
                <option value="" disabled>
                  Seleccione un cargo
                </option>
                {occupations.map((occupation, i) => {
                  return (
                    <option key={i} value={occupation.id}>
                      {occupation.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div className="w-full">
              <Button
                className="px-4"
                onClick={createNewWorker}
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
            Editar trabajador {workerSelected && workerSelected.name}
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nombre" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="name"
                name="name"
                placeholder="trabajador1"
                value={workerSelected && workerSelected.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  workerSelected &&
                  setWorkerSelected({
                    ...workerSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  workerSelected &&
                  workerSelected.name === "" &&
                  error.name === ""
                    ? "warning"
                    : error.name !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.name !== "" && (
                    <>
                      <span className="font-medium">{error.name}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="ci" value="Carnet de identidad" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="ci"
                name="ci"
                type="number"
                placeholder="12345678912"
                value={
                  workerSelected && workerSelected.ci !== 0
                    ? workerSelected.ci
                    : ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  workerSelected &&
                  setWorkerSelected({
                    ...workerSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  workerSelected && workerSelected.ci === 0 && error.ci === ""
                    ? "warning"
                    : error.ci !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.ci !== "" && (
                    <>
                      <span className="font-medium">{error.ci}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="category" value="Categoría" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <Select
                id="category"
                name="category"
                value={workerSelected && workerSelected.category}
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  workerSelected &&
                  setWorkerSelected({
                    ...workerSelected,
                    [e.target.name]: e.target.value,
                  })
                }
              >
                <option
                  value="ingeniero"
                  defaultChecked={
                    workerSelected && workerSelected.category === "ingeniero"
                  }
                >
                  Ingeniero
                </option>
                <option
                  value="master"
                  defaultChecked={
                    workerSelected && workerSelected.category === "master"
                  }
                >
                  Máster
                </option>
                <option
                  value="doctor"
                  defaultChecked={
                    workerSelected && workerSelected.category === "doctor"
                  }
                >
                  Doctor
                </option>
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="departmentCode" value="Departamento" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <Select
                id="departmentCode"
                name="departmentCode"
                value={workerSelected && workerSelected.departmentCode}
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  workerSelected &&
                  setWorkerSelected({
                    ...workerSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  workerSelected &&
                  workerSelected.departmentCode === 0 &&
                  error.departmentCode === ""
                    ? "warning"
                    : error.departmentCode !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.departmentCode !== "" && (
                    <>
                      <span className="font-medium">
                        {error.departmentCode}
                      </span>
                    </>
                  )
                }
              >
                <option value="" disabled>
                  Seleccione un departamento
                </option>
                {departments.map((department, i) => {
                  return (
                    <option
                      value={department.code}
                      key={i}
                      defaultChecked={
                        workerSelected &&
                        department.code === workerSelected.departmentCode
                      }
                    >
                      {department.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="occupationId" value="Cargo" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <Select
                id="occupationId"
                name="occupationId"
                value={workerSelected && workerSelected.occupationId}
                required
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  workerSelected &&
                  setWorkerSelected({
                    ...workerSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  workerSelected &&
                  workerSelected.occupationId === 0 &&
                  error.occupationId === ""
                    ? "warning"
                    : error.occupationId !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.occupationId !== "" && (
                    <>
                      <span className="font-medium">{error.occupationId}</span>
                    </>
                  )
                }
              >
                <option value="" disabled>
                  Seleccione un cargo
                </option>
                {occupations.map((occupation, i) => {
                  return (
                    <option
                      value={occupation.id}
                      key={i}
                      defaultChecked={
                        workerSelected &&
                        occupation.id === workerSelected.occupationId
                      }
                    >
                      {occupation.name}
                    </option>
                  );
                })}
              </Select>
            </div>
            <div className="w-full">
              <Button className="px-4" color="warning" onClick={editWorker}>
                Editar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal eliminar */}
      <Modal show={openModalDelete} size="md" onClose={closeModalDelete} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Estás seguro de eliminar al trabajador{" "}
              {workerSelected && workerSelected.name}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteWorker}>
                Sí, estoy seguro
              </Button>
              <Button color="gray" onClick={closeModalDelete}>
                No, cancelar
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default WorkerPage;
