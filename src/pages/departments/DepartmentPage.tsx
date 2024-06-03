import {
  Alert,
  Breadcrumb,
  Button,
  CustomFlowbiteTheme,
  Label,
  Modal,
  Select,
  Spinner,
  Table,
  TextInput,
} from "flowbite-react";
import {
  DELETE_DEPARTMENT,
  GET_LIST_DEPARTMENTS,
  POST_CREATE_DEPARTMENT,
} from "../../constants/endpoints/department";
import { Department, NewDepartment } from "../../constants/types/department";
import { HiHome, HiOutlineExclamationCircle, HiPlus } from "react-icons/hi";
import {
  ROUTE_DEPARTMENTS_URL,
  ROUTE_HOME_URL,
} from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { Area } from "../../constants/types/area";
import { ERROR_MESSAGES } from "../../constants/app";
import { GET_LIST_AREAS } from "../../constants/endpoints/area";
import { Link } from "react-router-dom";
import { PUT_UPDATE_DEPARTMENT } from "./../../constants/endpoints/department";
import axios from "axios";
import { useMiddleware } from "../../hooks/useMiddleware";

type ErrorDepartmentFields = {
  code: string;
  name: string;
  areaName: string;
};

const DepartmentPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [areas, setAreas] = useState<Area[]>([]);

  const initialNewDepartment: NewDepartment = {
    name: "",
    areaName: areas.length > 0 ? areas[0].name : "",
  };

  const [departments, setDepartments] = useState<Department[]>([]);
  const [departmentSelected, setDepartmentSelected] = useState<Department>();
  const [newDepartment, setNewDepartment] =
    useState<NewDepartment>(initialNewDepartment);
  const [error, setError] = useState<ErrorDepartmentFields>({
    code: "",
    name: "",
    areaName: "",
  });

  useMiddleware("rec. humanos");

  useEffect(() => {
    // llamada a la api
    axios.get(GET_LIST_DEPARTMENTS).then(({ data }) => {
      setDepartments(data);
      setLoading(false);
    });
    axios.get(GET_LIST_AREAS).then(({ data }) => setAreas(data));
  }, []);

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleEdit = (department: Department) => {
    setDepartmentSelected(department);
    setOpenModalEdit(true);
  };

  const handleDelete = (department: Department) => {
    setDepartmentSelected(department);
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

  const createNewDepartment = () => {
    // validar los datos
    let newError = {
      code: "",
      name: "",
      areaName: "",
    };

    if (newDepartment.name.trim() === "") {
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

    if (newDepartment.areaName.trim() === "") {
      newError = {
        ...newError,
        areaName: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (!areas.some((area) => area.name === newDepartment.areaName)) {
      newError = {
        ...newError,
        areaName: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        areaName: "",
      };
      setError(newError);
    }

    if (newError.name === "" && newError.areaName === "") {
      // llamada a la api para obtener un id disponible
      axios.post(POST_CREATE_DEPARTMENT, newDepartment).then(({ data }) => {
        const newCode = data.code;
        setDepartments([...departments, { code: newCode, ...newDepartment }]);
        setNewDepartment(initialNewDepartment);
      });
      closeModalAdd();
    }
  };

  const editDepartment = () => {
    if (!departmentSelected) return;
    // validar los datos
    let newError = {
      code: "",
      name: "",
      areaName: "",
    };

    if (departmentSelected.code === 0) {
      newError = {
        ...newError,
        code: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      Number.parseInt(departmentSelected.code.toString()) === 0 ||
      departments.every(
        (department) => department.code !== departmentSelected.code
      )
    ) {
      newError = {
        ...newError,
        code: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        code: "",
      };
      setError(newError);
    }

    if (departmentSelected.name.trim() === "") {
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

    if (departmentSelected.areaName.trim() === "") {
      newError = {
        ...newError,
        areaName: ERROR_MESSAGES.EMPTY_FIELD,
      };
      setError(newError);
    } else if (
      !areas.some(
        (area) => area.name.trim() === departmentSelected.areaName.trim()
      )
    ) {
      newError = {
        ...newError,
        areaName: ERROR_MESSAGES.INCORRECT_FIELD,
      };
      setError(newError);
    } else {
      newError = {
        ...newError,
        areaName: "",
      };
      setError(newError);
    }

    if (
      newError.code === "" &&
      newError.name === "" &&
      newError.areaName === ""
    ) {
      // llamada a la api para modificar los datos
      axios.put(
        `${PUT_UPDATE_DEPARTMENT}/${departmentSelected.code}`,
        departmentSelected
      );
      const departmentsFiltered = departments.filter(
        (department) => department.code !== departmentSelected.code
      );
      const sortedDepartments = [
        ...departmentsFiltered,
        departmentSelected,
      ].sort((a: Department, b: Department) => a.code - b.code);
      setDepartments(sortedDepartments);
      setDepartmentSelected(undefined);
      closeModalEdit();
    }
  };

  const deleteDepartment = () => {
    if (!departmentSelected) return;
    // llamada a la api para eliminar el departamento
    axios.delete(`${DELETE_DEPARTMENT}/${departmentSelected.code}`);
    const departmentsFiltered = departments.filter(
      (department) => department.code !== departmentSelected.code
    );
    setDepartments(departmentsFiltered);
    setDepartmentSelected(undefined);
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
              <Link to={ROUTE_DEPARTMENTS_URL}>Departamentos</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className="hidden md:block">
            <Button
              color="success"
              size="xs"
              onClick={() => setOpenModalAdd(true)}
            >
              Agregar departamento
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
                <Table.HeadCell className="text-center">Código</Table.HeadCell>
                <Table.HeadCell className="text-center">Nombre</Table.HeadCell>
                <Table.HeadCell className="text-center">Área</Table.HeadCell>
                <Table.HeadCell className="text-center">
                  Acciones
                </Table.HeadCell>
              </Table.Head>
              <Table.Body className="divide-y">
                {departments.length > 0 ? (
                  departments.map((department, i) => {
                    return (
                      <Table.Row
                        key={i}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                          {department.code}
                        </Table.Cell>
                        <Table.Cell className="text-center">
                          {department.name}
                        </Table.Cell>
                        <Table.Cell className="text-center">
                          {department.areaName}
                        </Table.Cell>
                        <Table.Cell>
                          <div className="flex justify-center gap-4">
                            <button
                              type="button"
                              onClick={() => handleEdit(department)}
                              className="font-medium text-yellow-300 dark:text-yellow-400"
                            >
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDelete(department)}
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
                      No hay departamentos disponibles
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
            Agregar nuevo departamento
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
                placeholder="departamento1"
                value={newDepartment && newDepartment.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewDepartment({
                    ...newDepartment,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  newDepartment.name === "" && error.name === ""
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
            {areas.length !== 0 && (
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="areaName" value="Nombre del área" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <Select
                  id="areaName"
                  name="areaName"
                  required
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    setNewDepartment({
                      ...newDepartment,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  {areas.map((area, i) => {
                    return (
                      <option
                        key={i}
                        value={area.name}
                        defaultChecked={newDepartment.areaName === area.name}
                      >
                        {area.name}
                      </option>
                    );
                  })}
                </Select>
              </div>
            )}
            <div className="w-full">
              <Button
                className="px-4"
                onClick={createNewDepartment}
                color="success"
                disabled={areas.length === 0}
              >
                Agregar
              </Button>
              {areas.length === 0 && (
                <Alert className="mt-4" color="warning" withBorderAccent>
                  <span>
                    <span className="font-medium">Alerta</span> No hay áreas
                    disponibles para asignarle al departamento
                  </span>
                </Alert>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>

      {/* Modal editar */}
      <Modal show={openModalEdit} size="md" onClose={closeModalEdit} popup>
        <Modal.Header className="px-2 mb-5 flex items-center">
          <h3 className="ml-5 text-xl font-medium text-gray-900 dark:text-white">
            Editar departamento {departmentSelected && departmentSelected.name}
          </h3>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="code" value="Código" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="code"
                name="code"
                placeholder="123456"
                value={departmentSelected && departmentSelected.code}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  departmentSelected &&
                  setDepartmentSelected({
                    ...departmentSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  departmentSelected &&
                  departmentSelected.code === 0 &&
                  error.code === ""
                    ? "warning"
                    : error.code !== ""
                    ? "failure"
                    : "gray"
                }
                helperText={
                  error.code !== "" && (
                    <>
                      <span className="font-medium">{error.code}</span>
                    </>
                  )
                }
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Nombre" />
                <span className="text-red-800 mx-1 font-bold">*</span>
              </div>
              <TextInput
                id="name"
                name="name"
                placeholder="departamento1"
                value={departmentSelected && departmentSelected.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  departmentSelected &&
                  setDepartmentSelected({
                    ...departmentSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  departmentSelected &&
                  departmentSelected.name === "" &&
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
            {areas.length !== 0 && (
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="areaName" value="Nombre del área" />
                  <span className="text-red-800 mx-1 font-bold">*</span>
                </div>
                <Select
                  id="areaName"
                  name="areaName"
                  value={departmentSelected && departmentSelected.areaName}
                  required
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    departmentSelected &&
                    setDepartmentSelected({
                      ...departmentSelected,
                      [e.target.name]: e.target.value,
                    })
                  }
                >
                  {areas.map((area, i) => {
                    return (
                      <option
                        key={i}
                        value={area.name}
                        defaultChecked={
                          departmentSelected &&
                          departmentSelected.areaName === area.name
                        }
                      >
                        {area.name}
                      </option>
                    );
                  })}
                </Select>
              </div>
            )}
            <div className="w-full">
              <Button
                className="px-4"
                color="warning"
                onClick={editDepartment}
                disabled={areas.length === 0}
              >
                Editar
              </Button>
              {areas.length === 0 && (
                <Alert className="mt-4" color="warning" withBorderAccent>
                  <span>
                    <span className="font-medium">Alerta</span> No hay áreas
                    disponibles para asignarle al departamento
                  </span>
                </Alert>
              )}
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
              ¿Estás seguro de eliminar al departamento{" "}
              {departmentSelected && departmentSelected.name}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteDepartment}>
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

export default DepartmentPage;
