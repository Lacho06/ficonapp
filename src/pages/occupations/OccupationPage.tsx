import {
  Breadcrumb,
  Button,
  CustomFlowbiteTheme,
  Label,
  Modal,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import {
  DELETE_OCCUPATION,
  GET_LIST_OCCUPATIONS,
  POST_CREATE_OCCUPATION,
  PUT_UPDATE_OCCUPATION,
} from "../../constants/endpoints/occupation";
import { HiHome, HiOutlineExclamationCircle, HiPlus } from "react-icons/hi";
import { NewOccupation, Occupation } from "../../constants/types/occupation";
import {
  ROUTE_HOME_URL,
  ROUTE_OCCUPATIONS_URL,
  ROUTE_OCCUPATION_DETAILS_PREFIX,
} from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { ERROR_MESSAGES } from "../../constants/app";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMiddleware } from "../../hooks/useMiddleware";

const initialNewOccupation: NewOccupation = {
  name: "",
  salary: -1,
};

type ErrorOccupationFields = {
  name: string;
  salary: string;
};

const OccupationPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [occupations, setOccupations] = useState<Occupation[]>([]);
  const [occupationSelected, setOccupationSelected] = useState<Occupation>();
  const [newOccupation, setNewOccupation] =
    useState<NewOccupation>(initialNewOccupation);
  const [error, setError] = useState<ErrorOccupationFields>({
    name: "",
    salary: "",
  });

  useMiddleware("rec. humanos");

  useEffect(() => {
    // llamada a la api
    axios.get(GET_LIST_OCCUPATIONS).then(({ data }) => {
      setOccupations(data);
      setLoading(false);
    });
  }, []);

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleEdit = (occupation: Occupation) => {
    setOccupationSelected(occupation);
    setOpenModalEdit(true);
  };

  const handleDelete = (occupation: Occupation) => {
    setOccupationSelected(occupation);
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

  const createNewOccupation = () => {
    // validar los datos
    let newError = {
      name: "",
      salary: "",
    };

    if (newOccupation.name.trim() === "") {
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

    if (newOccupation.salary === -1) {
      newError = {
        ...newError,
        salary: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      newOccupation.salary < 0 ||
      Number.parseFloat(newOccupation.salary.toString()) < 0
    ) {
      newError = {
        ...newError,
        salary: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        salary: "",
      };
      setError(newError);
    }

    if (newError.name === "" && newError.salary === "") {
      // llamada a la api para obtener un id disponible
      axios.post(POST_CREATE_OCCUPATION, newOccupation).then(({ data }) => {
        const newId = data.id;
        setOccupations([...occupations, { id: newId, ...newOccupation }]);
        setNewOccupation(initialNewOccupation);
      });
      closeModalAdd();
    }
  };

  const editOccupation = () => {
    if (!occupationSelected) return;
    // validar los datos
    let newError = {
      name: "",
      salary: "",
    };

    if (occupationSelected.name.trim() === "") {
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

    if (occupationSelected.salary === -1) {
      newError = {
        ...newError,
        salary: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      occupationSelected.salary < 0 ||
      Number.parseFloat(occupationSelected.salary.toString()) < 0
    ) {
      newError = {
        ...newError,
        salary: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        salary: "",
      };
      setError(newError);
    }

    if (newError.name === "" && newError.salary === "") {
      // llamada a la api para modificar los datos
      axios.put(
        `${PUT_UPDATE_OCCUPATION}/${occupationSelected.id}`,
        occupationSelected
      );
      const occupationsFiltered = occupations.filter(
        (occupation) => occupation.id !== occupationSelected.id
      );
      const sortedOccupations = [
        ...occupationsFiltered,
        occupationSelected,
      ].sort((a: Occupation, b: Occupation) => a.id - b.id);
      setOccupations(sortedOccupations);
      setOccupationSelected(undefined);
      closeModalEdit();
    }
  };

  const deleteOccupation = () => {
    if (!occupationSelected) return;
    // llamada a la api para eliminar el cargo
    axios.delete(`${DELETE_OCCUPATION}/${occupationSelected.id}`);
    const occupationsFiltered = occupations.filter(
      (occupation) => occupation.id !== occupationSelected.id
    );
    setOccupations(occupationsFiltered);
    setOccupationSelected(undefined);
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
              <Link to={ROUTE_OCCUPATIONS_URL}>Cargos</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="hidden md:block">
            <Button
              color="success"
              size="xs"
              onClick={() => setOpenModalAdd(true)}
            >
              Agregar cargo
            </Button>
          </div>
          <div className="md:hidden">
            <HiPlus onClick={() => setOpenModalAdd(true)} />
          </div>
        </div>
        {loading ? (
          <div className="flex w-full justify-center py-5">
            <Spinner color="warning" aria-label="Cargando..." size="lg" />
          </div>
        ) : (
          <div className="w-full overflow-x-auto">
            <Table theme={customTheme}>
              <Table.Head>
                <Table.HeadCell className="text-center">ID</Table.HeadCell>
                <Table.HeadCell className="text-center">Nombre</Table.HeadCell>
                <Table.HeadCell className="text-center">
                  Salario base
                </Table.HeadCell>
                <Table.HeadCell className="text-center">
                  Acciones
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {occupations.length > 0 ? (
                  occupations.map((occupation, i) => {
                    return (
                      <Table.Row
                        key={i}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                          {occupation.id}
                        </Table.Cell>
                        <Table.Cell className="text-center">
                          {occupation.name}
                        </Table.Cell>
                        <Table.Cell className="text-center">
                          {occupation.salary}
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex justify-center gap-4">
                            <Link
                              to={`${ROUTE_OCCUPATION_DETAILS_PREFIX}/${occupation.id}`}
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
                              onClick={() => handleEdit(occupation)}
                              className="font-medium text-yellow-300 dark:text-yellow-400"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(occupation)}
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
                      No hay cargos disponibles
                    </Table.Cell>
                  </Table.Row>
                )}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>

      {/* Modal agregar */}
      <Modal show={openModalAdd} size="md" onClose={closeModalAdd} popup>
        <Modal.Header className="px-2 mb-5 flex items-center">
          <h3 className="ml-5 text-xl font-medium text-gray-900 dark:text-white">
            Agregar nuevo cargo
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
                placeholder="cargo1"
                value={newOccupation && newOccupation.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewOccupation({
                    ...newOccupation,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  newOccupation.name === "" && error.name === ""
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
                <Label htmlFor="salary" value="Salario base" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="salary"
                type="number"
                name="salary"
                placeholder="$2000"
                value={
                  newOccupation && newOccupation.salary !== -1
                    ? newOccupation.salary
                    : ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewOccupation({
                    ...newOccupation,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  newOccupation.salary === -1 && error.salary === ""
                    ? "warning"
                    : error.salary !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.salary !== "" && (
                    <>
                      <span className="font-medium">{error.salary}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div className="w-full">
              <Button
                className="px-4"
                onClick={createNewOccupation}
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
            Editar cargo {occupationSelected && occupationSelected.name}
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
                placeholder="cargo1"
                value={occupationSelected && occupationSelected.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  occupationSelected &&
                  setOccupationSelected({
                    ...occupationSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  occupationSelected &&
                  occupationSelected.name === "" &&
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
                <Label htmlFor="salary" value="Salario base" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="salary"
                name="salary"
                type="number"
                placeholder="$2000"
                value={
                  occupationSelected && occupationSelected.salary !== -1
                    ? occupationSelected.salary
                    : ""
                }
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  occupationSelected &&
                  setOccupationSelected({
                    ...occupationSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  occupationSelected &&
                  occupationSelected.salary === -1 &&
                  error.salary === ""
                    ? "warning"
                    : error.salary !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.salary !== "" && (
                    <>
                      <span className="font-medium">{error.salary}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div className="w-full">
              <Button className="px-4" color="warning" onClick={editOccupation}>
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
              ¿Estás seguro de eliminar el cargo{" "}
              {occupationSelected && occupationSelected.name}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteOccupation}>
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

export default OccupationPage;
