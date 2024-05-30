import { Area, NewArea } from "../../constants/types/area";
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
  DELETE_AREA,
  GET_LIST_AREAS,
  POST_CREATE_AREA,
  PUT_UPDATE_AREA,
} from "../../constants/endpoints/area";
import { HiHome, HiOutlineExclamationCircle } from "react-icons/hi";
import { ROUTE_AREAS_URL, ROUTE_HOME_URL } from "../../constants/routes/routes";
import { useEffect, useState } from "react";

import { ERROR_MESSAGES } from "../../constants/app";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMiddleware } from "../../hooks/useMiddleware";

const initialNewArea: NewArea = {
  name: "",
};

type ErrorAreaFields = {
  name: string;
};

const AreaPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [areas, setAreas] = useState<Area[]>([]);
  const [areaSelected, setAreaSelected] = useState<Area>();
  const [newArea, setNewArea] = useState<NewArea>(initialNewArea);
  const [error, setError] = useState<ErrorAreaFields>({
    name: "",
  });

  useMiddleware("rec. humanos");

  useEffect(() => {
    // llamada a la api
    axios.get(GET_LIST_AREAS).then(({ data }) => {
      setAreas(data);
      setLoading(false);
    });
  }, []);

  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleEdit = (area: Area) => {
    setAreaSelected(area);
    setOpenModalEdit(true);
  };

  const handleDelete = (area: Area) => {
    setAreaSelected(area);
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

  const createNewArea = () => {
    // validar los datos
    let newError = {
      name: "",
    };

    if (newArea.name.trim() === "") {
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

    if (newError.name === "") {
      // llamada a la api para obtener un id disponible
      axios.post(POST_CREATE_AREA, newArea).then(({ data }) => {
        const newCode = data.code;
        setAreas([...areas, { code: newCode, ...newArea }]);
        setNewArea(initialNewArea);
      });
      closeModalAdd();
    }
  };

  const editArea = () => {
    if (!areaSelected) return;
    // validar los datos
    let newError = {
      name: "",
    };

    if (areaSelected.name.trim() === "") {
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

    if (newError.name === "") {
      // llamada a la api para modificar los datos
      axios.put(`${PUT_UPDATE_AREA}/${areaSelected.code}`, areaSelected);
      const areasFiltered = areas.filter(
        (area) => area.code !== areaSelected.code
      );
      const sortedAreas = [...areasFiltered, areaSelected].sort(
        (a: Area, b: Area) => a.code - b.code
      );
      setAreas(sortedAreas);
      setAreaSelected(undefined);
      closeModalEdit();
    }
  };

  const deleteArea = () => {
    if (!areaSelected) return;
    // llamada a la api para eliminar el area
    axios.delete(`${DELETE_AREA}/${areaSelected.code}`);
    const areasFiltered = areas.filter(
      (area) => area.code !== areaSelected.code
    );
    setAreas(areasFiltered);
    setAreaSelected(undefined);
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
              <Link to={ROUTE_AREAS_URL}>Areas</Link>
            </Breadcrumb.Item>
          </Breadcrumb>
          <Button
            color="success"
            size="xs"
            onClick={() => setOpenModalAdd(true)}
          >
            Agregar área
          </Button>
        </div>
        {loading ? (
          <div className="flex w-full justify-center py-5">
            <Spinner color="warning" aria-label="Cargando..." size="lg" />
          </div>
        ) : (
          <Table theme={customTheme}>
            <Table.Head>
              <Table.HeadCell className="text-center">Código</Table.HeadCell>
              <Table.HeadCell className="text-center">Nombre</Table.HeadCell>
              <Table.HeadCell className="text-center">Acciones</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {areas.length > 0 ? (
                areas.map((area, i) => {
                  return (
                    <Table.Row
                      key={i}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <Table.Cell className="whitespace-nowrap text-center font-medium text-gray-900 dark:text-white">
                        {area.code}
                      </Table.Cell>
                      <Table.Cell className="text-center">
                        {area.name}
                      </Table.Cell>
                      <Table.Cell>
                        <div className="flex justify-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleEdit(area)}
                            className="font-medium text-yellow-300 dark:text-yellow-400"
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(area)}
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
                  <Table.Cell className="text-center bg-gray-50" colSpan={3}>
                    No hay áreas disponibles
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        )}
      </div>

      {/* Modal agregar */}
      <Modal show={openModalAdd} size="md" onClose={closeModalAdd} popup>
        <Modal.Header className="px-2 mb-5 flex items-center">
          <h3 className="ml-5 text-xl font-medium text-gray-900 dark:text-white">
            Agregar nueva área
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
                placeholder="área1"
                value={newArea && newArea.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setNewArea({ ...newArea, [e.target.name]: e.target.value })
                }
                color={
                  newArea.name === "" && error.name === ""
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
            <div className="w-full">
              <Button className="px-4" onClick={createNewArea} color="success">
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
            Editar área {areaSelected && areaSelected.name}
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
                placeholder="área1"
                value={areaSelected && areaSelected.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  areaSelected &&
                  setAreaSelected({
                    ...areaSelected,
                    [e.target.name]: e.target.value,
                  })
                }
                color={
                  areaSelected && areaSelected.name === "" && error.name === ""
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
            <div className="w-full">
              <Button className="px-4" color="warning" onClick={editArea}>
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
              ¿Estás seguro de eliminar el área{" "}
              {areaSelected && areaSelected.name}?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={deleteArea}>
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

export default AreaPage;
